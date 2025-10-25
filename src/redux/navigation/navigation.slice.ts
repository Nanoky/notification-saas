import { createSlice } from "@reduxjs/toolkit";

// src/store/navigationSlice.ts
const slice = createSlice({
    name: 'navigation',
    initialState: {
        nextPath: null as string | null
    },
    reducers: {
        navigateTo: (state, action) => {
            state.nextPath = action.payload;
        }
    }
});

export const NavigationActions = slice.actions;
export const navigationReducer = slice.reducer;