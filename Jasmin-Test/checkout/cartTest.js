import { addcartItems,cart } from "../../data/cart.js"
describe('Add to Cart',()=>
{
    it('Adds Items to Cart',()=>
    {
      addcartItems('bc2847e9-5323-403f-b7cf-57fde044a955');
      expect(cart.length).toEqual(1);
    });
})