import {describe, expect, it} from "@jest/globals";
import bigReducer from "../src/client/reducers/index"
import objToCompare from "./__mocks__/feed_succeed_reducer.state"

describe("Check for feed reducer return states", () => {
    it("should return init state", () => {
        expect(bigReducer(undefined, {}).feedReducer).toEqual({
            posts: [],
            feedStatus: {
                isLoading: false,
                isFound: true,
            }
        });
    });
    it("should handle GET_FEED_START", () => {
        expect(bigReducer(undefined, {type: "GET_FEED_START"}).feedReducer).toMatchObject({
            feedStatus: {
                isLoading: true,
                isFound: true
            }
        })
    });
    it("should handle GET_FEED_FAILED", () => {
        expect(bigReducer(undefined, {type: "GET_FEED_FAILED"}).feedReducer).toMatchObject({
            feedStatus: {
                isFound: false,
                isLoading: false
            }
        })
    });
    it("should handle GET_FEED_SUCCEED", () => {
        expect(bigReducer(undefined, {
            type: "GET_FEED_SUCCEED",
            payload: {posts: [objToCompare, objToCompare]}
        }).feedReducer).toMatchObject({
            posts: [objToCompare, objToCompare]
        });
    });
});