import {describe, it} from "@jest/globals";
import React from "react";
import userData from "./utils/userdata";
import userState from "./__mocks__/user.js"


describe("Check User component", () => {

    it("should return null details when post not active and user is not authed", () => {
        userState.checkOrCreateTheSnapshotOfState(userState.userFoundAndImNotAuthed, userData.login);
    });
    it("should return not null details,means that some post is active and user is not authed", () => {
        userState.checkOrCreateTheSnapshotOfState(userState.userIsFoundAndFirstPostDetailed, userData.login)
    });
    it("should return text that user is not found", () => {
        userState.checkOrCreateTheSnapshotOfState(userState.userNotFoundAndNotAuthed, userData.login + "asdfasf");
    });
    it("should render User component correctly when user is found and none post is active and user authed", () => {
        userState.checkOrCreateTheSnapshotOfState(userState.userAuthedAndNonePostIsActive, userData.login);
    });
    it("should render User component correctly when user is not found and another user authed", () => {
        userState.checkOrCreateTheSnapshotOfState(userState.userNotFoundAndAuthed, userData.login + "wrong");
    });
    it("should render User component correctly when user is found and another user authed and post is active", () => {
        userState.checkOrCreateTheSnapshotOfState(userState.userAuthedAndPostIsActive, userData.login);
    });
    it("should render User component correctly when component isLoading and not authed", () => {
        userState.checkOrCreateTheSnapshotOfState(userState.userIsFoundAndInfoIsLoadingNotAuthed, userData.login);
    });
    it("should render User component correctly when component isLoading and authed", () => {
        userState.checkOrCreateTheSnapshotOfState(userState.userIsFoundAndInfoIsLoadingAuthed, userData.login);
    });

});
