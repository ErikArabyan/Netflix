import { configureStore } from '@reduxjs/toolkit';
import { filmsAPISlice } from '../features/filmsAPI/filmSlice';
import { userSlice } from '../features/userAPI/userSlice';
import { loginSlice } from '../features/loginAPI/loginSlice';
import { logoutSlice } from '../features/logoutAPI/logoutSlice';
import { filmdetailsAPISlice } from '../features/filmDetailsAPI/filmDetailsSlice';
import { loadingSlice } from '../features/loading/loading';
// import { registerCodeVerificationSlice } from '../features/registerCodeVerification/registerCodeVerificationSlice';

export const store = configureStore({
  reducer: {
    filmsAPI: filmsAPISlice.reducer,
    filmdetailsAPISlice: filmdetailsAPISlice.reducer,
    userAPI: userSlice.reducer,
    loginAPI: loginSlice.reducer,
    logoutAPI: logoutSlice.reducer,
    loadingReducer: loadingSlice.reducer,
    // registerCodeVerificationReducer: registerCodeVerificationSlice.reducer,
  },
});
