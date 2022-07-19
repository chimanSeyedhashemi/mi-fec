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


const reducers: ReducersMapObject<IReduxState, AnyAction> = {
  videos: VideoReducer as Reducer<Array<ProcessedVideo>>,
};

export const mainReducer = combineReducers(reducers);

export const Store = createStore(mainReducer);

