import {describe, expect, it} from "@jest/globals";
import React from "react";
import userData from "./utils/userdata";
import userState from "./__mocks__/user.js"
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {createMemoryHistory} from "history";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Route, Router} from "react-router";
import User from "../src/client/components/mainapp/User";


describe("Check User component", () => {
    const checkOrCreateTheSnapshotOfState = (state, path) => {
        let store;
        const mockStore = configureStore([thunk]);
        store = mockStore(state);
        const history = createMemoryHistory();
        history.push('/' + path);
        const element = renderer.create(<Provider store={store}><Router history={history}><Route exact
                                                                                                 path="/:user"
                                                                                                 component={User}/></Router></Provider>).toJSON();
        expect(element).toMatchSnapshot();
    };
    it("should return null details when post not active and user is not authed", () => {
        checkOrCreateTheSnapshotOfState(userState.userFoundAndImNotAuthed, userData.login);
    });
    it("should return not null details,means that some post is active and user is not authed", () => {
        checkOrCreateTheSnapshotOfState(userState.userIsFoundAndFirstPostDetailed, userData.login)
    });
    it("should return text that user is not found", () => {
        checkOrCreateTheSnapshotOfState(userState.userNotFoundAndNotAuthed, userData.login + "asdfasf");
    });
    it("should render User component correctly when user is found and none post is active and user authed", () => {
        checkOrCreateTheSnapshotOfState(userState.userAuthedAndNonePostIsActive, userData.login);
    });
    it("should render User component correctly when user is not found and another user authed", () => {
        checkOrCreateTheSnapshotOfState(userState.userNotFoundAndAuthed, userData.login + "wrong");
    });
    it("should render User component correctly when user is found and another user authed and post is active", () => {
        checkOrCreateTheSnapshotOfState(userState.userAuthedAndPostIsActive, userData.login);
    });
    it("should render User component correctly when component isLoading and not authed", () => {
        checkOrCreateTheSnapshotOfState(userState.userIsFoundAndInfoIsLoadingNotAuthed, userData.login);
    });
    it("should render User component correctly when component isLoading and authed", () => {
        checkOrCreateTheSnapshotOfState(userState.userIsFoundAndInfoIsLoadingAuthed, userData.login);
    });

});
