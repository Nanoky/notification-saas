import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    inFlight: { [key: string]: string }
} = {
    inFlight: {},
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addInFlight(state, action) {
            state.inFlight = {
                ...state.inFlight,
                [action.payload]: action.payload
            }
        },
        removeInFlight(state, action) {
            delete state.inFlight[action.payload]
        },
    }
});

export const AppActions = slice.actions;
export const appReducer = slice.reducer;