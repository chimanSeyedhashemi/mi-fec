import { Action } from "redux";
import { ProcessedVideo } from "../../common/model/video.model";
import { ACTIONS } from "../action.enum";

export interface SetVideoSAction extends Action<ACTIONS> {
  payload: Array<ProcessedVideo>;
}