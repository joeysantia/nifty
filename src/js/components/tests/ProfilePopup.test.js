import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, useParams } from "react-router";
import { store } from "../../reduxFiles/store";
import ProfilePopup from "../ProfilePopup";
import InitStore from "./utils/InitStore";

let mockSignOut = jest.fn();
let mockRemovePopup = jest.fn();

jest.mock("firebase/auth", () => {
  return {
    ...jest.requireActual("firebase/auth"),
    signOut: () => mockSignOut(),
  };
});

describe("ProfilePopup", () => {
  it("renders as a popup with an image, link, heading, and logout button", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <ProfilePopup removePopup={mockRemovePopup} />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(screen).toMatchSnapshot();
  });

  it("calls the removePopup function when user clicks outside of the component", () => {
    render(
        <Provider store={store}>
          <InitStore />
          <div data-testid="not-profile-popup"></div>
          <ProfilePopup removePopup={mockRemovePopup} />
        </Provider>,
        { wrapper: MemoryRouter }
      );
    userEvent.click(screen.getByTestId("not-profile-popup"))
    expect(mockRemovePopup).toHaveBeenCalled()
  })

  it('sends the user to their profile page when link is clicked', () => {
    
    function DisplayParams() {
        let { userId } = useParams()
        return <h1>{userId}</h1>
    }
    
    render(
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Provider store={store}>
        <InitStore />
        <ProfilePopup removePopup={mockRemovePopup} />
      </Provider>} />
                <Route path="/user/:userId" element={<DisplayParams />}></Route>
            </Routes>
        </MemoryRouter>
    )

    userEvent.click(screen.getByRole("link", { name: "View your profile"}))
    expect(screen.getByRole("heading", { name: "123abc"})).toBeInTheDocument()
  })

  it('calls the signOut function when the logout button is clicked', () => {
    render(
        <Provider store={store}>
          <InitStore />
          <ProfilePopup removePopup={mockRemovePopup} />
        </Provider>,
        { wrapper: MemoryRouter }
      );
    userEvent.click(screen.getByAltText("sign-out"))
    expect(mockSignOut).toHaveBeenCalled()
  })
});
