import React, {Component} from 'react';
import Post from "./Post";
import {connect} from "react-redux";
import asyncGetFeed from "../../actions/feedActions";
import {CircularProgress} from "@material-ui/core";

class Posts extends Component {

    constructor(props, context) {
        super(props, context);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.username !== this.props.username) {
            this.props.getPosts(this.props.username);
        }
    }

    componentDidMount() {
        this.props.getPosts(this.props.username);
    }

    render() {
        if (this.props.feedStatus.isLoading) {
            return <div style={{width: "100%", display: "flex", justifyContent: "center"}} className="PostsFeed">
                <CircularProgress/>
            </div>
        }
        return (
            <div className="PostsFeed">
                {this.props.posts.length === 0 ? <p>Лента постов пуста! Подпишитесь на других пользователей или создайте
                    пост</p> : this.props.posts.map((post, index) => <Post key={index} post={post}/>)}
            </div>

        );
    }
}

export default connect(state => ({
    username: state.userReducer.username,
    user: state.profileReducer,
    posts: state.feedReducer.posts,
    feedStatus: state.feedReducer.feedStatus
}), dispatch => ({
    getPosts: (username) => {
        dispatch(asyncGetFeed(username));
    }
}))(Posts);