import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    user: getUser(getAuth().currentUser.uid)
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    editEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    editPhotoURL: (state, action) => {
      return {
        ...state,
        photoURL: action.payload,
      };
    },
    editCart: (state, action) => {
      return {
        ...state,
        cart: action.payload,
      };
    },
    editGender: (state, action) => {
      return {
        ...state,
        gender: action.payload,
      };
    },
    editAddress: (state, action) => {
      return {
        ...state,
        address: action.payload,
      };
    },
    editAbout: (state, action) => {
      return {
        ...state,
        about: action.payload,
      };
    },
    editFavoriteMaterials: (state, action) => {
      return {
        ...state,
        favoriteMaterials: action.payload,
      };
    },
    editFavoriteItems: (state, action) => {
      return {
        ...state,
        favoriteItems: action.payload,
      };
    },
    editFavoriteShops: (state, action) => {
      return {
        ...state,
        favoriteShops: action.payload,
      };
    },
  },
});

export const {
  editName,
  editEmail,
  editPhotoURL,
  editCart,
  editGender,
  editAddress,
  editAbout,
  editFavoriteMaterials,
  editFavoriteItems,
  editFavoriteShops,
} = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
