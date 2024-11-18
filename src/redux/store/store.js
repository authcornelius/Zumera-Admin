import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slice/apiSlice";
import userReducer from "../slice/userSlice";
import blogReducer from "../slice/blogSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ['previewData']
};

const blogPersistConfig = {
  key: "blog",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedBlogReducer = persistReducer(blogPersistConfig, blogReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    blog: persistedBlogReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
