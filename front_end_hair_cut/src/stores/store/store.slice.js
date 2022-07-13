import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        stores: []
    },
    reducers: {
        loadStores: (state, action) => {
            state.stores = action.payload;
        }
    }
});

export const {
    loadStores
} = storeSlice.actions

export default storeSlice.reducer;