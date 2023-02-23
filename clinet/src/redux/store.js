import {configureStore} from "@reduxjs/toolkit";
import appStateSlice from "./featuers/appStateSlice";
import authModalSlice from "./featuers/authModalSlice";
import globalLoadingSlice from "./featuers/globalLoadingSlice";
import themeModeSlice from "./featuers/themeModeSlice";
import userSlice from "./featuers/userSlice";

const store = configureStore({
    reducer:{
        user: userSlice,
        themeMode: themeModeSlice,
        authModal: authModalSlice,
        globalLoading: globalLoadingSlice,
        appState: appStateSlice
    }
});

export default store;