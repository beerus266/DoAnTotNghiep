import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        id: 0,
        token: '',
        role: 'owner'
    },
    reducers: {
        loadUser: (state, action) => {
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.role = action.payload.role;
        }
    }
});

export const {
    loadUser
} = accountSlice.actions

export default accountSlice.reducer;