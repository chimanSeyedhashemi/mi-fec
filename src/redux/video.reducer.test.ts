import { ProcessedVideo } from "../common/model/video.model";
import { ACTIONS } from "./action.enum";
import { reducer } from "./video.reducer";

const videos: Array<ProcessedVideo> = [
    {
        id: 1,
        name: "Matrix",
        author: "Ilan Mask",
        categories: ["Thriller"],
        formats: { "one": { res: "1000p", size: 1000 } }
}]

describe("Reducer tests", () => {
    test("Test SET_VIDEOS type action", () => {  
          expect(reducer([], {type:ACTIONS.SET_VIDEOS, payload:videos})).toEqual(videos);
    })

    test("Test wrong type action", () => {      
          expect(reducer([], {type:"otherType" as any, payload:videos})).toEqual([]);
    })
})