const chartShipMode = document.getElementById("shipModeChart");
let chartShipModeCanvas = null;

// Function to update ship mode chart
const updateShipModeChart = (datasets, year_filter = null) => {
  let filter_labels;
  let filter_data;

  let labels = ["2014", "2015", "2016", "2017"];

  if (year_filter != null) {
    let index = year_filter - 2014;
    filter_labels = [labels[index]];
    filter_data = datasets.map((shipMode) => ({
      label: shipMode.labels[0],
      data: [shipMode.data[index]],
      borderWidth: 1,
    }));
  } else {
    filter_labels = labels;
    filter_data = datasets.map((shipMode) => ({
      label: shipMode.labels[0],
      data: shipMode.data,
      borderWidth: 1,
    }));
  }

  if (chartShipModeCanvas) {
    chartShipModeCanvas.destroy();
  }

  chartShipModeCanvas = new Chart(chartShipMode, {
    type: "bar",
    data: {
      labels: filter_labels,
      datasets: filter_data,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
    option: {
      responsive: true
    }
  });
};

// Function to render ship mode chart
const renderChartShipMode = (year_filter = null) => {
  fetch("/data/shipmode.json")
    .then((response) => response.json())
    .then((response) => {
      let datasets = response.datasets;
      updateShipModeChart(datasets, year_filter);
    })
    .catch((error) => {
      console.error("Error fetching the data:", error);
    });
};

renderChartShipMode();

filterYearly.addEventListener("input", function () {
  let year = filterYearly.value;
  if (year === "All") {
    year = null;
  }
  renderChartShipMode(year);
});
