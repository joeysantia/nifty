import { render, screen } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { editShops } from "../../reduxFiles/slices/shopSlice";
import { editUser, selectUser } from "../../reduxFiles/slices/userSlice";
import { store } from "../../reduxFiles/store";
import ShopPage from "../ShopPage";
import InitStore from "./utils/InitStore";

jest.mock("../FavoriteButton.js", () => ({ item }) => {


    let favoriteShops = [{
            name: "Homemade Goods",
            id: "123",
            type: "shop",
            profilePhoto: "www.photo.com",
            bannerPhotos: [
              {
                src: "www.photo.com",
                alt: "banner",
              },
              {
                src: "www.photo.com",
                alt: "banner",
              },
            ],
            city: "Santa Fe",
            descritpion: "We make homemade goods",
            reviews: [
              {
                id: "123",
                userPhoto: "www.photo.com",
                stars: 4,
                description: "Great item!",
                img: {
                  src: "www.photo.com",
                  alt: "review",
                },
              },
              {
                id: "456",
                userPhoto: "www.photo.com",
                stars: 5,
                description: "Love it!",
                img: {
                  src: "www.photo.com",
                  alt: "review",
                },
              },
            ],
            listings: [
              {
                name: "shoes",
                id: "abcdefg",
                type: "listing",
                shopId: "123",
                price: 29.95,
                description: "New pair of shoes",
                options: [],
                images: [],
                reviews: [],
              },
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
          }]

          function userHasFavoritedShop() {
            let userFavShopsString = JSON.stringify(favoriteShops)
            let shopString = JSON.stringify(item)

    
            return userFavShopsString.indexOf(shopString) >= 0
        }
    return (
        <h1>{`This shop is${userHasFavoritedShop() ? "" : " not"} favorited`}</h1>
    )

});

jest.mock("../ListingBlurb.js", () => () => {
  return <h1>Listing Blurb</h1>;
});

jest.mock("../ReviewHeader.js", () => () => {
  return <h1>Review Header</h1>;
});

jest.mock("../ReviewList.js", () => () => {
  return <h1>Review Listing</h1>;
});

describe("ShopPage", () => {
  let shop = {
    name: "Homemade Goods",
    id: "123",
    type: "shop",
    profilePhoto: "www.photo.com",
    bannerPhotos: [
      {
        src: "www.photo.com",
        alt: "banner",
      },
      {
        src: "www.photo.com",
        alt: "banner",
      },
    ],
    city: "Santa Fe",
    descritpion: "We make homemade goods",
    reviews: [
      {
        id: "123",
        userPhoto: "www.photo.com",
        stars: 4,
        description: "Great item!",
        img: {
          src: "www.photo.com",
          alt: "review",
        },
      },
      {
        id: "456",
        userPhoto: "www.photo.com",
        stars: 5,
        description: "Love it!",
        img: {
          src: "www.photo.com",
          alt: "review",
        },
      },
    ],
    listings: [
      {
        name: "shoes",
        id: "abcdefg",
        type: "listing",
        shopId: "123",
        price: 29.95,
        description: "New pair of shoes",
        options: [],
        images: [],
        reviews: [],
      },
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
  };
  it("renders as a main element with photos, child components, and shop info", () => {
    render(
      <Provider store={store}>
        <InitStore />
        <ShopPage shop={shop} />
      </Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("displays text 'Follow shop' and correctly styled FavoriteButton if the shop is not in the user's favorites", () => {
    
    let diffShop = {
        name: "NOT Homemade Goods",
        id: "456",
        type: "shop",
        profilePhoto: "www.photo.com",
        bannerPhotos: [
          {
            src: "www.photo.com",
            alt: "banner",
          },
          {
            src: "www.photo.com",
            alt: "banner",
          },
        ],
        city: "Santa Fe",
        descritpion: "We make homemade goods",
        reviews: [
          {
            id: "123",
            userPhoto: "www.photo.com",
            stars: 4,
            description: "Great item!",
            img: {
              src: "www.photo.com",
              alt: "review",
            },
          },
          {
            id: "456",
            userPhoto: "www.photo.com",
            stars: 5,
            description: "Love it!",
            img: {
              src: "www.photo.com",
              alt: "review",
            },
          },
        ],
        listings: [
          {
            name: "shoes",
            id: "abcdefg",
            type: "listing",
            shopId: "123",
            price: 29.95,
            description: "New pair of shoes",
            options: [],
            images: [],
            reviews: [],
          },
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
      }
    
    render(
        <Provider store={store}>
          <InitStore />
          <ShopPage shop={diffShop} />
        </Provider>
      );
    expect(screen.getByText("This shop is not favorited")).toBeInTheDocument()
    expect(screen.getByText("Follow shop")).toBeInTheDocument()
  })

  it("displays text 'Following shop' and correctly styled FavoriteButton if the shop is not in the user's favorites", () => {
    
    function AddShopToFavorites() {
        let newUser = {
            name: "John Smith",
            email: "john.smith@gmail.com",
            photoURL: "www.photo.com",
            id: "123abc",
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
                images: [{
                  src: 'www.photo.com',
                  alt: "shirt"
                }],
                reviews: [],
              },
            ],
            favoriteShops: [{
                name: "Homemade Goods",
                id: "123",
                type: "shop",
                profilePhoto: "www.photo.com",
                bannerPhotos: [
                  {
                    src: "www.photo.com",
                    alt: "banner",
                  },
                  {
                    src: "www.photo.com",
                    alt: "banner",
                  },
                ],
                city: "Santa Fe",
                descritpion: "We make homemade goods",
                reviews: [
                  {
                    id: "123",
                    userPhoto: "www.photo.com",
                    stars: 4,
                    description: "Great item!",
                    img: {
                      src: "www.photo.com",
                      alt: "review",
                    },
                  },
                  {
                    id: "456",
                    userPhoto: "www.photo.com",
                    stars: 5,
                    description: "Love it!",
                    img: {
                      src: "www.photo.com",
                      alt: "review",
                    },
                  },
                ],
                listings: [
                  {
                    name: "shoes",
                    id: "abcdefg",
                    type: "listing",
                    shopId: "123",
                    price: 29.95,
                    description: "New pair of shoes",
                    options: [],
                    images: [],
                    reviews: [],
                  },
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
              }],
            favoriteMaterials: "",
          };
        let dispatch = useDispatch()
        dispatch(editUser(newUser))
    }
    
    render(
        <Provider store={store}>
          <InitStore />
          <AddShopToFavorites />
          <ShopPage shop={shop} />
        </Provider>
      );
    expect(screen.getByText("This shop is favorited")).toBeInTheDocument()
    expect(screen.getByText("Following shop")).toBeInTheDocument()
  })
});
