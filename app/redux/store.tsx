import { configureStore } from "@reduxjs/toolkit";
// import loadingReducer from "./slices/reduxLoadingSlice";
// import idClientReducer from "./slices/reduxIdClientSlice";
// import messageReducer from "./slices/reduxMessageSlice";
// import dataWisataReducer from "./slices/reduxDataWisataSlice";
import popupReducer from "./slices/reduxPopUpSlices";
import popupPptReducer from "./slices/reduxPopUpPptSlices";
import menuMobileReduces from "./slices/reduxMenuMobileSlices";
import keywordSearchReducers from "./slices/reduxKeywordSearchSlices";
// import popupUploadReducer from "./slices/reduxPopupUploadSlice";
// import popupFunctionsMiddleware from "./middlewares/popupFunctionsMiddleware";

const store = configureStore({
    reducer: {
        popup: popupReducer,
        menuMobile: menuMobileReduces,
        keywordSearch: keywordSearchReducers,
        popupPpt: popupPptReducer,
        // popupUpload: popupUploadReducer,
        // loading: loadingReducer,
        // idClient: idClientReducer,
        // message: messageReducer,
        // dataWisata: dataWisataReducer,
    },
    // middleware: [popupFunctionsMiddleware]
})

console.log("On Create Store Changed : ", store.getState());

store.subscribe(() => {
  console.log("Store Changed : ", store.getState());
});

export default store;