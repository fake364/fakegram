import React, {Component} from 'react';
import Ava from "../../public/img/avatar.jpg"
import {connect} from "react-redux";
import UserPosts from "./UserPosts";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.user);
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


        return (
            <main>
                <div className="MainFlex">
                    <div className="User">
                        <div className="UserHead">
                            <div className="UserAva">
                                <img src={Ava}/>
                            </div>
                            <div className="Info">
                                <div className="UserSubscribe">
                                <h2>{this.props.user.username}</h2>
                                    <div>
                                    <Button variant="contained" color="primary">Подписаться</Button>
                                    </div>
                                </div>
                                <div className="Counts">
                                    <div><b>N</b> публикаций</div>
                                    <div><b>N</b> подписчиков</div>
                                    <div><b>N</b> подписок</div>
                                </div>
                                <div><b>{this.props.user.name}</b></div>
                                <div>Description</div>
                            </div>
                        </div>
                        {this.props.user.posts.length!==0?
                            <div className="PostContainer">
                                <UserPosts posts={this.props.user.posts}/>
                            </div>:<h1 style={{textAlign:"center",paddingTop:"28px",borderTop:"1px solid #efefef"}}>Нет публикаций</h1>
                        }
                    </div>
                </div>
            </main>

        );
    }
}

export default connect(state => ({
    user: state.profileReducer
}), dispatch => ({
    getUser: (username) => {
        const asyncGetUser = () => dispatch => {
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
    }
}))(User);
