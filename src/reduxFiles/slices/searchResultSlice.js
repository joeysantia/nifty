import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchResults: []
}

export const searchResultSlice = createSlice({
    name: "searchResults",
    initialState,
    reducers: {
        editSearchResults: (state, action) => {
            return {
                ...state, 
                searchResults: action.payload
            }
        }
    }
})

export const { editSearchResults } = searchResultSlice.actions
export const selectSearchResults = (state) => state.searchResults
export default searchResultSlice.reducer