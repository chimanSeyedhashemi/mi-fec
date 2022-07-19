import {  ProcessedVideo } from "../common/model/video.model";
import { ACTIONS } from "./action.enum";
import { SetVideoSAction } from "./action/video.action";

export function reducer(
  state: Array<ProcessedVideo> = [],
  action: SetVideoSAction
) {
  switch (action.type) {
    case ACTIONS.SET_VIDEOS:
          return action.payload;
    default:
      return state ? state : [];
  }
}
