const chartCity = document.getElementById("cityChart");
let chartCityCanvas = null;

const renderChartCity = () => {
  fetch("/data/city.json")
    .then((response) => response.json())
    .then((data) => {
      const cities = data.datasets.map((cityData) => cityData.labels);
      const profits = data.datasets.map((cityData) => cityData.data[0]);

      if (chartCityCanvas) {
        chartCityCanvas.destroy();
      }

      chartCityCanvas = new Chart(chartCity, {
        type: "bar",
        data: {
          labels: cities,
          datasets: [
            {
              label: "Profit",
              data: profits,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching the data:", error);
    });
};

renderChartCity();
