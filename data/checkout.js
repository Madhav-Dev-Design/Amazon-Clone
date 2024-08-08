import { render_order_summary } from "./checkout/order_summary.js";
import { render_Payment_Summary } from "./checkout/payment_summary.js";
import { quantity_update } from "./cart.js";
import '../data/cart_class.js';
render_order_summary();
render_Payment_Summary();
export function checkout_quantity()
{
document.querySelector('.js-return-to-home-link').innerHTML=quantity_update();
}
checkout_quantity();