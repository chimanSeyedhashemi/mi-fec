
import { ProcessedVideo } from "../../common/model/video.model";
import { ACTIONS } from "../action.enum";
import {SetVideoSAction } from "./video.action";


export function setVideosAction(
   video: Array<ProcessedVideo>
): SetVideoSAction {
  return {
    type: ACTIONS.SET_VIDEOS,
    payload: video,
  };
}

