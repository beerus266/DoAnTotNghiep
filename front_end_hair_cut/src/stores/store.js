import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/account.slice";
import storeReducer from "./store/store.slice";
import serviceReducer from "./service/service.slice";
import scheduleReducer from './schedule/schedule.slice'

export default configureStore({
    reducer: {
        account: accountReducer,
        store: storeReducer,
        service: serviceReducer,
        schedule: scheduleReducer
    },
});