import {beforeAll, describe, expect, it} from "@jest/globals";
import React from "react";
import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";
import axios from 'axios';
import serverUrl from "../serverUrl";
import authAction from "../src/client/actions/authActions";
import userData from "./utils/userdata";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("Async actions", () => {

    beforeAll(() => {
        return axios.delete(serverUrl + "/api/user/" + userData.login).then((res) => {
            if (res.status === 200) {
                console.log("Successfuly deleted user");
            }
        }).catch(err => {
            new Error("Couldn't delete user");
        })
    });
    it('should user created successfuly and authed', () => {
        const store = mockStore();
        const expectedActions = [{type: "LOGIN_INIT"},
            {type: "LOGIN_SUCCEED"},
            {
                type: "USER_INFO_GOTTEN", payload: {username: userData.login, name: userData.name}
            }
        ];
        return axios.post(serverUrl + "/api/user", userData).then((res1) => {
            if (res1.status === 200) {
                return store.dispatch(authAction(userData.login, userData.password)).then(() => {
                    expect(store.getActions()).toMatchObject(expectedActions);
                });
            }
        }, (err1) => {
            throw new Error("Couldn't create user")
        });
    }, 30000);

    it('should user been already created and not authed with wrong password', () => {
        const store = mockStore();
        const expectedActions = [{type: "LOGIN_INIT"},
            {
                type: "LOGIN_FAILED", payload: {
                    ERR_MSG: "Неверный логин или пароль"
                }
            }
        ];
        return store.dispatch(authAction(userData.login, "blablabla")).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    }, 30000);
});