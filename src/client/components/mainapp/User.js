import React, {Component} from 'react';
import Ava from "../../public/img/avatar.jpg"
import {connect} from "react-redux";
import UserPosts from "./UserPosts";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import DetailedPost from "./DetailedPost";

class User extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.user);
    }

    showDetail = () => {
        if (this.props.activePost || this.props.activePost === 0) {
            return <DetailedPost author={this.props.user.username} post={this.props.user.posts[this.props.activePost]}/>
        } else return null;
    }

    render() {

        if (this.props.user.profileStatus.isLoading) {
            const MyProgress = () => {
                return <main>
                    <div className="MainFlex">
                        <CircularProgress/>
                    </div>
                </main>
            }
            return <MyProgress/>
        }
        if (!this.props.user.profileStatus.isFound) {
            const Error = () => {
                return <main>
                    <div className="MainFlex">
                        <h1>Пользователь не найден</h1>
                    </div>
                </main>
            }
            return <Error/>
        }

        let isSubscribed=this.props.user.subscribers.filter(x=>x.username===this.props.currentUser).length>0;
        console.log(isSubscribed);
        return (
            <main>
                {this.showDetail()}
                <div className="MainFlex">
                    <div className="User">
                        <div className="UserHead">
                            <div className="UserAva">
                                <img src={Ava}/>
                            </div>
                            <div className="Info">
                                <div className="UserSubscribe">
                                    <h2>{this.props.user.username}</h2>
                                    {this.props.user.username !== this.props.currentUser && this.props.isLogined ?
                                        <Button onClick={() => {
                                            this.props.subscribeTo(this.props.currentUser, this.props.user.username,isSubscribed ? "unsubscribe" : "subscribe");
                                        }} variant={isSubscribed ? "outlined" : "contained"}
                                                color="primary">{isSubscribed ? "Отписаться" : "Подписаться"}</Button> : null}
                                </div>
                                <div className="Counts">
                                    <div><b>{this.props.user.posts.length}</b> публикаций</div>
                                    <div><b>{this.props.user.subscribers.length}</b> подписчиков</div>
                                    <div><b>{this.props.user.subscribed.length}</b> подписок</div>
                                </div>
                                <div><b>{this.props.user.name}</b></div>
                                <div>Description</div>
                            </div>
                        </div>
                        {this.props.user.posts.length !== 0 ?
                            <div className="PostContainer">
                                <UserPosts posts={this.props.user.posts}/>
                            </div> :
                            <h1 style={{textAlign: "center", paddingTop: "28px", borderTop: "1px solid #efefef"}}>Нет
                                публикаций</h1>
                        }
                    </div>
                </div>
            </main>

        );
    }
}

export default connect(state => ({
    user: state.profileReducer,
    activePost: state.detailedReducer.activePost,
    currentUser: state.userReducer.username,
    currentUserId:state.userReducer.userid,
    isLogined: state.authReducer.isLogined,
}), dispatch => ({
    getUser: (username,logined) => {
        const asyncGetUser = () => (dispatch, getState) => {
            dispatch({type: "GET_PROFILE_START"});
            axios.get("/api/" + username).then(res => {
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
        }
        dispatch(asyncGetUser())
    },
    subscribeTo: (from, to,type) => {
        const asyncSubscribe = () => dispatch => {
            axios.patch("/api/user/subscribe", {from, to,type}).then((res, err) => {

                if (res.status === 200) {
                    dispatch({
                        type: "GET_PROFILE_INFO",
                        payload: {...res.data,isSubscribed:type==="subscribe"?true:false},

                    });
                }
            });
        }
        dispatch(asyncSubscribe());
    }
}))(User);
