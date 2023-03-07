import { getSubtotal, getTotal } from "../totalFns";

describe("totalFns", () => {
  let itemsOne = [
    { 
      price: 4,
      quantity: 1
    },
    {
      price: 6,
      quantity: 2
    },
    {
      price: 10,
      quantity: 3
    },
    {
      price: 10,
      quantity: 4
    },
  ];

  let itemsTwo = [
    {
      price: 4,
      quantity: 1,
      shipping: 1,
    },
    {
      price: 6,
      quantity: 2,
    },
    {
      price: 10,
      quantity: 3,
      shipping: 3,
    },
    {
      price: 10,
      quantity: 4
    },
  ];

  it('getSubtotal correctly finds the subtotal of a list of items', () => {
    expect(getSubtotal(itemsOne)).toEqual(86)
  })

  it('getSubtotal ignores shipping', () => {
    expect(getSubtotal(itemsTwo)).toEqual(86)
  })

  it('getTotal correctly finds the total of items without shipping', () => {
    expect(getTotal(itemsOne)).toEqual(86)
  })

  it('getTotal correctly finds the total of a list of items with shipping,', () => {
    expect(getTotal(itemsTwo)).toEqual(90)
  } )


});
