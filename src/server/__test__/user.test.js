import {beforeAll, describe, expect, it} from "@jest/globals";
import axios from "axios";
import serverUrl from "../../../serverUrl";
import userData from "../../../__test__/utils/userdata";

describe("Check user info retrieve", () => {
    beforeAll(() => {
        return axios.delete(serverUrl + "/api/user/" + userData.login).then((res) => {
            if (res.status === 200) {
                console.log("Successfuly deleted user");
            }
        }).catch(err => {
            new Error("Couldn't delete user");
        })
    });

    it("I check that i can get info of the created user", () => {
        axios.post("/api/user", userData).then((res, err) => {
            expect(res.status).toEqual(200);
            axios.get("/api/user/" + userData.login).then((res2, err) => {
                expect(res2.status).toEqual(200);
                expect(res2.data).toBeDefined();
            });
        });
    });
    it("I user doesn't exist", () => {
        axios.get("/api/user/" + userData.login + "wrong").then((res2, err) => {
            expect(res2.status).toEqual(404);
            expect(res2.data).toEqual("Такого пользователя нет");
        });
    })
});