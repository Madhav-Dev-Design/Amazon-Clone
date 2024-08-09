import { addcartItems,cart,cartLoad } from "../../data/cart.js"
describe('Test Suite : Add to Cart',()=>
{
  document.querySelector('.test-container').innerHTML=`
    <div class="order-summary"></div>
    <div class="payment-summary"></div>
    <div class="js-return-to-home-link"></div>`
    
    it('Adds a New-Item to cart',()=>
    {
      spyOn(localStorage,'setItem');
      spyOn(localStorage,'getItem').and.callFake(()=>
        {
          return JSON.stringify([]);
        })
      console.log(localStorage.getItem('cart'));
      cartLoad();
      addcartItems('bc2847e9-5323-403f-b7cf-57fde044a955');
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(cart[0].cart_id).toEqual('bc2847e9-5323-403f-b7cf-57fde044a955');
      expect(cart[0].cart_quantity).toEqual(1);
    });
    
    it('Adds an Existing Item to cart - Flaky Tasks',()=>
    {
      spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>
          {
            return JSON.stringify([{
                  cart_id:'bc2847e9-5323-403f-b7cf-57fde044a955',
                  cart_quantity:1,
                  option_id:'1'}]);
          })
        cartLoad();
        addcartItems('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].cart_id).toEqual('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart[0].cart_quantity).toEqual(2);
    });
})