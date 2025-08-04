fetch("http://localhost:3000/report/user123")
  .then(res => res.json())
  .then(data => {
    let productive = 0;
    let unproductive = 0;
    let neutral = 0;

    data.forEach(entry => {
      const minutes = entry.duration / 60000;

      if (entry.classification === "productive") productive += minutes;
      else if (entry.classification === "unproductive") unproductive += minutes;
      else neutral += minutes;
    });

    new Chart(document.getElementById("reportChart"), {
      type: "bar",
      data: {
        labels: ["Productive", "Unproductive", "Neutral"],
        datasets: [{
          label: "Time Spent (Minutes)",
          data: [productive.toFixed(2), unproductive.toFixed(2), neutral.toFixed(2)],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(201, 203, 207, 0.6)"
          ]
        }]
      }
    });
  });
