import { format_currency } from "../js-Files/Utilities/format.js";

describe('Test Suite: Format Currency',()=>
{
    //First Test
    console.log(format_currency(2095));
    it('Converts Cents into Dollars',()=>
    {
        expect(format_currency(2095)).toEqual('20.95');
    })
    it('Works with Zeros',()=>
    {
        expect(format_currency(0)).toEqual('0.00');
    })
    it('Rounds to the nearest cent',()=>
    {
        expect(format_currency(2000.5)).toEqual('20.01');
    })
})