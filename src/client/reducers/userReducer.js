export default (state = {username: "user", userid: "", name: "name"}, action) => {
    if (action.type === "USER_INFO_GOTTEN") {
        return Object.assign({}, state, action.payload);
    }
    return state;
}