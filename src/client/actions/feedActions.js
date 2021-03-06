import axios from "axios";
import serverUrl from "../../../serverUrl";

const asyncGetFeed = (username, config) => dispatch => {
    dispatch({type: "GET_FEED_START"});
    return axios.get(serverUrl + "/api/feed", {
        params: {
            username: username,
        },
        ...config
    }).then(res => {
        if (res.status === 200) {
            let posts = [];
            for (let i = 0; i < res.data.subscribed.length; i++) {
                posts = [...posts, ...res.data.subscribed[i].posts];
            }
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            dispatch({
                type: "GET_FEED_SUCCEED", payload: {
                    posts,
                    feedStatus: {
                        isLoading: false,
                        isFound: true,
                    }
                }
            });

        }
    }).catch(err => {
        dispatch({type: "GET_FEED_FAILED"});
    });
};
export default asyncGetFeed;