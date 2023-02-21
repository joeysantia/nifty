import { createSlice } from "@reduxjs/toolkit"


//import getListings once it's made
const initialState = {
    listings: getListings()
}

export const listingSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {
        editListings: (state, action) => {
            return {
                ...state,
                listings: action.payload
            }
        }
    }
})

export const { editListings } = listingSlice.actions
export const selectListings = (state) => state.listings
export default listingSlice.reducer
