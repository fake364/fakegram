import {describe, expect, it} from "@jest/globals";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Router} from "react-router-dom";
import App from "../src/client/components/App";
import {createMemoryHistory} from "history";
import initState from "./__mocks__/user";

describe("Main page", () => {

    it("should render correctly if im not authed", () => {
        let elementTree;
        const mockStore = configureStore([thunk]);
        let store = mockStore(initState.userNotFoundAndNotAuthed);
        const history = createMemoryHistory();
        history.push('/');
        elementTree = renderer.create(<Provider
            store={store}><Router history={history}><App/></Router></Provider>);
        expect(elementTree.toJSON()).toMatchSnapshot();
    });

    it("should render correctly if im authed", () => {
        let elementTree;
        const mockStore = configureStore([thunk]);
        let store = mockStore(initState.userNotFoundAndAuthed);
        const history = createMemoryHistory();
        history.push('/');
        elementTree = renderer.create(<Provider
            store={store}><Router history={history}><App/></Router></Provider>);
        expect(elementTree.toJSON()).toMatchSnapshot();
    });
});