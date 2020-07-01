import {beforeAll, describe, expect, it} from "@jest/globals";
import axios from "axios";
import userData from "../../../__test__/utils/userdata";
import serverUrl from "../../../serverUrl";

describe("Check auth controller behavior", () => {
    beforeAll(() => {
        return axios.delete(serverUrl + "/api/user/" + userData.login).then((res) => {
            if (res.status === 200) {
                console.log("Successfuly deleted user");
            }
        }).catch(err => {
            new Error("Couldn't delete user");
        })
    });
    it("i check success auth", () => {
        axios.post("/api/user", userData).then((res, err) => {
            expect(res.status).toEqual(200);
            axios.post("/api/authenticate", {
                userlogin: userData.login,
                passlogin: userData.password
            }).then((res2, err) => {
                expect(res2.status).toEqual(200);
                expect(res2.data).toMatchObject({username: userData.login, name: userData.name});
            });

        });
    })
    it("i check wrong auth", () => {
        axios.post("/api/authenticate", {
            userlogin: userData.login,
            passlogin: "garbagepass"
        }).then((res2, err) => {
            expect(res2.status).toEqual(401);
            expect(res2.data).toMatchObject({err: "Неправильное имя пользователя или пароль"});
        });
    })
});