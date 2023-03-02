/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import AddReviewForm from "../AddReviewForm";
import { ListingContext } from "../../context/ListingContext";
import userEvent from "@testing-library/user-event";
import { getDownloadURL } from "firebase/storage";
import { store } from "../../reduxFiles/store";
import InitStore from "./utils/InitStore";
import { selectListings } from "../../reduxFiles/slices/listingSlice";
import { selectShops } from "../../reduxFiles/slices/shopSlice";
import { act } from "react-dom/test-utils";
let mockRef = jest.fn();
mockRef.mockReturnValue("reference");
let mockUploadBytes = jest.fn();
let mockGetDownloadURL = jest.fn();
mockGetDownloadURL.mockReturnValue("www.photo.com");
jest.mock("firebase/storage", () => {
  return {
    ...jest.requireActual("firebase/storage"),
    ref: () => mockRef(),
    uploadBytes: async () => await mockUploadBytes(),
    getDownloadURL: async () => await mockGetDownloadURL(),
  };
});

describe("AddReviewForm", () => {
  let mockRemovePopup;
  let mockListing = {
    name: "shoes",
    id: "abcdefg",
    type: "listing",
    shopId: "123",
    price: 29.95,
    description: "New pair of shoes",
    options: [],
    images: [],
    reviews: [],
  };

  it("renders as a form with a delete button", () => {
    mockRemovePopup = jest.fn();
    render(
      <Provider store={store}>
        <ListingContext.Provider value={mockListing}>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("unmounts when delete button is clicked", () => {
    mockRemovePopup = jest.fn();
    render(
      <Provider store={store}>
        <ListingContext.Provider value={mockListing}>
          <InitStore />
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    userEvent.click(screen.getByAltText("4 stars"));
    userEvent.click(screen.getByRole("button", { name: "Post your review" }));
    expect(mockRemovePopup).toHaveBeenCalled();
  });

  it("submits a review and unmounts when a click is registered outside of the component", () => {
    mockRemovePopup = jest.fn();
    render(
      <Provider store={store}>
        <ListingContext.Provider value={mockListing}>
          <button>Not form</button>
          <InitStore />
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    userEvent.click(screen.getByRole("button", { name: "Not form" }));
    expect(mockRemovePopup).toHaveBeenCalled();
  });

  it("will not submit a review if the required fields are not filled out", () => {
    mockRemovePopup = jest.fn();
    render(
      <Provider store={store}>
        <ListingContext.Provider value={mockListing}>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    userEvent.type(screen.getByRole("textbox"), "I love this item!");
    userEvent.click(screen.getByRole("button", { name: "Post your review" }));
    expect(mockRemovePopup).not.toHaveBeenCalled();
  });

  it("will generate a message if an invalid submit happens", () => {
    render(
      <Provider store={store}>
        <ListingContext.Provider value={mockListing}>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    userEvent.type(screen.getByRole("textbox"), "I love this item!");
    userEvent.click(screen.getByRole("button", { name: "Post your review" }));
    expect(
      screen.getByText("You must select a number of stars.")
    ).toBeInTheDocument();
  });

  it("fires firebase events when form is submitted", () => {
    mockRemovePopup = jest.fn();
    render(
      <Provider store={store}>
        <ListingContext.Provider value={mockListing}>
          <InitStore />
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    const file = new File(["test"], "test.png", { type: "image/png" });

    userEvent.type(screen.getByRole("textbox"), "I love this item!");
    userEvent.click(screen.getByAltText("4 stars"));
    userEvent.upload(screen.getByTitle("review-photo"), file);
    userEvent.click(screen.getByRole("button", { name: "Post your review" }));

    expect(mockRef).toHaveBeenCalled();
    expect(mockUploadBytes).toHaveBeenCalled();
  });

  it.only("will update listing reviews and shop reviews when submit event fires", async () => {
    mockRemovePopup = jest.fn();
    mockListing = {
      name: "shoes",
      id: "abcdefg",
      type: "listing",
      shopId: "123",
      price: 29.95,
      description: "New pair of shoes",
      options: [],
      images: [],
      reviews: [],
    };

    const DisplayListingsAndStores = () => {
      let listings = useSelector(selectListings);
      let shops = useSelector(selectShops);
      let listing = listings.find((listing) => listing.id === mockListing.id);
      console.log("listing:", listing.reviews.length);
      let shop = shops.find((shop) => shop.id === listing.shopId);
      console.log("shop:", shop.reviews.length);
      return (
        <div>
          <div>
            <h2 data-testid="listing review length">
              {listing.reviews.length}
            </h2>
            <h2 data-testid="listing review stars">
              {listing.reviews.length ? listing.reviews[0].stars : ""}
            </h2>
            <h2 data-testid="shop review length">{shop.reviews.length}</h2>
            <h2 data-testid="shop review description">
              {shop.reviews.length ? shop.reviews[0].description : ""}
            </h2>
          </div>
        </div>
      );
    };
    render(
      <Provider store={store}>
        <ListingContext.Provider value={mockListing}>
          <InitStore />
          <AddReviewForm removePopup={mockRemovePopup} />
          <DisplayListingsAndStores />
        </ListingContext.Provider>
      </Provider>
    );
    const file = new File(["test"], "test.png", { type: "image/png" });

    await act(() => {

    userEvent.type(screen.getByRole("textbox"), "I love this item!");
    userEvent.click(screen.getByAltText("4 stars"));
    userEvent.upload(screen.getByTitle("review-photo"), file);
    userEvent.click(screen.getByRole("button", { name: "Post your review" }));

    })
    expect(screen.getByTestId("listing review length").textContent).toMatch(
      /1/
    );
    expect(screen.getByTestId("listing review stars").textContent).toMatch(/4/);
    expect(screen.getByTestId("shop review length").textContent).toMatch(/1/);
    expect(screen.getByTestId("shop review description").textContent).toMatch(
      /i love this item!/i
    );
  });
});
