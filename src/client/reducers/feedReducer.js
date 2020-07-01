const initialState = {
    posts: [],
    feedStatus: {
        isLoading: false,
        isFound: true,
    }
};
export default (state = initialState, action) => {
    if (action.type === "GET_FEED_START") {
        return Object.assign({}, state, {feedStatus: {isLoading: true, isFound: true}});
    } else if (action.type === "GET_FEED_FAILED") {
        return Object.assign({}, state, {feedStatus: {isFound: false, isLoading: false}});
    } else if (action.type === "GET_FEED_SUCCEED") {
        return Object.assign({}, state, action.payload);
    }
    return state;
}