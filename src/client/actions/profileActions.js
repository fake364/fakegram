import axios from "axios";
import serverUrl from "../../../serverUrl";

const asyncGetUser = (username) => dispatch => {
    dispatch({type: "GET_PROFILE_START"});
    axios.get(serverUrl + "/api/" + username).then(res => {
        if (res.status === 200) {

            dispatch({
                type: "GET_PROFILE_INFO", payload: {
                    ...res.data,
                    profileStatus: {
                        isLoading: false,
                        isFound: true,
                    }
                }
            });

        }
    }).catch(err => {
        dispatch({type: "GET_PROFILE_FAILED"});
    });
};
const asyncSubscribe = (from, to, type) => dispatch => {
    axios.patch(serverUrl + "/api/user/subscribe", {from, to, type}).then((res, err) => {

        if (res.status === 200) {
            dispatch({
                type: "GET_PROFILE_INFO",
                payload: {...res.data, isSubscribed: type === "subscribe"},

            });
        }
    });
}
export {asyncGetUser, asyncSubscribe};