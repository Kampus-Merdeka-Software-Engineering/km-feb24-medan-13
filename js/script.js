// Data JSON yang menunjukkan nilai KPI untuk penjualan (sales) dan keuntungan (profit) per tahun
var kpiData = {
  "periods": [
    {
      "year": "2014",
      "sales": 215228,
      "profit": 24952
    },
    {
      "year": "2015",
      "sales": 205325,
      "profit": 27360
    },
    {
      "year": "2016",
      "sales": 263307,
      "profit": 31660
    },
    {
      "year": "2017",
      "sales": 327115,
      "profit": 39431
    },
    {
      "year": "Total",
      "sales": 1010975,
      "profit": 123403
    }
  ]
};

// Fungsi untuk mengisi nilai KPI ke dalam elemen HTML
function fillKPIValues(year, data) {
  if (year === "All") {
      var totalSales = data.periods.find(function(period) {
          return period.year === "Total";
      }).sales;
      var totalProfit = data.periods.find(function(period) {
          return period.year === "Total";
      }).profit;
      document.getElementById('salesKPI').innerText = totalSales;
      document.getElementById('profitKPI').innerText = totalProfit;
  } else {
      var yearData = data.periods.find(function(period) {
          return period.year === year;
      });
      if (yearData) {
          document.getElementById('salesKPI').innerText = yearData.sales;
          document.getElementById('profitKPI').innerText = yearData.profit;
      } else {
          document.getElementById('salesKPI').innerText = "Data not available";
          document.getElementById('profitKPI').innerText = "Data not available";
      }
  }
}

// Memanggil fungsi fillKPIValues dengan data kpiData untuk tahun pertama
fillKPIValues("All", kpiData);

// Menambahkan event listener untuk mendengarkan perubahan pada dropdown
document.getElementById('filterYear').addEventListener('change', function() {
  var selectedYear = this.value; // Mendapatkan nilai tahun yang dipilih dari dropdown
  fillKPIValues(selectedYear, kpiData); // Memanggil fungsi fillKPIValues dengan tahun yang dipilih
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

    // Fetch form inputs
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Fetch error elements
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    // Reset previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    // Validate inputs
    let isValid = true;

    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name";
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email";
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }

    if (messageInput.value.trim() === "") {
      messageError.textContent = "Please enter your message";
      isValid = false;
    }

    if (isValid) {
      form.submit();
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
//contact end
