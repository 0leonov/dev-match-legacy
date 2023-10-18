import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from "react-redux";
import { getPersistConfig } from "redux-deep-persist";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

import sessionReducer from "@/store/slices/session-slice";

export function createPersistStorage(): WebStorage {
  if (typeof window === "undefined") {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage("local");
}

const storage = createPersistStorage();

const rootReducer = combineReducers({ session: sessionReducer });

const persistConfig = getPersistConfig({
  key: "root",
  storage,
  blacklist: ["session.user"],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
