import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemSummary from "../ItemSummary";

jest.mock("../Counter.js", () => ({ quantity, setQuantity }) => {
  return (
    <button
      data-testid="counter"
      onClick={() => setQuantity((x) => x + 1)}
    ></button>
  );
});

jest.mock("../../helpers/totalFns.js", () => {
  return {
    ...jest.requireActual("../../helpers/totalFns.js"),
    getSubtotal: (arr) => arr.length,
  };
});

describe("ItemSummary", () => {
  let baseCart = [
    {
      name: "shoes",
      id: "abcdefg",
      type: "listing",
      shopId: "123",
      price: 29.95,
      description: "New pair of shoes",
      options: [],
      images: [
        {
          src: "www.photo.com",
          alt: "photo",
        },
      ],
      reviews: [],
      quantity: 1,
    },
    {
      name: "shirt",
      id: "hijklmn",
      type: "listing",
      shopId: "456",
      price: 19.95,
      description: "Brand new t-shirt",
      options: [],
      images: [{
        src: "www.photo.com",
        alt: "photo"
      }],
      reviews: [],
      quantity: 2,
    },
  ];

  let baseItem = {
    name: "shirt",
    id: "hijklmn",
    type: "listing",
    shopId: "456",
    price: 19.95,
    description: "Brand new t-shirt",
    options: [],
    images: [
      {
        src: "www.photo.com",
        alt: "photo",
      },
    ],
    reviews: [],
    quantity: 2,
  };

  let setCart = jest.fn();

  it("renders as a container with an image, counter, and subtotal", () => {
    let cart = JSON.parse(JSON.stringify(baseCart))
    let item = JSON.parse(JSON.stringify(baseItem))
    
    render(
        <ItemSummary cart={cart} setCart={setCart} item={item} />
    );
    expect(screen).toMatchSnapshot();
  });

  it("changes the subtotal displayed when the counter changes quantity state", () => {
    let cart = JSON.parse(JSON.stringify(baseCart))
    let item = JSON.parse(JSON.stringify(baseItem))
    
    render(
        <ItemSummary cart={cart} setCart={setCart} item={item} />
    );
    userEvent.click(screen.getByTestId("counter"));
    expect(screen.getByRole("heading").textContent).toMatch(/\$3/i);
  });

  it("calls the setCart function when the quantity changes", () => {
    let cart = JSON.parse(JSON.stringify(baseCart))
    let item = JSON.parse(JSON.stringify(baseItem))
    
    render(
        <ItemSummary cart={cart} setCart={setCart} item={item} />
    );
    userEvent.click(screen.getByTestId("counter"));
    expect(setCart).toHaveBeenCalled();
  });

  it("calls the setCart function with updated cart when the quantity changes", () => {
    let updatedCart = [
      {
        name: "shoes",
        id: "abcdefg",
        type: "listing",
        shopId: "123",
        price: 29.95,
        description: "New pair of shoes",
        options: [],
        images: [{
            src: "www.photo.com",
            alt: "photo"
          }],
        reviews: [],
        quantity: 1,
      },
      {
        name: "shirt",
        id: "hijklmn",
        type: "listing",
        shopId: "456",
        price: 19.95,
        description: "Brand new t-shirt",
        options: [],
        images: [
          {
            src: "www.photo.com",
            alt: "photo",
          },
        ],
        reviews: [],
        quantity: 3,
      },
    ];

    let cart = JSON.parse(JSON.stringify(baseCart))
    let item = JSON.parse(JSON.stringify(baseItem))

    render(
        <ItemSummary cart={cart} setCart={setCart} item={item} />
    );
    userEvent.click(screen.getByTestId("counter"));
    expect(setCart.mock.calls[0][0]).toEqual(updatedCart);
  });

  it("calls the setCart function when Remove button is clicked", () => {
    
    let cart = JSON.parse(JSON.stringify(baseCart))
    let item = JSON.parse(JSON.stringify(baseItem))

    render(
        <ItemSummary cart={cart} setCart={setCart} item={item} />
    );
    userEvent.click(screen.getByRole("button", { name: "Remove from cart" }));
    expect(setCart).toHaveBeenCalled();
  });

  it("removes the item from the cart when Remove button is clicked", () => {
    
    let updatedCart = [
      {
        name: "shoes",
        id: "abcdefg",
        type: "listing",
        shopId: "123",
        price: 29.95,
        description: "New pair of shoes",
        options: [],
        images: [
          {
            src: "www.photo.com",
            alt: "photo",
          },
        ],
        reviews: [],
        quantity: 1,
      },
    ];

    let cart = JSON.parse(JSON.stringify(baseCart))
    let item = JSON.parse(JSON.stringify(baseItem))

    render(
        <ItemSummary cart={cart} setCart={setCart} item={item} />
    );
    userEvent.click(screen.getByRole("button", { name: "Remove from cart" }));
    console.log(setCart.mock.calls[0][0])
    expect(setCart.mock.calls[1][0]).toEqual(updatedCart);
  });
});
