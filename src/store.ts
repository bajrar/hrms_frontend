import { configureStore } from '@reduxjs/toolkit';
// import attendanceStatusSlice from './redux/features/attendanceStatusSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { rootReducer } from './redux/rootReducer';
import { apiMiddleware } from './redux/apiMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
