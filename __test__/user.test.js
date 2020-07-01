import {beforeAll, describe, expect, it} from "@jest/globals";
import renderer from "react-test-renderer";
import {Route, Router} from "react-router-dom";
import React from "react";
import User from "../src/client/components/mainapp/User";
import axios from "axios";
import serverUrl from "../serverUrl";
import userData from "./utils/userdata";
import {createMemoryHistory} from 'history'
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockpostdata from "./utils/mockpostdata";

describe("Check User component", () => {
    beforeAll(() => {
        return axios.delete(serverUrl + "/api/user/" + userData.login).then((res) => {
            if (res.status === 200) {
                console.log("Successfuly deleted user");
            }
        }).catch(err => {
            new Error("Couldn't delete user");
        })
    });
    it("should render User component correctly", () => {
        let store;

        const mockStore = configureStore([thunk]);
        store = mockStore({
            authReducer: {
                isLogined: true,
                isLoading: false
            },
            userReducer: {
                username: 'fake',
                userid: '5efb9d4eea80eb17a80d36b5',
                name: 'Valentin Serebreanu'
            },
            profileReducer: {
                profileStatus: {
                    isLoading: false,
                    isFound: true
                },
                username: 'testing',
                name: 'Testing User',
                posts: Array(5).fill(mockpostdata[0]),
                subscribers: [],
                subscribed: [],
                isSubscribed: false
            },
            postCreateReducer: {
                postStatus: {
                    isLoading: false,
                    isDone: false
                },
                file: '',
                description: ''
            },
            detailedReducer: {},
            feedReducer: {
                posts: [],
                feedStatus: {
                    isLoading: false,
                    isFound: true
                }
            }
        });
        return axios.post(serverUrl + "/api/user", userData).then((res) => {
            if (res.status === 200) {
                const history = createMemoryHistory();
                history.push('/' + userData.login);
                const element = renderer.create(<Provider store={store}><Router history={history}><Route exact
                                                                                                         path="/:user"
                                                                                                         component={User}/></Router></Provider>).toJSON();
                expect(element).toMatchSnapshot();
            }
        });

    });
});
