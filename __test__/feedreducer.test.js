import {describe, expect, it} from "@jest/globals";
import bigReducer from "../src/client/reducers/index"

const objToCompare = {
    "_id": "5efbc60f93f8a60aecdf2c1a",
    "comments": [{"author": "fake", "comment": "1231"}, {"author": "fake", "comment": "1231"}, {
        "author": "fake",
        "comment": "hgj"
    }, {"author": "fake", "comment": "hgj"}, {"author": "fake", "comment": "hgj"}, {
        "author": "fake",
        "comment": "hgj"
    }, {"author": "fake", "comment": "hgj"}, {"author": "fake", "comment": "y"}, {
        "author": "fake",
        "comment": "y"
    }, {"author": "fake", "comment": "y"}],
    "description": "",
    "image": "5efbc60f93f8a60aecdf2c1a.png",
    "author": "5efb9d4eea80eb17a80d36b5",
    "date": "2020-06-30T23:09:03.372Z",
    "__v": 10
};

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