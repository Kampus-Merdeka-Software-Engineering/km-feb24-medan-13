// Fetch data
fetch("/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Segment Chart
    const segmentLabels = data.segmentData.map((item) => item.segment);
    const segmentData = data.segmentData.map((item) =>
      parseFloat(item.total_profit)
    );

    new Chart(document.getElementById("segmentChart"), {
      type: "pie",
      data: {
        labels: segmentLabels,
        datasets: [
          {
            label: "Segment Profit",
            data: segmentData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    // Ship Mode Chart
    const shipModeLabels = data.shipModeData.map((item) => item.Ship_Mode);
    const shipModeData = data.shipModeData.map((item) =>
      parseFloat(item.total_profit)
    );

    new Chart(document.getElementById("shipModeChart"), {
      type: "bar",
      data: {
        labels: shipModeLabels,
        datasets: [
          {
            label: "Ship Mode Profit",
            data: shipModeData,
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

    // Year Chart
    const yearLabels = Object.keys(data.yearData);
    const yearData = Object.values(data.yearData).map((item) =>
      parseFloat(item.total_profit)
    );

    new Chart(document.getElementById("yearChart"), {
      type: "line",
      data: {
        labels: yearLabels,
        datasets: [
          {
            label: "Yearly Profit",
            data: yearData,
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
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
    // City Chart
    const cityLabels = data.cityData.map((item) => item.city);
    const cityData = data.cityData.map((item) => parseFloat(item.total_profit));

    new Chart(document.getElementById("cityChart"), {
      type: "bar",
      data: {
        labels: cityLabels,
        datasets: [
          {
            label: "City Profit",
            data: cityData,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
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

    // Category Chart
    const categoryLabels = Object.keys(data.categoryData);
    const categoryData = Object.values(data.categoryData).map((item) =>
      parseFloat(item.total_profit)
    );

    new Chart(document.getElementById("categoryChart"), {
      type: "doughnut",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Category Profit",
            data: categoryData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
    //table
    const tableHTML = `
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Product</th>
                <th>Profit</th>
            </tr>
        </thead>
        <tbody>
            ${data.topProductsData
              .map(
                (product, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${product.product}</td>
                        <td>${product.profit}</td>
                    </tr>
                `
              )
              .join("")}
        </tbody>
    </table>
`;

    // Menyisipkan tabel HTML ke dalam div dengan id 'topProductsTable'
    document.getElementById("topProductsTable").innerHTML = tableHTML;
  })
  .catch((error) => console.error("Error fetching data:", error));

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



