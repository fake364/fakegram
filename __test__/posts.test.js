import {describe, expect, it} from "@jest/globals";
import renderer from 'react-test-renderer';
import React from "react";
import mockpostdata from "./__mocks__/mockpostdata.state.js";
import {BrowserRouter} from "react-router-dom";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import Posts from "../src/client/components/mainapp/Posts";
import thunk from 'redux-thunk';

let store;

const mockStore = configureStore([thunk]);

describe("Posts component", () => {
    it("should render correctly when there are posts", () => {
        store = mockStore({
            userReducer: {username: "test"},
            feedReducer: {feedStatus: {isLoading: false}, posts: mockpostdata.posts[0]}
        });
        const elements = renderer.create(<Provider
            store={store}><BrowserRouter><Posts/></BrowserRouter></Provider>).toJSON();
        expect(elements).toMatchSnapshot();
    });
    it("should render correctly when there are no posts", () => {
        store = mockStore({
            userReducer: {username: "test"},
            feedReducer: {feedStatus: {isLoading: false}, posts: []}
        });
        const elements = renderer.create(<Provider
            store={store}><BrowserRouter><Posts/></BrowserRouter></Provider>).toJSON();
        expect(elements).toMatchSnapshot();
    });
});


