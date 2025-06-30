import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersAPI } from '../Features/users/userAPI';
import { loginAPI } from '../Features/login/loginAPI';

import { bookingsAPI } from '../Features/bookings/bookingsAPI'; 
import userSlice from '../Features/login/userSlicer';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { carsAPI } from '../Features/cars/carsAPI';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [carsAPI.reducerPath]: carsAPI.reducer,
  [bookingsAPI.reducerPath]: bookingsAPI.reducer, 
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersAPI.middleware)
      .concat(loginAPI.middleware)
      .concat(carsAPI.middleware)
      .concat(bookingsAPI.middleware), 
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
