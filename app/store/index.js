import {configureStore} from "@reduxjs/toolkit";
import authService  from "./service/authService";

import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "./reducers/globalReducer";
import authReducer from "./reducers/authReducer";
import getUsersService from "./service/getUserService";


const Store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [getUsersService.reducerPath]: getUsersService.reducer,
        "authReducer": authReducer,
        "globalReducer": globalReducer,

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware, getUsersService.middleware),
});
setupListeners(Store.dispatch);
export default Store;