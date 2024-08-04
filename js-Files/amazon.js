let temp='';
let cart_count=0;
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
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary add-button" data-product-id=${(product.id)}>
            Add to Cart
          </button>
        </div>`
});
// --------------------- CART- FUNCTIONALITY----------------//
cart_count=JSON.parse(localStorage.getItem('cart'));
document.querySelector('.products-grid').innerHTML=temp;
let button=document.querySelectorAll('.add-button');
button.forEach((log)=>
{
  log.addEventListener('click',()=>updatecount_addcartItems(log))
})
function updatecount_addcartItems(log)
{
  let matched_item;
  cart_count++;
  document.querySelector('.cart-quantity').innerHTML=cart_count;
  localStorage.setItem('cart',JSON.stringify(cart_count));
  const id=log.dataset.productId;
  cart.forEach((cart_items)=>
  {
    if(cart_items.cart_id===id)
    {
      matched_item=cart_items;
    }
  })
  if(matched_item)
  {
    matched_item.cart_quantity++;
  }
  else
  {
    cart.push({
      cart_id:id,
      cart_quantity:1
    })
  }
  console.log(cart);
}
const re=document.querySelector('.reset');
re.addEventListener('click',reset);
function reset()
{
  cart_count=0;
  localStorage.removeItem('cart');
  document.querySelector('.cart-quantity').innerHTML=cart_count;
}
window.onload=function()
{
  cart_count=JSON.parse(localStorage.getItem('cart'));
  document.querySelector('.cart-quantity').innerHTML=cart_count;
}
// ------------------------------------------------------------------//