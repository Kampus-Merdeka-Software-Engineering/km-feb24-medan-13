let originalProducts = [];

async function fetchData() {
  try {
    const response = await fetch("/data/product.json");
    const data = await response.json();
    originalProducts = data.topProductsData;
    return originalProducts;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to render products
function renderProducts(products) {
  const topProductsTableBody = document.querySelector(
    "#topProductsTable tbody"
  );
  topProductsTableBody.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.product}</td>
      <td>${product.profit}</td>
    `;
    topProductsTableBody.appendChild(row);
  });
}

// Function to handle search
async function searchProducts() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  try {
    const products = originalProducts;
    const filteredProducts = products.filter((product) =>
      product.product.toLowerCase().includes(searchInput)
    );
    renderProducts(filteredProducts);

    // Reset header
    const topProductsTableHeader = document.querySelector(
      "#topProductsTable thead"
    );
    if (filteredProducts.length === 0) {
      topProductsTableHeader.style.display = "none";
    } else {
      topProductsTableHeader.style.display = "table-header-group";
    }
  } catch (error) {
    console.error("Error searching products:", error);
  }
}

// Function to clear search and reset table
function clearSearch() {
  document.getElementById("searchInput").value = "";
  renderProducts(originalProducts);
  document.querySelector("#topProductsTable thead").style.display =
    "table-header-group";
}

// Initial rendering
fetchData()
  .then(renderProducts)
  .catch((error) => console.error(error));
