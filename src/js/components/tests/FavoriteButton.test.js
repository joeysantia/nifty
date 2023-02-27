import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, useDispatch, useSelector } from "react-redux";
import { editListings } from "../../reduxFiles/slices/listingSlice";
import { editShops } from "../../reduxFiles/slices/shopSlice";
import { editUser, selectUser } from "../../reduxFiles/slices/userSlice";
import { store } from "../../reduxFiles/store";
import FavoriteButton from "../FavoriteButton";
import { mockListings } from "./mockRedux/mockListings";
import { mockShops } from "./mockRedux/mockShops";
import { mockUser } from "./mockRedux/mockUser";

let favItem = {
  name: "shirt",
  id: "hijklmn",
  type: "listing",
  shopId: "456",
  price: 19.95,
  description: "Brand new t-shirt",
  options: [],
  images: [],
  reviews: [],
};

let listing = {
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

let shop = {
  name: "Homemade Goods",
  id: "zyxwuc",
  type: "shop",
  profileImg: "www.photo.com",
  bannerPhotos: [],
  city: "Santa Fe",
  descritpion: "We make homemade goods",
  reviews: [],
};

describe("FavoriteButton", () => {
  const InitStore = () => {
    let dispatch = useDispatch();
    dispatch(editUser(mockUser));
    dispatch(editListings(mockListings));
    dispatch(editShops(mockShops));
    return <></>;
  };

  it("renders as a div with an image", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <FavoriteButton item={listing} />
      </Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("renders as a blank heart if the item is not favorited", () => {
    render(
      <Provider store={store}>
        <InitStore />

        <FavoriteButton item={listing} />
      </Provider>
    );
    expect(screen.getByAltText("empty heart")).toBeInTheDocument();
  });

  it("renders as a red heart if the item is favorited", () => {
    render(
      <Provider store={store}>
        <InitStore />

        <FavoriteButton item={favItem} />
      </Provider>
    );
    expect(screen.getByAltText("red heart")).toBeInTheDocument();
  });

  it("changes heart color if the user favorites the item", () => {
    render(
      <Provider store={store}>
        <InitStore />

        <FavoriteButton item={listing} />
      </Provider>
    );
    userEvent.click(screen.getByRole("img"));
    expect(screen.getByAltText("red heart")).toBeInTheDocument();
  });

  it("changes heart color if the user un-favorites the item", () => {
    render(
      <Provider store={store}>
        <InitStore />

        <FavoriteButton item={favItem} />
      </Provider>
    );
    userEvent.click(screen.getByRole("img"));
    expect(screen.getByAltText("empty heart")).toBeInTheDocument();
  });

  it("updates the favorited status of the item if the user favorites the item", () => {
    
    const DisplayFavItems = () => {
      const user = useSelector(selectUser)
      console.log(user)
      return <h1>{user.favoriteItems.length}</h1>
    }
    
    render(
      <Provider store={store}>
        <InitStore />
        <FavoriteButton item={listing} />
      </Provider>
    );
    userEvent.click(screen.getByRole("img"));
    render(<Provider store={store}><DisplayFavItems /></Provider>)
    expect(screen.getByRole("heading").textContent).toMatch(/2/);

  });

  it("updates the favorited status of the item if the user un-favorites the item", () => {
    const DisplayFavStores = () => {
      let user = useSelector(selectUser)
      return <h1>{user.favoriteShops.length}</h1>

    }
    render(
      <Provider store={store}>
        <InitStore />
        <FavoriteButton item={shop} />
      </Provider>
    );
    userEvent.click(screen.getByRole("img"));
    render(<Provider store={store}><DisplayFavStores /></Provider>)
    expect(screen.getByRole("heading").textContent).toMatch(/1/);
  });
});
