export let cart=JSON.parse(localStorage.getItem('cart'))||[];
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
  update_cart();
}
export function update_delivery_date(product_id,delivery_id)
{
  let matched;
  cart.forEach((cart_item)=>
  {
    if(cart_item.cart_id===product_id)
    {
      matched=cart_item;
    }
  })
  matched.option_id=delivery_id;
  update_cart();
}