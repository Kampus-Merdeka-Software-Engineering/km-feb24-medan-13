const chartYear = document.getElementById("yearChart");

let chartYearCanvas = null;

// Function to update chart
const updateChart = (labels, data, year_filter = null) => {
  let filter_labels;
  let filter_data;

  if (year_filter !== null && year_filter !== "All") {
    let index = labels.indexOf(year_filter.toString());

    if (index !== -1) {
      filter_labels = [labels[index]];
      filter_data = [data[index]];
    } else {
      filter_labels = [];
      filter_data = [];
    }
  } else {
    filter_labels = labels;
    filter_data = data;
  }

  // Destroy existing chart if it exists
  if (chartYearCanvas) {
    chartYearCanvas.destroy();
  }
  chartYearCanvas = new Chart(chartYear, {
    type: "bar",
    data: {
      labels: filter_labels,
      datasets: [
        {
          label: "Total Profit",
          data: filter_data,
          borderWidth: 1,
        },
      ],
    },
  });
};

// Function to render chart
const renderChartYear = (year_filter = null) => {
  fetch("/data/year.json")
    .then((response) => response.json())
    .then((response) => {
      let datasets = response.datasets[0];
      updateChart(datasets.labels, datasets.data, year_filter);
    })
    .catch((error) => {
      console.error("Error fetching the data:", error);
    });
};

renderChartYear();

// Event listener for filter change
filterYearly.addEventListener("input", function () {
  let year = filterYearly.value;
  if (year === "All") {
    year = null;
  }
  renderChartYear(year);
});
