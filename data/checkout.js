import {del_cart,cart} from '../data/cart.js'
import {products} from './products.js'
import {format_currency} from '../js-Files/Utilities/format.js'
let cart_id;
let matching_product;
let html=''
cart.forEach(cart_items => 
{
    cart_id=cart_items.cart_id;
    products.forEach((product_item)=>
    {
        if(cart_id===product_item.id)
        matching_product=product_item;
    })
    html+=`<div class="cart-item-container cart-container-${matching_product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matching_product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matching_product.name}
                </div>
                <div class="product-price">
                  $${format_currency(matching_product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cart_items.cart_quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matching_product.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matching_product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching_product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching_product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
  });
document.querySelector('.order-summary').innerHTML=html;
// -------------------Delete-Functionality----------------//
let del_array=document.querySelectorAll('.js-delete-link');
let del_Id;
del_array.forEach((item)=>
{
  item.addEventListener('click',()=>
  {
    del_Id=item.dataset.productId;
    del_cart(del_Id);
    const container=document.querySelector(`.cart-container-${del_Id}`);
    container.remove();
  })
})
// ---------------------------------------------------------//