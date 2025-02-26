import {del_cart,cart, update_delivery_date} from '../cart.js'
import {get_item} from '../products.js'
import {format_currency} from '../../js-Files/Utilities/format.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryoptions,get_delivery_item } from '../deliveryOptions.js'
import { render_Payment_Summary } from './payment_summary.js'
import { checkout_quantity } from '../checkout.js'

export function render_order_summary()
{
  let html=''
  cart.forEach(cart_items => 
    {
    let cart_id;
    cart_id=cart_items.cart_id;
    let matching_product=get_item(cart_id);
      html+=`<div class="cart-item-container cart-container-${matching_product.id}">
              <div class="delivery-date">
                Delivery date: ${change_date(cart_items.option_id)}
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
                  <div class="product-quantity-${matching_product.id}">
                    <span>
                      Quantity: <span class="quantity-label">${cart_items.cart_quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link delete-link-${matching_product.id} link-primary js-delete-link" data-product-id=${matching_product.id}>
                      Delete
                    </span>
                  </div>
                </div>
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${generating_delivery_options(matching_product.id,cart_items)}
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
      checkout_quantity();
      add_gif();
    })
  })
  //-----------------------------------------------//
  function add_gif()
  {
    if(cart.length===0)
    {
      document.querySelector('.order-summary').innerHTML=` <img class="gif"src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/media/314560586aef7f1eae694d78a015c69c.gif">`
    }
  }
  add_gif();
  //----------------Day-Js------------------------
  function get_date(delivery_days)
  {
      const today=dayjs();
      const delivery_date=today.add(delivery_days,'day');
      const formatted_delivery_date=delivery_date.format("dddd, MMMM D ");
      return formatted_delivery_date;
  }
  // -----------------Delivery-Options----------------//
  function generating_delivery_options(matching_product_id,cart_items)
  {
    let html='';
    deliveryoptions.forEach((delivery)=>
    {
      const ischecked=delivery.delivery_Id===cart_items.option_id;
      const formatted_delivery_date=get_date(delivery.delivery_days);
      const shipping_charge = delivery.priceCents===0 ? 'FREE':`$${format_currency(delivery.priceCents)}`
      html+=`
      <div class="delivery-option js-delivery-option"
      data-product-id=${matching_product_id}
      data-delivery-id=${delivery.delivery_Id}>
        <input type="radio"
        ${ischecked?'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matching_product_id}">
        <div>
          <div class="delivery-option-date">
            ${formatted_delivery_date}
          </div>
          <div class="delivery-option-price">
            ${shipping_charge} - Shipping
          </div>
        </div>
      </div>`
    })
    return html;
  }
  // ---------------------Changing the Date-----------------------------
  function change_date(Id)
  {
    let matched=get_delivery_item(Id);
    return get_date(matched.delivery_days);
  }
  // -----------Making Delivery Date Interactive-------------//
  const option_list=document.querySelectorAll('.js-delivery-option')
  option_list.forEach((list_item)=>
  {
    list_item.addEventListener('change',()=>
    {
      const {productId,deliveryId}=list_item.dataset;
      update_delivery_date(productId,deliveryId);
      render_order_summary();
      render_Payment_Summary();
    })
  })
}
