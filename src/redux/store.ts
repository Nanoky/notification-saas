
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { expireMiddleware } from "./app/expiration.middleware";
import { statusManagerReducer } from "./app/status-manager.slice";
import { listenerMiddleware } from "./listener";
import { appReducer } from "./app/config.slice";
import { navigationReducer } from "./navigation/navigation.slice";

const reducers = combineReducers({
    status: statusManagerReducer,
    app: appReducer,
    navigation: navigationReducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false })
                .concat([
                    expireMiddleware,
                    listenerMiddleware.middleware
                ])
    });
};

export const store = makeStore();

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;