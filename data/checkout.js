import { render_order_summary } from "./checkout/order_summary.js";
import { render_Payment_Summary } from "./checkout/payment_summary.js";
import { quantity_update } from "./cart.js";
import {fetchResponse, loadCart} from '../data/products.js';
//Promise

export function checkout_quantity()
{
    document.querySelector('.js-return-to-home-link').innerHTML=quantity_update();
}
checkout_quantity();

async function loadPage()
{
    await fetchResponse();
    render_Payment_Summary();
    render_order_summary();
}
loadPage();
/*

//Call - Back -Practice

load(()=>
{
    render_Payment_Summary();
    render_order_summary();
})
// Fetch -Practice
fetchResponse().then(()=>
{
    render_Payment_Summary();
    render_order_summary();
});


//Promises - Practice

new Promise((resolve)=>
{
    load(()=>
    {
        resolve('Value 1');
    })
}).then((value)=>
    {
        console.log(value);
        new Promise((resolve)=>
        {
            loadCart(()=>
            {
                resolve();
            })
        })
    })
.then(()=>
    {
        render_Payment_Summary();
        render_order_summary();
    })


//List of Promises - Practice

Promise.all([
    new Promise((resolve)=>
    {
        load(()=>
        {
            const a=2;
            resolve(a);
            console.log('Loaded Products');
        });
    }),
    new Promise((resolve)=>
    {
        loadCart(()=>
        {
            const a=5;
            let b=`Hello ${a}`;
            resolve(b);
            console.log('Loaded Cart');
        });
    })
]).then((value)=>
{;
    console.log(value);
    render_Payment_Summary();
    render_order_summary();
    console.log('Loaded the Page');
});

*/





