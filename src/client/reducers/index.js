import authReducer from "./authReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import postCreateReducer from "./postCreateReducer";
import detailedReducer from "./detailedReducer";
import feedReducer from "./feedReducer";
import {combineReducers} from "redux";


const reducers = {
    authReducer,
    userReducer,
    profileReducer,
    postCreateReducer,
    detailedReducer,
    feedReducer
}
export default combineReducers(reducers);