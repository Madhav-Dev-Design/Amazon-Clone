import { format_currency } from "../js-Files/Utilities/format.js";

class Product
{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  constructor(item)
  {
    this.id=item.id;
    this.image=item.image;
    this.name=item.name;
    this.rating=item.rating;
    this.priceCents=item.priceCents;
    this.keywords=item.keywords;
  }

  getStarsUrl()
  {
    return `/images/ratings/rating-${this.rating.stars*10}.png`
  }

  getpriceCents()
  {
    return `$${format_currency(this.priceCents)}`
  }

  displaysizechart()
  {
    return ''; 
  }
}

export class clothing extends Product
{
  sizeChartLink;
  constructor(item)
  {
    super(item);
    this.sizeChartLink=item.sizeChartLink;
  }
  //Polymorphism
  displaysizechart()
  {
    return `<a href=${this.sizeChartLink} target="_blank">Size Chart</a>`; 
  }
}
export let products=[];

export function fetchResponse()
{
  const verification=
  fetch('https://supersimplebackend.dev/products').then((response)=>
  {
    return response.json();
  }).then((data)=>
  {
    products=data.map((item)=>
    {
      if(item.type==='clothing')
      {
        return new clothing(item);
      }
      return new Product(item);
    })
  })
  return verification;
}
export function get_item(product_id)
{
  let matched;
  products.forEach((product_item)=>
  {
      if(product_id===product_item.id)
      {
          matched=product_item;
      }
  })
  return matched;
}

export function loadCart(render)
{
const xcr=new XMLHttpRequest();
xcr.open('GET','https://supersimplebackend.dev/cart');
xcr.send();
xcr.addEventListener('load',()=>
{
  render();
})
}

/*Practiced without Fetch()
export function load(render_products)
{
const xhr=new XMLHttpRequest();
xhr.addEventListener(('load'),()=>
{
  products=JSON.parse(xhr.response).map((item)=>
  {
    if(item.type==='clothing')
    {
      return new clothing(item);
    }
    return new Product(item);
  });
  render_products();
})
xhr.open('GET','https://supersimplebackend.dev/products')
xhr.send();
}
*/