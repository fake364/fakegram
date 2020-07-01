module.exports = {
    authReducer: {
        isLogined: false,
        isLoading: false,
        isFailed: true
    },
    userReducer: {
        username: 'user',
        userid: '',
        name: 'name'
    },
    profileReducer: {
        profileStatus: {
            isLoading: false,
            isFound: true
        },
        username: 'user',
        name: 'Name',
        posts: [],
        subscribers: [],
        subscribed: [],
        isSubscribed: false
    },
    postCreateReducer: {
        postStatus: {
            isLoading: false,
            isDone: false
        },
        file: '',
        description: ''
    },
    detailedReducer: {},
    feedReducer: {
        posts: [],
        feedStatus: {
            isLoading: false,
            isFound: true
        }
    }
};