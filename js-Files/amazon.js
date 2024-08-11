import {products, fetchResponse} from '../data/products.js'
import {quantity_update,addcartItems,reset} from '../data/cart.js'
import { loadCart } from '../data/products.js';
let temp='';
// Promise//
async function loadPage()
{
  await fetchResponse();
  await new Promise((resolve)=>
    {
      loadCart(()=>
      {
        resolve();
      })
    })
    render_products();
  
}
loadPage();


/* Fetch Response Practice
Promise.all([
  fetchResponse(),
  new Promise((resolve)=>
    {
      loadCart(()=>
      {
        resolve();
      })
    })
])
.then(()=>
{
  render_products();
})
/*Call - Back
 load(render_products);
 */
function render_products()
{
    products.forEach(product => 
        {
        temp+=`<div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src=${product.image}>
              </div>

              <div class="product-name limit-text-to-2-lines">
              ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src=${product.getStarsUrl()}>
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>
              <div class="product-price">
                ${product.getpriceCents()}
              </div>

              <div class="product-quantity-container">
                <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              ${product.displaysizechart()}
              <div class="product-spacer"></div>

              <div class="added-to-cart">
                <img src="/images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary add-button js-add-button" data-product-id=${(product.id)}>
                Add to Cart
              </button>
            </div>`
    });
    document.querySelector('.products-grid').innerHTML=temp;
    // --------------------- CART- FUNCTIONALITY----------------//
    let button=document.querySelectorAll('.js-add-button');
    let id;
    button.forEach((log)=>
    {
      log.addEventListener('click',()=>
        {
          id=log.dataset.productId;
          addcartItems(id);
          document.querySelector('.js-cart-quantity').innerHTML=quantity_update();
        })
    })
    window.onload=document.querySelector('.js-cart-quantity').innerHTML=quantity_update();
    const re=document.querySelector('.reset');
    re.addEventListener('click',reset);
}

