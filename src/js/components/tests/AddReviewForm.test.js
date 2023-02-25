/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import AddReviewForm from "../AddReviewForm";
import { ListingContext } from "../../context/ListingContext";
import { mockStore } from "./mockRedux/mockStore";
import  userEvent  from "@testing-library/user-event"

  let mockRef = jest.fn()
  mockRef.mockReturnValue('reference')
  let mockUploadBytes = jest.fn()
  let mockGetDownloadURL = jest.fn()
  mockGetDownloadURL.mockReturnValue('www.photo.com')
  let mockTest = jest.fn()
  jest.mock('firebase/storage', () => {
    return {
      ...jest.requireActual('firebase/storage'),
      ref: () => mockRef(),
      uploadBytes: () => mockUploadBytes(),
      getDownloadURL: () => mockTest(),
    }
  })


describe("AddReviewForm", () => {
  let mockRemovePopup;
  const mockListing = {
    name: "shirt",
    shopId: "456",
    reviews: [],
  };

  it("renders as a form with a delete button", () => {
    mockRemovePopup = jest.fn()
    render(
      <Provider store={mockStore}>
        <ListingContext.Provider value={mockListing}>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("unmounts when delete button is clicked", () => {
    mockRemovePopup = jest.fn()
    render(
      <Provider store={mockStore}>
        <ListingContext.Provider value={mockListing}>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    userEvent.click(screen.getByAltText("4 stars"));
    userEvent.click(screen.getByRole("button", { name: "Post your review" }));
    expect(mockRemovePopup).toHaveBeenCalled();
        
});

  it("submits a review and unmounts when a click is registered outside of the component", () => {
    mockRemovePopup=jest.fn()
    render(
      <Provider store={mockStore}>
        <ListingContext.Provider value={mockListing}>
          <button>Not form</button>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    )

    userEvent.click(screen.getByRole("button", { name: "Not form"}))
    expect(mockRemovePopup).toHaveBeenCalled()
  });

  it("will not submit a review if the required fields are not filled out", () => {
    mockRemovePopup = jest.fn()
    render(
      <Provider store={mockStore}>
        <ListingContext.Provider value={mockListing}>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    userEvent.type(screen.getByRole("textbox"), "I love this item!");
    userEvent.click(screen.getByRole("button", { name: "Post your review"}))
    expect(mockRemovePopup).not.toHaveBeenCalled()
  });

  it("will generate a message if an invalid submit happens", () => {
    render(
      <Provider store={mockStore}>
        <ListingContext.Provider value={mockListing}>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    userEvent.type(screen.getByRole("textbox"), "I love this item!");
    userEvent.click(screen.getByRole("button", { name: "Post your review"}))
    expect(screen.getByText("You must select a number of stars.")).toBeInTheDocument()
  });

  it("updates listing's reviews when form is submitted", () => {
    mockRemovePopup = jest.fn()
    render(
      <Provider store={mockStore}>
        <ListingContext.Provider value={mockListing}>
          <AddReviewForm removePopup={mockRemovePopup} />
        </ListingContext.Provider>
      </Provider>
    );

    const file = new File(['test'], 'test.png', { type: 'image/png'})

    userEvent.type(screen.getByRole("textbox"), "I love this item!");
    userEvent.click(screen.getByAltText("4 stars"));
    userEvent.upload(screen.getByTitle("review-photo"), file)
    userEvent.click(screen.getByRole("button", { name: "Post your review"}))
    
    expect(mockRef).toHaveBeenCalled()
    expect(mockUploadBytes).toHaveBeenCalled()
    expect(mockTest).toHaveBeenCalled()



  });
});
