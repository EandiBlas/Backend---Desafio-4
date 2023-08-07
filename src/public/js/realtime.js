const SocketClient = io()

SocketClient.on("myProducts", (products) => {
  console.log(products)
  updateProducts(products)
})

function updateProducts(products) {
  let div = document.getElementById("listProducts");
  let myProducts = "";

  products.forEach((product) => {
    myProducts += `
      <article class="container">
        <div class="card-container">
          <img src="${product.thumbnail}" alt="${product.description}">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>$${product.price}</p>
          <p>Stock:${product.stock}</p>
          <p>Product ID:${product.id}</p>
        </div>
      </article>
          `;
  });

  div.innerHTML = myProducts;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let thumbnail = form.elements.thumbnail.value;
  let category = form.elements.category.value;
  let price = form.elements.price.value;
  let code = form.elements.code.value;

  SocketClient.emit("addProduct", {
    title,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
  });

  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteidinput = document.getElementById("id-prod");
  const deleteid = parseInt(deleteidinput.value);
  SocketClient.emit("deleteProduct", deleteid);
  deleteidinput.value = "";
});