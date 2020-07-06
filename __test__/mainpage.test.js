import {describe, expect, it} from "@jest/globals";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import initState from "./__mocks__/initstateforlogin.state"
import {Router} from "react-router-dom";
import App from "../src/client/components/App";
import {createMemoryHistory} from "history";

describe("Check successfull attempt of register", () => {
    let elementTree;
    const mockStore = configureStore([thunk]);
    let store = mockStore(initState);


    it("i'm on the main page", () => {
        const history = createMemoryHistory();
        history.push('/');
        elementTree = renderer.create(<Provider
            store={store}><Router history={history}><App/></Router></Provider>);
        expect(elementTree.toJSON()).toMatchSnapshot();
    });
});