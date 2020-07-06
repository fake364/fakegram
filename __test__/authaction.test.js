import {describe, expect, it} from "@jest/globals";
import React from "react";
import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";
import axios from 'axios';
import authAction from "../src/client/actions/authActions";
import userData from "./utils/userdata";
import serverUrl from "../serverUrl";
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("Async actions", () => {

    it('should user created successfuly and authed', () => {
        var axiosMock = new MockAdapter(axios);
        const store = mockStore();
        const expectedActions = [{type: "LOGIN_INIT"},
            {type: "LOGIN_SUCCEED"},
            {
                type: "USER_INFO_GOTTEN", payload: {username: userData.login, name: userData.name}
            }
        ];
        axiosMock.onPost(serverUrl + "/api/authenticate", {
            userlogin: userData.login,
            passlogin: userData.password
        }).reply(200, {username: userData.login, userid: userData.userid, name: userData.name});
        return store.dispatch(authAction(userData.login, userData.password)).then(() => {
            expect(store.getActions()).toMatchObject(expectedActions);
        });

    }, 30000);

    it('should user been already created and not authed with wrong password', () => {
        const store = mockStore();
        var axiosMock = new MockAdapter(axios);
        const expectedActions = [{type: "LOGIN_INIT"},
            {
                type: "LOGIN_FAILED", payload: {
                    ERR_MSG: "Неверный логин или пароль"
                }
            }
        ];
        axiosMock.onPost(serverUrl + "/api/authenticate", {
            userlogin: userData.login,
            passlogin: userData.password
        }).reply(() =>
            Promise.reject(new Error("Неверный логин или пароль")),
        );
        return store.dispatch(authAction(userData.login, "blablabla")).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    }, 30000);
});