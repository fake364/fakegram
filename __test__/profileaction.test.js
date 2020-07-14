import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {describe, expect, it} from "@jest/globals";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import serverUrl from "../serverUrl";
import {asyncGetUser, asyncSubscribe} from "../src/client/actions/profileActions";
import mockpostdata from "./__mocks__/mockpostdata.state.js";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("Profile action", () => {

    it('should i get user data', () => {
        var axiosMock = new MockAdapter(axios);
        const store = mockStore();
        const expectedActions = [{type: "GET_PROFILE_START"},
            {
                type: "GET_PROFILE_INFO", payload: {
                    ...mockpostdata,
                    profileStatus: {
                        isLoading: false,
                        isFound: true,
                    }
                }
            }
        ];
        axiosMock.onGet(serverUrl + "/api/" + mockpostdata.username).reply(200, mockpostdata);
        return store.dispatch(asyncGetUser(mockpostdata.username)).then(() => {
            expect(store.getActions()).toMatchObject(expectedActions);
        });

    }, 30000);
    it('should i get fail due receiving the user data', () => {
        var axiosMock = new MockAdapter(axios);
        const store = mockStore();
        const expectedActions = [{type: "GET_PROFILE_START"},{type: "GET_PROFILE_FAILED"}
        ];
        axiosMock.onGet(serverUrl + "/api/" + mockpostdata.username).reply(() =>
            Promise.reject(new Error()),
        );
        return store.dispatch(asyncGetUser(mockpostdata.username)).then(() => {
            expect(store.getActions()).toMatchObject(expectedActions);
        });

    }, 30000);
    it('should i subscribe', () => {
        var axiosMock = new MockAdapter(axios);
        const store = mockStore();
        const expectedData = {
            "subscribers": [{
                "posts": ["5efbbfc925e1d43448fb9bc0", "5efbc60f93f8a60aecdf2c1a", "5efbd09d9773924424cb7d54", "5efbd40726447f18848bda18", "5f0335da39d38a49c064755b"],
                "subscribers": [{
                    "posts": [],
                    "subscribers": [],
                    "subscribed": ["5efb9d4eea80eb17a80d36b5"],
                    "_id": "5efbd45326447f18848bda19",
                    "phone": "078338382342",
                    "name": "Kek",
                    "username": "faketest",
                    "__v": 1
                }],
                "subscribed": [{
                    "posts": [],
                    "subscribers": [],
                    "subscribed": [],
                    "_id": "5f0761c92d42780a6c2a5e4d",
                    "phone": "123456789",
                    "name": "Valentine",
                    "username": "fake123",
                    "__v": 2
                }],
                "_id": "5efb9d4eea80eb17a80d36b5",
                "phone": "078787898778",
                "name": "Valentin Serebreanu",
                "username": "fake",
                "__v": 8
            }]
        };
        const expectedActions = [{
            type: "GET_PROFILE_INFO", payload: {
                ...expectedData
                , isSubscribed: true
            }
        }];
        axiosMock.onPatch(serverUrl + "/api/user/subscribe").reply(200, expectedData);

        return store.dispatch(asyncSubscribe(mockpostdata.username, "fake123", "subscribe")).then(() => {
            expect(store.getActions()).toMatchObject(expectedActions);
        });
    });
});