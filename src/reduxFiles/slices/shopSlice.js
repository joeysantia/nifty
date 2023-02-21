import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    shops: getShops()
}

export const shopSlice = createSlice({
    name: "shops",
    initialState,
    reducers: {
        editShops: (state, action) => {
            return {
                ...state,
                shops: action.payload
            }
        }
    }
})

export const { editShops } = shopSlice.actions
export const selectShops = (state) => state.shops
export default shopSlice.reducer