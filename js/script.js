//kpi
var kpiData = {
  periods: [
    {
      year: "2014",
      sales: 215228,
      profit: 24952,
    },
    {
      year: "2015",
      sales: 205325,
      profit: 27360,
    },
    {
      year: "2016",
      sales: 263307,
      profit: 31660,
    },
    {
      year: "2017",
      sales: 327115,
      profit: 39431,
    },
    {
      year: "Total",
      sales: 1010975,
      profit: 123403,
    },
  ],
};

function fillKPIValues(year, data) {
  if (year === "All") {
    var totalSales = data.periods.find(function (period) {
      return period.year === "Total";
    }).sales;
    var totalProfit = data.periods.find(function (period) {
      return period.year === "Total";
    }).profit;
    document.getElementById("salesKPI").innerText = totalSales;
    document.getElementById("profitKPI").innerText = totalProfit;
  } else {
    var yearData = data.periods.find(function (period) {
      return period.year === year;
    });
    if (yearData) {
      document.getElementById("salesKPI").innerText = yearData.sales;
      document.getElementById("profitKPI").innerText = yearData.profit;
    } else {
      document.getElementById("salesKPI").innerText = "Data not available";
      document.getElementById("profitKPI").innerText = "Data not available";
    }
  }
}

fillKPIValues("All", kpiData);

document.getElementById("filterYear").addEventListener("change", function () {
  var selectedYear = this.value;
  fillKPIValues(selectedYear, kpiData);
});

//gsap
gsap.from(".hero-left", {
  opacity: 0,
  x: -50,
  duration: 1,
  delay: 0.3,
});
gsap.from(".right img", {
  opacity: 0,
  x: 50,
  duration: 1,
  delay: 0.3,
});

gsap.from(".hero-left h1", { opacity: 0, duration: 1, y: -50, delay: 0.5 });

gsap.from(".hero-left p", { opacity: 0, duration: 1, y: -50, delay: 1 });

gsap.from(".hero-left a", { opacity: 0, duration: 1, y: -50, delay: 1.5 });

gsap.from(".chart-title", { opacity: 0, duration: 1, y: -50, delay: 0.5 });

gsap.from(".controls", { opacity: 0, duration: 1, y: -50, delay: 1 });

gsap.from(".kpi", { opacity: 0, duration: 1, y: -50, delay: 1 });

document
  .querySelector(".hamburger-menu")
  .addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector("nav ul").classList.toggle("show");
  });

//table
$(document).ready(function () {
  $.ajax({
    url: "/data/superstore.json",
    dataType: "json",
    success: function (response) {
      var data = response.data;
      // Add a custom  column
      data.forEach(function (row, index) {
        row["Row ID"] = index + 1;
      });
      $("#example").DataTable({
        data: data,
        scrollX: true,
        responsive: true,
        lengthMenu: [
          [5, 10, 15, 20, 25, 50, 100],
          [5, 10, 15, 20, 25, 50, 100],
        ],
        pageLength: 5,
        columns: [
          { data: "Row ID" }, // Custom column
          { data: "Order ID" },
          { data: "Order Date" },
          { data: "Ship Date" },
          { data: "Ship Mode" },
          { data: "Customer ID" },
          { data: "Customer Name" },
          { data: "Segment" },
          { data: "Country" },
          { data: "City" },
          { data: "State" },
          { data: "Postal Code" },
          { data: "Region" },
          { data: "Product ID" },
          { data: "Category" },
          { data: "Sub-Category" },
          { data: "Product Name" },
          { data: "Sales" },
          { data: "Quantity" },
          { data: "Discount" },
          { data: "Profit" },
        ],
      });
    },
  });
});

//filter change
const filterYearly = document.getElementById("filterYear");

filterYearly.addEventListener("input", function () {
  let year = filterYearly.value;
  if (year === "All") {
    year = null;
  }
  renderChart(year);
});

//hamburger
function toggleMenu() {
  var menu = document.querySelector("nav ul");
  menu.classList.toggle("active");
}

//contact
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.submit();
  });
});

