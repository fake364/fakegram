import {expect, it} from "@jest/globals";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import Post from "../src/client/components/mainapp/Post";
import mockpostdata from "./utils/mockpostdata";
import React from "react";

it("should Post render correctly", () => {
    const element = renderer.create(<BrowserRouter><Post post={mockpostdata[0]}/></BrowserRouter>).toJSON();
    expect(element).toMatchSnapshot();
});