export default (state = {isLogined: false, isLoading: false, isFailed: false, ERR_MSG: ""}, action) => {
    if (action.type === "LOGIN_SUCCEED") {
        return {isLogined: true, isLoading: false};
    } else if (action.type === "LOGIN_FAILED") {
        console.log(action);
        if (action.payload) {
            return Object.assign({}, state, {
                isLogined: false,
                isLoading: false,
                isFailed: true,
                ERR_MSG: action.payload.ERR_MSG
            });
        } else return Object.assign({}, state, {isLogined: false, isLoading: false, isFailed: true});
    } else if (action.type === "LOGIN_INIT") {
        return {isLogined: false, isLoading: true}
    } else if (action.type === "LOGOUT") {
        return Object.assign({}, state, {isLogined: false});
    } else return state;
}
