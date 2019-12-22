import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export function persist(key, whitelist, reducer) {
  return persistReducer(
    {
      key,
      storage,
      whitelist
    },
    reducer
  );
}
