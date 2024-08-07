import { render_order_summary } from "../../data/checkout/order_summary.js";
import { cartLoad ,cart} from "../../data/cart.js";
describe('Test Suite : Render_Order_summary',()=>
{
document.querySelector('.test-container').innerHTML=`
    <div class="order-summary"></div>
    <div class="payment-summary"></div>
    <div class="js-return-to-home-link"></div>`
    const p_1='bc2847e9-5323-403f-b7cf-57fde044a955';
    const p_2='aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f';
    it('Display the Cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>
            {
              return JSON.stringify(
                [{
                    cart_id:p_1,
                    cart_quantity:1,
                    option_id:'1'
                    },
                    {
                    cart_id:p_2,
                    cart_quantity:2,
                    option_id:'1'
                    }]);
                });
                cartLoad();
                render_order_summary();
                expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
                expect(document.querySelector(`.product-quantity-${p_1}`).innerText).toContain('Quantity: 1');
                expect(document.querySelector(`.product-quantity-${p_2}`).innerText).toContain('Quantity: 2');
                document.querySelector('.test-container').innerHTML='';
            });
            
    it('Removes a Product',()=>{
        document.querySelector('.test-container').innerHTML=`
        <div class="order-summary"></div>
        <div class="payment-summary"></div>
        <div class="js-return-to-home-link"></div>`
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>
            {
              return JSON.stringify(
                [{
                    cart_id:p_1,
                    cart_quantity:1,
                    option_id:'1'
                    },
                    {
                    cart_id:p_2,
                    cart_quantity:2,
                    option_id:'1'
                    }]);
                });
                cartLoad();
                render_order_summary();
                document.querySelector(`.delete-link-${p_1}`).click();
                expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
                expect(cart[0].cart_id).toEqual(p_2);
                expect(cart.length).toEqual(1);
                document.querySelector('.test-container').innerHTML='';
    })
})