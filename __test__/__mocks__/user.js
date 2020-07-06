import React from "react";

const baseStateAllFalse = {
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
            isFound: false,
            isLoading: false
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
            isFound: false
        }
    }
};

const constructState = (isAuthed, isFound, isPostActive, isLoading) => {
    let state = Object.assign({}, baseStateAllFalse);
    if (isAuthed) {
        state = Object.assign(state, {
            authReducer: {
                isLogined: true,
                isLoading: false
            },
            userReducer: {
                username: 'fake',
                userid: '5efb9d4eea80eb17a80d36b5',
                name: 'Valentin Serebreanu'
            }
        });
    }
    if (isFound) {
        state = Object.assign(state, {
            profileReducer: {
                profileStatus: {
                    isLoading: false,
                    isFound: true
                },
                username: 'fake',
                name: 'Valentin Serebreanu',
                posts: [
                    {
                        comments: [
                            {
                                author: 'fake',
                                comment: '1231'
                            },
                            {
                                author: 'fake',
                                comment: '1231'
                            },
                            {
                                author: 'fake',
                                comment: 'hgj'
                            },
                            {
                                author: 'fake',
                                comment: 'hgj'
                            },
                            {
                                author: 'fake',
                                comment: 'hgj'
                            },
                            {
                                author: 'fake',
                                comment: 'hgj'
                            },
                            {
                                author: 'fake',
                                comment: 'hgj'
                            },
                            {
                                author: 'fake',
                                comment: 'y'
                            },
                            {
                                author: 'fake',
                                comment: 'y'
                            },
                            {
                                author: 'fake',
                                comment: 'y'
                            }
                        ],
                        _id: '5efbc60f93f8a60aecdf2c1a',
                        description: '',
                        image: 'https://cdn.pixabay.com/photo/2020/04/23/03/35/the-leaves-5080909_960_720.jpg',
                        author: '5efb9d4eea80eb17a80d36b5',
                        date: '2020-06-30T23:09:03.372Z',
                        __v: 10
                    },
                    {
                        comments: [
                            {
                                author: 'faketest',
                                comment: 'test'
                            }
                        ],
                        _id: '5efbd09d9773924424cb7d54',
                        description: '',
                        image: 'https://cdn.pixabay.com/photo/2020/04/23/03/35/the-leaves-5080909_960_720.jpg',
                        author: '5efb9d4eea80eb17a80d36b5',
                        date: '2020-06-30T23:54:05.174Z',
                        __v: 1
                    },
                    {
                        comments: [],
                        _id: '5efbd40726447f18848bda18',
                        description: '',
                        image: 'https://cdn.pixabay.com/photo/2020/04/23/03/35/the-leaves-5080909_960_720.jpg',
                        author: '5efb9d4eea80eb17a80d36b5',
                        date: '2020-07-01T00:08:39.574Z',
                        __v: 0
                    }
                ],
                subscribers: [
                    {
                        _id: '5efbd45326447f18848bda19',
                        username: 'faketest'
                    }
                ],
                subscribed: [],
                isSubscribed: false
            }
        })
    }
    if (isPostActive) {
        state = Object.assign(state, {
            detailedReducer: {
                activePost: 0
            }
        });
    }
    if (isLoading) {
        state = Object.assign(state, {
            profileStatus: {
                isFound: true,
                isLoading: true
            }
        });
    }
    return state;
};

export default {
    userFoundAndImNotAuthed: constructState(false, true, false, false),
    userNotFoundAndNotAuthed: baseStateAllFalse,
    userIsFoundAndFirstPostDetailed: constructState(false, true, true, false),
    userAuthedAndNonePostIsActive: constructState(true, true, false, false),
    userNotFoundAndAuthed: constructState(true, false, false, false),
    userAuthedAndPostIsActive: constructState(true, true, true, false),
    userIsFoundAndInfoIsLoadingNotAuthed: constructState(false, false, false, true),
    userIsFoundAndInfoIsLoadingAuthed: constructState(true, false, false, true)
};