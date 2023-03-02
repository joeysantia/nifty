import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../reduxFiles/store";
import AboutPopup from "../AboutPopup";
import InitStore from "./utils/InitStore";
import { BrowserRouter, Route, Routes, MemoryRouter, useParams } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe("AboutPopup", () => {
  let defaultUser = {
    name: "John Smith",
    email: "john.smith@gmail.com",
    photoURL: "www.photo.com",
    id: "123abc",
    cart: [],
    gender: "male",
    address: {
        city: "San Diego",
    },
    about: "Passionate about arts and crafts!",
    favoriteItems: [
      {
        name: "shirt",
        id: "hijklmn",
        type: "listing",
        shopId: "456",
        price: 19.95,
        description: "Brand new t-shirt",
        options: [],
        images: [],
        reviews: [],
      },
    ],
    favoriteShops: [],
    favoriteMaterials: "",
  };

  let mockRemovePopup = jest.fn();

  it("renders as a section with images, headers, paragraphs, and links", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <AboutPopup user={defaultUser} removePopup={mockRemovePopup} />
      </Provider>
    , {wrapper: MemoryRouter});
    expect(screen).toMatchSnapshot();
  });

  it("un-renders the component when the remove button is clicked", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <AboutPopup user={defaultUser} removePopup={mockRemovePopup} />
      </Provider>
    , {wrapper: MemoryRouter});
    userEvent.click(screen.getByAltText("remove"));
    expect(mockRemovePopup).toHaveBeenCalled()
  });

  it("un-renders the component when the user clicks outside of the component", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <div data-testid="not popup"></div>
        <AboutPopup user={defaultUser} removePopup={mockRemovePopup} />
      </Provider>
    , {wrapper: MemoryRouter});

    userEvent.click(screen.getByTestId("not popup"));
    expect(mockRemovePopup).toHaveBeenCalled()
  });

  it("un-renders the component when the Done button is clicked", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <AboutPopup user={defaultUser} removePopup={mockRemovePopup} />
      </Provider>
    , {wrapper: MemoryRouter});

    userEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(mockRemovePopup).toHaveBeenCalled()
  });

  it("displays two links to edit profile when user views their own profile", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <AboutPopup user={defaultUser} removePopup={mockRemovePopup} />
      </Provider>
    , {wrapper: MemoryRouter});

    expect(
      screen.getAllByRole("link", { name: "Edit public profile" }).length
    ).toEqual(2);
  });

  it('routes user to editProfile page when "Edit public profile" button is clicked', () => {
    
    function DisplayUserId() {
        let { userId } = useParams()

        return <h1 data-testid="user-id">{userId}</h1>
    }

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Provider store={store}>
            <InitStore />
            <AboutPopup user={defaultUser} removePopup={mockRemovePopup} />
          </Provider>} />
          <Route
            path="/user/:userId"
            element={<DisplayUserId />}
           />
        </Routes>
      </MemoryRouter>
    );

   userEvent.click(screen.getByRole("button", { name: "Edit public profile"}))

    expect(screen.getByTestId("user-id").textContent).toMatch(/123abc/i)
});

  it('routes user to editProfile page when "Edit public profile" link is clicked', async () => {
    
    function DisplayUserId() {
        let { userId } = useParams()

        return <h1 data-testid="user-id">{userId}</h1>
    }
    render(
        <MemoryRouter>
        <Routes>
          <Route path="/" element={<Provider store={store}>
            <InitStore />
            <AboutPopup user={defaultUser} removePopup={mockRemovePopup} />
          </Provider>} />
          <Route
            path="/user/:userId"
            element={<DisplayUserId />}
           />
        </Routes>
      </MemoryRouter>
    );


    userEvent.click(screen.getByTestId("first link"))
    expect(screen.getByTestId("user-id").textContent).toMatch(/123abc/i)
  });

  it("does not display 'Edit public profile' links when current user views another user's profile", () => {
    let diffUser = {
        name: "NOT John Smith",
        email: "john.smith@gmail.com",
        photoURL: "www.photo.com",
        id: "456def",
        cart: [],
        gender: "male",
        address: {
            city: "San Diego",

        },
        about: "Passionate about arts and crafts!",
        favoriteItems: [
          {
            name: "shirt",
            id: "hijklmn",
            type: "listing",
            shopId: "456",
            price: 19.95,
            description: "Brand new t-shirt",
            options: [],
            images: [],
            reviews: [],
          },
        ],
        favoriteShops: [],
        favoriteMaterials: "",
      };
    
    render(
        <Provider store={store}>
          <InitStore />
          <AboutPopup user={diffUser} removePopup={mockRemovePopup} />
        </Provider>
      , {wrapper: MemoryRouter});

      expect(screen.queryByRole("link", { name: "Edit public profile" })).not.toBeInTheDocument();
  })


});
