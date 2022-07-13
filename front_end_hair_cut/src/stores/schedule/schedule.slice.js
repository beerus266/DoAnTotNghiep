import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
    name: 'service',
    initialState: {
        schedules: []
    },
    reducers: {
        loadSchedules: (state, action) => {
            state.schedules = action.payload;
        }
    }
});

export const {
    loadSchedules
} = scheduleSlice.actions

export default scheduleSlice.reducer;