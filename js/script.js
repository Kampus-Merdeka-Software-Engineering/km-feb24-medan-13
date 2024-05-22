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
