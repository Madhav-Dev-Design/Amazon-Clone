import { format_currency } from "../js-Files/Utilities/format.js";
console.log('Test Suite:Format_currency');
if(format_currency(2095)=='20.95')
{
    console.log('Passed');
}
else
{
    console.log('Failed');
}
if(format_currency(5004)=='50.04')
{
    console.log('Passed');
}
else
{
    console.log('Failed');
}
if(format_currency(0)=='0.00')
{
    console.log('Passed');
}
else
{
    console.log('Failed');
}
if(format_currency(2000.5)=='20.01')
{
    console.log('Passed');
}
else
{
    console.log('Failed');
}

