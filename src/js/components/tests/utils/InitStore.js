import { useDispatch } from "react-redux";
import { editListings } from "../../../reduxFiles/slices/listingSlice";
import { editSearchResults } from "../../../reduxFiles/slices/searchResultSlice";
import { editShops } from "../../../reduxFiles/slices/shopSlice";
import { editUser } from "../../../reduxFiles/slices/userSlice";

export default function InitStore() {
  let dispatch = useDispatch();

  const mockListings = [
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
  ];

  const mockSearchResults = [];

  const mockShops = [
    {
      name: "Homemade Goods",
      id: "zyxwuc",
      type: "shop",
      profileImg: "www.photo.com",
      bannerPhotos: [],
      city: "Santa Fe",
      descritpion: "We make homemade goods",
      reviews: [],
    },
  ];

  let mockUser = {
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
        images: [],
        reviews: [],
      },
    ],
    favoriteShops: [],
    favoriteMaterials: "",
  };

  dispatch(editListings(mockListings));
  dispatch(editShops(mockShops));
  dispatch(editUser(mockUser));
  dispatch(editSearchResults(mockSearchResults));

  return <></>
}
