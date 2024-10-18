const images = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/2024/AugART_24/Gateway/PC/D151005745_IN_WLA_AugART24_Gateway_PC_Hero_3000x1200._CB566514818_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/pcacc/AugART/HERO/PC-ACC_PC_Hero_3000x1200._CB566425583_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/Symbol/2024/AugART/Hero/PEA/71_PC._CB568307876_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/Events/img24/AugART24/Hero/DATES/AugART24_GW_PC_Hero_NTA_LDT_2x_V2._CB566516236_.jpg'
];
let index=0;
let tochange=document.querySelector('.hero-image');
const wait=2000;
function change_background()
{
    tochange.innerHTML=`<img src="${images[index]}">`;
    index=(index+1)%images.length;
}
change_background();
setInterval(change_background,wait);
