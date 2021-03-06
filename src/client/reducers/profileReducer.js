const initialState = {
    profileStatus: {
        isLoading: false,
        isFound: true,
    },
    username: "user",
    name: "Name",
    posts: [],
    subscribers: [],
    subscribed: [],
    isSubscribed: false
}
export default (state = initialState, action) => {
    if (action.type === "GET_PROFILE_INFO") {
        return Object.assign({}, state, action.payload);
    } else if (action.type === "GET_PROFILE_START") {
        return Object.assign({}, state, {profileStatus: {isLoading: true, isFound: true}});
    } else if (action.type === "GET_PROFILE_FAILED") {
        return Object.assign({}, state, {profileStatus: {isFound: false, isLoading: false}});
    } else if (action.type === "SUBSCRIBE") {
        return Object.assign({}, state, {subscribed: action.subscribed});
    }
    return state;
}