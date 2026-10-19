import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/auth.slice";
import noteReducer from "./Note/note.slice"
const rootReducer = combineReducers({authReducer, noteReducer});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
