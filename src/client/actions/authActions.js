import axios from "axios";
import serverUrl from "../../../serverUrl";

const authAction = (userlogin, passlogin) => dispatch => {
    dispatch({type: "LOGIN_INIT"});
    return axios.post(serverUrl + "/api/authenticate", {userlogin: userlogin, passlogin: passlogin}).then((res) => {
        if (res.status === 200) {
            dispatch({type: "LOGIN_SUCCEED"});
            dispatch({
                type: "USER_INFO_GOTTEN",
                payload: {username: res.data.username, userid: res.data.userid, name: res.data.name}
            });
        }
    }, (err) => {
        dispatch({type: "LOGIN_FAILED", payload: {ERR_MSG: "Неверный логин или пароль"}});
    });
};
export default authAction;