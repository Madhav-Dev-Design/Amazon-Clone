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
      cart_quantity:1
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
  quantity=0;
  cart.forEach((items)=>quantity+=items.cart_quantity)
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function update()
{
  quantity=0;
  cart.forEach((items)=>quantity+=items.cart_quantity)
  localStorage.setItem('cart',JSON.stringify(cart));
  return quantity;
}