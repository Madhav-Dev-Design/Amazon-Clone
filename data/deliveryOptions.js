export let deliveryoptions=
[
    {
        delivery_Id:'1',
        delivery_days:7,
        priceCents:0,
    },
    {
        delivery_Id:'2',
        delivery_days:3,
        priceCents:499,
    },
    {
        delivery_Id:'3',
        delivery_days:0,
        priceCents:999,
    }
]
export function get_delivery_item(Id)
{
    let matched;
    deliveryoptions.forEach((delivery_item)=>
    {
        if(delivery_item.delivery_Id===Id)
        {
            matched=delivery_item;
        }
    })
    return matched||matched[0];
}