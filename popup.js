// popup.js
chrome.storage.local.get(null, (data) => {
  const summary = document.getElementById("summary");
  let totalTime = 0;
  for (const [domain, time] of Object.entries(data)) {
    totalTime += time;
    summary.innerHTML += `<p>${domain}: ${(time / 60000).toFixed(2)} min</p>`;
  }
  summary.innerHTML += `<hr/><p><b>Total:</b> ${(totalTime / 60000).toFixed(2)} min</p>`;
});
