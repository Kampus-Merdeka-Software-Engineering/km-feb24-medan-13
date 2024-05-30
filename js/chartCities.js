document.addEventListener("DOMContentLoaded", () => {
  const colors = {
    2014: "rgba(255, 99, 132, 0.5)", // Red
    2015: "rgba(54, 162, 235, 0.5)", // Blue
    2016: "rgba(255, 206, 86, 0.5)", // Yellow
    2017: "rgba(75, 192, 192, 0.5)", // Green
  };

  const ctx = document.getElementById("profitChart").getContext("2d");
  let chart;
  let data;

  function createChart(filteredData, year) {
    const cities = filteredData.map((item) => item.city);
    const profits = filteredData.map((item) => item.profit);

    if (chart) {
      chart.destroy();
    }

    const backgroundColor =
      year === "All"
        ? filteredData.map((item) => colors[item.year])
        : new Array(filteredData.length).fill(colors[year]);

    const borderColor = backgroundColor.map((color) =>
      color.replace("0.7", "1")
    );

    const labels = Object.keys(colors).map((key) => ({
      color: colors[key],
      label: `Top City in ${key}`,
    }));

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: cities,
        datasets: [
          {
            label: "Profit",
            data: profits,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              generateLabels: function (chart) {
                return labels.map((label) => ({
                  text: label.label,
                  fillStyle: label.color,
                }));
              },
            },
          },
        },
      },
    });
  }

  function filterData(year) {
    if (year === "All") {
      let allData = [];
      for (let key in data) {
        const topCities = data[key]
          .slice(0, 3)
          .map((item) => ({ ...item, year: key }));
        allData = allData.concat(topCities);
      }
      return allData;
    } else {
      return data[year];
    }
  }

  document.getElementById("filterYear").addEventListener("change", function () {
    const year = this.value;
    const filteredData = filterData(year);
    createChart(filteredData, year);
  });

  fetch("/data/cities.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
      const allData = filterData("All");
      createChart(allData, "All");
    })
    .catch((error) => console.error("Error fetching data:", error));
});
