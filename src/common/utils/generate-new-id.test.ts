
import { generateNewId } from "./generate-new-Id";

describe("Generate new id tests", () => {
    test("Generate first id", () => {  
          expect(generateNewId([])).toEqual(1);
    })

    test("Generate id 4", () => {      
          expect(generateNewId([1,2,3])).toEqual(4);
    })

    test("Generate id 3201", () => {      
          expect(generateNewId([1234,2,3200,789])).toEqual(3201);
    })
})