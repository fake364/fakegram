import {expect, it} from "@jest/globals";
import renderer from 'react-test-renderer';
import React from "react";
import mockpostdata from "./utils/mockpostdata";
import {BrowserRouter} from "react-router-dom";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import Posts from "../src/client/components/mainapp/Posts";
import thunk from 'redux-thunk';

let store;

const mockStore = configureStore([thunk]);

it("should Posts render correctly", () => {
    store = mockStore({
        userReducer: {username: "test"},
        feedReducer: {feedStatus: {isLoading: false}, posts: Array(5).fill(mockpostdata[0])}
    });
    const elements = renderer.create(<Provider
        store={store}><BrowserRouter><Posts/></BrowserRouter></Provider>).toJSON();
    expect(elements).toMatchSnapshot();
});

