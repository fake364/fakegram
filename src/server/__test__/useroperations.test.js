import {describe, expect, it} from "@jest/globals";
import axios from "axios";
import serverUrl from "../../../serverUrl";
import userData from "../../../__test__/utils/userdata";

describe("Check user info retrieve", () => {
    it("I check of user deletion", () => {
        return axios.delete(serverUrl + "/api/user/" + userData.login).then((res) => {
            expect(res.status).toEqual(200);
        }).catch(err => {
            new Error("Couldn't delete user");
        })
    });

    it("I check that user is created successfuly", () => {
        axios.post("/api/user", userData).then((res, err) => {
            expect(res.status).toEqual(200);
        });
    });
    it("i check error creating user again", () => {
        axios.post("/api/user", userData).then((res2, err) => {
            expect(res2.status).toEqual(401);
            expect(res2.data).toMatchObject({err: "Такой логин или телефон уже зарегистрированы"});
        });
    })
});