import { render_Payment_Summary } from "./checkout/payment_summary.js";
export function Cart(key)
{
  const cart=
{
  cartItems:undefined,
//Local Storage Code
  cartLoad:function() 
          {
            this.cartItems=JSON.parse(localStorage.getItem(key))||[];
          },
//Add to Cart
  addcartItems: function (id)
  {
    let matched_item;
    this.cartItems.forEach((items)=>
    {
      if(items.cart_id===id)
      {
        matched_item=items;
      }
    })
    if(matched_item)
    {
      matched_item.cart_quantity++;
    }
    else
    {
      this.cartItems.push({
        cart_id:id,
        cart_quantity:1,
        option_id:'1'
      })
    }
    this.update_cart();
  },
  //Reset Functionality
  reset: function()
  {
    let quantity=0;
    this.cartItems=[];
    localStorage.removeItem(key);
    document.querySelector('.js-cart-quantity').innerHTML=quantity;
    this.update_cart();
  },
  //Update Cart
  update_cart: function()
  {
  localStorage.setItem(key,JSON.stringify(this.cartItems));
  },
  //Quantity Update
  quantity_update: function ()
  {
  quantity=0;
  this.cartItems.forEach((items)=>quantity+=items.cart_quantity)
  return quantity;
  },
// Delete Cart
del_cart: function (Id)
  {
    let updated_cart=[];
    this.cartItems.forEach((item)=>
    {
      if(item.cart_id!==Id)
      {
        updated_cart.push(item);
      }
    })
    cart=updated_cart;
    this.update_cart();
    render_Payment_Summary();
  } ,
  //Update Delivery Date
  update_delivery_date: function (product_id,delivery_id)
  {
    let matched;
    this.cartItems.forEach((cart_item)=>
    {
      if(cart_item.cart_id===product_id)
      {
        matched=cart_item;
      }
    })
    matched.option_id=delivery_id;
    this.update_cart();
  },
};
  return cart;
}
const cart=Cart('cart-oop');
cart.cartLoad();
cart.addcartItems('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
const Business_cart=Cart('cart-business');
Business_cart.cartLoad();
Business_cart.addcartItems('36c64692-677f-4f58-b5ec-0dc2cf109e27');
// console.log(cart.cartItems[1].cart_id);
// console.log(Business_cart.cartItems[1].cart_id);