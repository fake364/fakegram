import authReducer from "./authReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import postCreateReducer from "./postCreateReducer";
import {combineReducers} from "redux";

const reducers={
    authReducer,
    userReducer,
    profileReducer,
    postCreateReducer
}
export default combineReducers(reducers);