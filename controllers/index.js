import { Product } from "../models/product.js";

function getAllFeaturesProduct() {
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  });
  promise.then((result) => {
    console.log(result.data.content);
    renderProduct(result.data.content.slice(0, 6));
  });
  promise.catch(function (err) {
    console.log("err", err);
  });
}

function renderProduct(products) {
  let productFeatures = document.querySelector(
    ".product-feature .container .row .feature-body"
  );
  let html = "";
  for (let product of products) {
    let shortDescription =
      product.shortDescription.length > 70
        ? product.shortDescription.substring(0, 30)
        : "...";
    html += `
    <div class="product-card col-4">
        <div class="card-body">
          <img src=${product.image} alt="">
          <div class="titles">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${shortDescription}</p>
          </div>
        </div>
        <div class="card-actions">
          <a class="btn-buy" href="./views/detail.html?productid=${product.id}" >Buy Now</a>
          <p class="price-text">${product.price}$</p>
        </div>
      </div>`;
  }
  productFeatures.innerHTML = html;
}
export default renderProduct;

window.onload = function () {
  getAllFeaturesProduct();
};
