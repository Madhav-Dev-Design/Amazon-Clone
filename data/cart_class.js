import { render_Payment_Summary } from "./checkout/payment_summary.js";

class Cart
{
    #key;
    cartItems=[];

    constructor(key)
    {
        this.#key=key;
        this.#cartLoad();
    }
    //Saves to Local Storage//

    #cartLoad() 
    {
        this.cartItems=JSON.parse(localStorage.getItem(this.#key))||[];
    }

    //Add cart Items//

    addcartItems= function (id)
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
    };  

    //Reset Functionality//

    reset()
    {
        let quantity=0;
        this.cartItems=[];
        localStorage.removeItem(this.#key);
        document.querySelector('.js-cart-quantity').innerHTML=quantity;
        this.update_cart();
    }

    //Update Cart

    update_cart=function()
    {
    localStorage.setItem(this.#key,JSON.stringify(this.cartItems));
    }

    //Quantity Update//

    quantity_update= function ()
    {
    quantity=0;
    this.cartItems.forEach((items)=>quantity+=items.cart_quantity)
    return quantity;
    }

    //Delete Cart

    del_cart= function (Id)
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
    } 

    //Update Delivery Cart//

    update_delivery_date= function (product_id,delivery_id)
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
    }

    getCurrentKey()
    {
        return this.#key;
    }
}
const cart=new Cart('cart-oop');
cart.addcartItems('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.key='aba';
const business_cart=new Cart('bus-cart-oop');
business_cart.addcartItems('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')