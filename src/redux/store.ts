import {
  combineReducers,
  createStore,
  ReducersMapObject,
  AnyAction,
} from "redux";
import { Reducer } from "redux";
import { reducer as VideoReducer } from "./video.reducer";
import { ProcessedVideo } from "../common/model/video.model";
import { IReduxState } from "./app-store";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const reducers: ReducersMapObject<IReduxState, AnyAction> = {
  videos: VideoReducer as Reducer<Array<ProcessedVideo>|null>,
};


const persistConfig = {
  key: "root",
  storage,
};

export const mainReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const Store= createStore(persistedReducer);

export const persistor = persistStore(Store);