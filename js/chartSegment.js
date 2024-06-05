const chartSegment = document.getElementById("segmentChart");
let chartSegmentCanvas = null;

// Function to update segment chart
const updateSegmentChart = (datasets, year_filter = null) => {
  let filter_labels;
  let filter_data;

  let labels = ["2014", "2015", "2016", "2017"];

  if (year_filter != null) {
    let index = year_filter - 2014;
    filter_labels = [labels[index]];
    filter_data = datasets.map((segment) => ({
      label: segment.labels[0],
      data: [segment.data[index]],
      borderWidth: 1,
    }));
  } else {
    filter_labels = labels;
    filter_data = datasets.map((segment) => ({
      label: segment.labels[0],
      data: segment.data,
      borderWidth: 1,
    }));
  }

  if (chartSegmentCanvas) {
    chartSegmentCanvas.destroy();
  }

  chartSegmentCanvas = new Chart(chartSegment, {
    type: "bar",
    data: {
      labels: filter_labels,
      datasets: filter_data,
    },
    option: {
      responsive: true
    }
  });
};

// Function to render segment chart
const renderChartSegment = (year_filter = null) => {
  fetch("/data/segment.json")
    .then((response) => response.json())
    .then((response) => {
      let datasets = response.datasets;
      updateSegmentChart(datasets, year_filter);
    })
    .catch((error) => {
      console.error("Error fetching the data:", error);
    });
};

renderChartSegment();

filterYearly.addEventListener("input", function () {
  let year = filterYearly.value;
  if (year === "All") {
    year = null;
  }
  renderChartSegment(year);
});
