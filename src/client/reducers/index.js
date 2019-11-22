import authReducer from "./authReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import postCreateReducer from "./postCreateReducer";
import detailedReducer from "./detailedReducer";
import {combineReducers} from "redux";

const reducers={
    authReducer,
    userReducer,
    profileReducer,
    postCreateReducer,
    detailedReducer
}
export default combineReducers(reducers);