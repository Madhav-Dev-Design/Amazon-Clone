export let cart=JSON.parse(localStorage.getItem('cart'))||
[
  {
    cart_id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    cart_quantity:1,
    option_id:'1'
  },
  {
    cart_id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    cart_quantity:2,
    option_id:'2'
  }
];
let quantity=0;
export function addcartItems(log)
{
  let matched_item;
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
      cart_quantity:1,
      option_id:'1'
    })
  }
  update_cart();
}
export function reset()
{
  quantity=0;
  cart=[];
  localStorage.removeItem('cart');
  document.querySelector('.js-cart-quantity').innerHTML=quantity;
  update_cart();
}
function update_cart()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function quantity_update()
{
  quantity=0;
  cart.forEach((items)=>quantity+=items.cart_quantity)
  return quantity;
}
export function del_cart(Id)
{
  let updated_cart=[];
  cart.forEach((item)=>
  {
    if(item.cart_id!==Id)
    {
      updated_cart.push(item);
    }
  })
  cart=updated_cart;
  console.log(cart);
  // ----------Updates_the_quantity_of_the cart---------------//
  update_cart();
}