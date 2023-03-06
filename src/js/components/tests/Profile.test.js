import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { editUser, selectUser } from "../../reduxFiles/slices/userSlice";
import { store } from "../../reduxFiles/store";
import Profile from "../Profile";
import InitStore from "./utils/InitStore";

jest.mock("../AboutPopup.js", () => ({ user }) => {
  return <h1>{user.name}'s AboutPopup rendered</h1>;
});
jest.mock("../ListingBlurb.js", () => ({ listing }) => {
    return <h1>{listing.name} rendered</h1>;
});
jest.mock("../ShopBlurb.js", () => ({ shop }) => {
  return <h1>{shop.name} rendered</h1>;
});
jest.mock("react-router", () => {
  return {
    ...jest.requireActual("react-router"),
    useParams: () => {
      return {
        userId: "123abc",
      };
    },
  };
});
jest.mock("../../firebaseFiles/firestoreDB", () => {
  return {
    ...jest.requireActual("../../firebaseFiles/firestoreDB"),
    getUser: () => {
      return {
        name: "Peter Smith",
        email: "john.smith@gmail.com",
        photoURL: "www.photo.com",
        id: "456abc",
        cart: [],
        gender: "male",
        city: "San Diego",
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
            images: [
              {
                src: "../../../img/shoes.jpg",
                alt: "shoes",
              },
            ],
            reviews: [],
          },
        ],
        favoriteShops: [
        {
          name: "Homemade Goods",
          images: [
            {
              src: "www.photo.com",
            }
          ]
        },
        { 
            name: "Boutique Supplies",
            images: [
            {
              src: "www.photo.com",
            }
          ]
        }
      ],
        favoriteMaterials: "",
      };
    },
  };
});

function AddShopToUserFavorites() {
    let dispatch = useDispatch();
    let newUser = {
      name: "Peter Smith",
      email: "john.smith@gmail.com",
      photoURL: "www.photo.com",
      id: "456def",
      cart: [],
      gender: "male",
      city: "San Diego",
      about: "Passionate about arts and crafts!",
      favoriteItems: [
        {
          name: "shirt",
        },
      ],
      favoriteShops: [
        {
          name: "Homemade Goods",
        },
        { 
            name: "Boutique Supplies"
        }
      ],
      favoriteMaterials: "",
    };
    dispatch(editUser(newUser));

    return <></>;
  }

describe("Profile", () => {
  it("renders as a profile page with links, images, and lists of blurbs", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(screen).toMatchSnapshot();
  });

  it("renders Edit Profile links if the user is viewing their own profile", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(
      screen.getByRole("link", { name: "Edit Profile" })
    ).toBeInTheDocument();
  });

  it("does not render Edit Profile link if the user is viewing a different profile", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <AddShopToUserFavorites />
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(
      screen.queryByRole("link", { name: "Edit Profile" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "About Peter" })
    ).toBeInTheDocument();
  });

  it("sends users to the editProfile component if the Edit Profile link is clicked", () => {
    function EditProfileMock() {
      return <h1>EditProfile rendered</h1>;
    }

    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Provider store={store}>
                <InitStore />
                <Profile />
              </Provider>
            }
          />
          <Route path="/user/editProfile" element={<EditProfileMock />} />
        </Routes>
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole("link", { name: "Edit Profile" }));
    expect(
      screen.getByRole("heading", { name: "EditProfile rendered" })
    ).toBeInTheDocument();
  });

  it("displays a welcome message based on username", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByText("About John")).toBeInTheDocument();
  });

  it("renders grey squares if there are not enough favorite items", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getAllByAltText("no item").length).toEqual(3);
  });

  it("focuses on favorite items by default", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText("shirt rendered")).toBeInTheDocument();
  });

  it("changes focus to shops when the Favorite Shops button is clicked", () => {

    render(
      <Provider store={store}>
        <InitStore />
        <AddShopToUserFavorites />
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    userEvent.click(screen.getByAltText("favorite shop"));
    expect(screen.getByText("Homemade Goods rendered")).toBeInTheDocument();
    expect(screen.getByText("Boutique Supplies rendered")).toBeInTheDocument();

});

  it("changes focus back to items when the Favorite Items button is clicked", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <Profile />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    userEvent.click(screen.getByAltText("favorite shop"));

    userEvent.click(screen.getByText("Favorite items"));
    expect(screen.getByText("shirt rendered")).toBeInTheDocument();
  });

  it("correctly displays the number of favorite items", () => {
    render(
        <Provider store={store}>
          <InitStore />
          <Profile />
        </Provider>,
        { wrapper: MemoryRouter }
      );
    expect(screen.getByText("1 item")).toBeInTheDocument()
  });

  it("correctly displays the number of favorite shops", () => {
    render(
        <Provider store={store}>
          <InitStore />
          <AddShopToUserFavorites />
          <Profile />
        </Provider>,
        { wrapper: MemoryRouter }
      );
    expect(screen.getByText("2 items")).toBeInTheDocument()
  });
});
