let originalProducts = []; // Variabel untuk menyimpan produk asli sebelum pencarian

// Function to fetch data from JSON file
async function fetchData() {
  try {
    const response = await fetch("/data/product.json"); // Sesuaikan dengan path ke file JSON Anda
    const data = await response.json();
    originalProducts = data.topProductsData; // Simpan data asli ke dalam variabel
    return originalProducts;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Lepaskan error untuk ditangani di luar
  }
}

// Function to render products
function renderProducts(products) {
  const topProductsTableBody = document.querySelector("#topProductsTable tbody");
  topProductsTableBody.innerHTML = ""; // Kosongkan konten sebelumnya

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
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  try {
    const products = originalProducts; // Gunakan data asli
    const filteredProducts = products.filter(product => product.product.toLowerCase().includes(searchInput));
    renderProducts(filteredProducts);
    
    // Reset header
    const topProductsTableHeader = document.querySelector("#topProductsTable thead");
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
  document.getElementById("searchInput").value = ""; // Clear search input
  renderProducts(originalProducts); // Render original products
  document.querySelector("#topProductsTable thead").style.display = "table-header-group"; // Show table header
}

// Initial rendering
fetchData()
  .then(renderProducts)
  .catch(error => console.error(error));
