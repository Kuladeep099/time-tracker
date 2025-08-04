const PRODUCTIVE_DOMAINS = ["leetcode.com", "github.com", "stackoverflow.com"];
const UNPRODUCTIVE_DOMAINS = ["youtube.com", "facebook.com", "instagram.com"];

let currentTab = null;
let startTime = null;

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
}

function saveTime(domain, duration) {
  if (!domain || !duration) return;

  // Classify domain
  let classification = "neutral";
  if (PRODUCTIVE_DOMAINS.includes(domain)) {
    classification = "productive";
  } else if (UNPRODUCTIVE_DOMAINS.includes(domain)) {
    classification = "unproductive";
  }

  chrome.storage.local.get(["timeData"], (result) => {
    const timeData = result.timeData || {};
    timeData[domain] = (timeData[domain] || 0) + duration;

    chrome.storage.local.set({ timeData });

    // Send to backend
    fetch("http://localhost:3000/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        domain,
        duration,
        userId: "user123",
        timestamp: new Date(),
        classification
      })
    });
  });
}

// Track tab switch
chrome.tabs.onActivated.addListener((activeInfo) => {
  if (currentTab && startTime) {
    chrome.tabs.get(currentTab, (tab) => {
      const domain = getDomain(tab.url);
      const duration = Date.now() - startTime;
      saveTime(domain, duration);
    });
  }
  currentTab = activeInfo.tabId;
  startTime = Date.now();
});

// Track URL change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTab && changeInfo.url) {
    const domain = getDomain(changeInfo.url);
    const duration = Date.now() - startTime;
    saveTime(domain, duration);
    startTime = Date.now();
  }
});

// Track browser close or reload
chrome.windows.onRemoved.addListener(() => {
  if (currentTab && startTime) {
    chrome.tabs.get(currentTab, (tab) => {
      const domain = getDomain(tab.url);
      const duration = Date.now() - startTime;
      saveTime(domain, duration);
    });
  }
});
