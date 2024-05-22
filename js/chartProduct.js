// Fetch data
fetch("/data/product.json")
  .then((response) => response.json())
  .then((data) => {
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
