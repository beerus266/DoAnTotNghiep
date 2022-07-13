import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: []
    },
    reducers: {
        loadServices: (state, action) => {
            state.services = action.payload;
        }
    }
});

export const {
    loadServices
} = serviceSlice.actions

export default serviceSlice.reducer;