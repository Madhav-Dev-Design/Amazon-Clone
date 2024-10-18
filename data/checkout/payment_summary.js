import {cart, quantity_update} from '../cart.js'
import { get_item } from '../products.js';
import { format_currency } from '../../js-Files/Utilities/format.js';
import { get_delivery_item } from '../deliveryOptions.js';
export function render_Payment_Summary()
{
    // ----------------Model---(Save the Data)------------------//
    let matched_cart,matched_delivery;
    let Item_price=0;
    let shipping_charge=0;
    let html;
    cart.forEach((cart_item)=>
    {
        matched_cart=get_item(cart_item.cart_id);
        Item_price+=(matched_cart.priceCents)*cart_item.cart_quantity;
        matched_delivery=(get_delivery_item(cart_item.option_id));
        shipping_charge+=(matched_delivery.priceCents);
        format_currency(shipping_charge);
    })
    let total_before=Item_price+shipping_charge;
    let tax=total_before*0.1;
    let total=(total_before+tax);
    // -------------View--------(Generate the HTML)-----------//
    html=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity_update()}):</div>
            <div class="payment-summary-money">$${format_currency(Item_price)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${format_currency(shipping_charge)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${format_currency(total_before)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${format_currency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${format_currency(total)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`
          document.querySelector('.payment-summary').innerHTML=html;
          document.querySelector('.js-place-order').addEventListener('click',
          async ()=>
          {
           const response= await fetch('https://supersimplebackend.dev/orders',
              {
                method:'POST',
                headers:
                {
                  'Content-Type':'application/json'
                },
                body:(JSON.stringify({cart:cart}))
              });
            const order=await response.json();
            window.location.href='orders.html';
          });
}