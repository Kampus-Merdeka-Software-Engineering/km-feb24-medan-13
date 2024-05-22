const chartCategory = document.getElementById("categoryChart");
let chartCategoryCanvas = null;

// Function to update category chart
const updateCategoryChart = (datasets, year_filter = null) => {
  let filter_labels;
  let filter_data;

  let labels = ["2014", "2015", "2016", "2017"];

  if (year_filter != null) {
    let index = year_filter - 2014;
    filter_labels = [labels[index]];
    filter_data = datasets.map((category) => ({
      label: category.labels[0],
      data: [category.data[index]],
      borderWidth: 1,
    }));
  } else {
    filter_labels = labels;
    filter_data = datasets.map((category) => ({
      label: category.labels[0],
      data: category.data,
      borderWidth: 1,
    }));
  }

  if (chartCategoryCanvas) {
    chartCategoryCanvas.destroy();
  }

  chartCategoryCanvas = new Chart(chartCategory, {
    type: "bar",
    data: {
      labels: filter_labels,
      datasets: filter_data,
    },
  });
};

// Function to render category chart
const renderChartCategory = (year_filter = null) => {
  fetch("/data/category.json")
    .then((response) => response.json())
    .then((response) => {
      let datasets = response.datasets;
      updateCategoryChart(datasets, year_filter);
    })
    .catch((error) => {
      console.error("Error fetching the data:", error);
    });
};

renderChartCategory();

filterYearly.addEventListener("input", function () {
  let year = filterYearly.value;
  if (year === "All") {
    year = null;
  }
  renderChartCategory(year);
});
