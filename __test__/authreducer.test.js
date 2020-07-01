import {describe, expect, it} from "@jest/globals";
import bigReducer from "../src/client/reducers/index"

describe("Check for auth reducer return states", () => {
    it("should return init state", () => {
        expect(bigReducer(undefined, {}).authReducer).toEqual({
            isLogined: false,
            isLoading: false,
            isFailed: false,
            ERR_MSG: ""
        });
    });
    it("should handle LOGIN_FAILED", () => {
        expect(bigReducer(undefined, {type: "LOGIN_FAILED", payload: {ERR_MSG: "TEST MSG"}}).authReducer).toEqual({
            isLogined: false,
            isLoading: false,
            isFailed: true,
            ERR_MSG: "TEST MSG"
        })
    });
    it("should handle LOGIN_FAILED without message", () => {
        expect(bigReducer(undefined, {type: "LOGIN_FAILED"}).authReducer).toEqual({
            isLogined: false,
            isLoading: false,
            isFailed: true,
            ERR_MSG: ""
        })
    });
    it("should handle LOGIN_INIT", () => {
        expect(bigReducer(undefined, {type: "LOGIN_INIT"}).authReducer).toMatchObject({
            isLogined: false,
            isLoading: true
        });
    });
    //
    it("should handle LOGOUT", () => {
        expect(bigReducer(undefined, {type: "LOGOUT"}).authReducer).toMatchObject({isLogined: false});
    });
    it("should handle LOGIN_SUCCEED", () => {
        expect(bigReducer(undefined, {type: "LOGIN_SUCCEED"}).authReducer).toMatchObject({
            isLogined: true,
            isLoading: false
        });
    });
});