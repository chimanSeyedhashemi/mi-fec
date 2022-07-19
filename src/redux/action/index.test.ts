import { setVideosAction } from ".";
import { ProcessedVideo } from "../../common/model/video.model";
import { ACTIONS } from "../action.enum";

const videos: Array<ProcessedVideo> = [{
        id: 1,
        name: "Matrix",
        author: "Ilan Mask",
        categories: ["Thriller"],
        formats: { "one": { res: "1000p", size: 1000 } }
}]

 test("Test SET_VIDEOS type action", () => {  
          expect(setVideosAction(videos)).toEqual({type:ACTIONS.SET_VIDEOS,payload:videos});
})

