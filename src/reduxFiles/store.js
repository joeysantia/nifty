import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice"
import listingsReducer from "./slices/listingSlice"
import shopsReducer from "./slices/shopSlice"
import searchResultsReducer from './slices/searchResultSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    listings: listingsReducer,
    shops: shopsReducer,
    searchResults: searchResultsReducer
  },
});
