import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./slices/reduxPopUpSlices";
import popupPptReducer from "./slices/reduxPopUpPptSlices";
import menuMobileReduces from "./slices/reduxMenuMobileSlices";
import keywordSearchReducers from "./slices/reduxKeywordSearchSlices";
import userDataReducers from "./slices/reduxUserDataSlices";

const store = configureStore({
    reducer: {
        popup: popupReducer,
        menuMobile: menuMobileReduces,
        keywordSearch: keywordSearchReducers,
        popupPpt: popupPptReducer,
        userData: userDataReducers,
    },
})

console.log("On Create Store Changed : ", store.getState());

store.subscribe(() => {
  console.log("Store Changed : ", store.getState());
});

export default store;