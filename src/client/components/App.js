import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import {CircularProgress} from "@material-ui/core";

const Header = React.lazy(() => import("./mainapp/Header"));
const LoginComponent = React.lazy(() => import("./auth/Login"));
const Main = React.lazy(() => import("./mainapp/Main"));
const Auth = React.lazy(() => import("./auth/Auth"));
const User = React.lazy(() => import("./mainapp/User"));
const PostCreator = React.lazy(() => import("./mainapp/PostCreator"));

class App extends Component {

    componentDidMount() {
        this.props.checkToken();
    }

    render() {
        const MyProgress = () => {
            return <main>
                <div className="MainFlex">
                    <CircularProgress/>
                </div>
            </main>
        };
        return (
            <div className="App">
                <Suspense fallback={MyProgress}>
                    {this.props.isLogined ? <Header/> : null}
                    <Switch>
                        <Route exact path="/">
                            {this.props.isLogined ? <Main/> : this.props.isLoading ? <MyProgress/> : <Auth/>}
                        </Route>
                        <Route exact path="/login">
                            {this.props.isLogined ? <Redirect to="/"/> : null}
                            {this.props.isLogined ? <Main/> : this.props.isLoading ? <MyProgress/> : <LoginComponent/>}
                        </Route>
                        <Route exact path="/post">
                            {this.props.isLogined ? <PostCreator/> : this.props.isLoading ? <MyProgress/> :
                                <LoginComponent/>}
                        </Route>
                        <Route exact path="/:user" component={User}/>
                    </Switch>
                </Suspense>
            </div>

        );
    }
}

export default connect(state => ({
    isLogined: state.authReducer.isLogined,
    isLoading: state.authReducer.isLoading
}), dispatch => ({
    checkToken: () => {
        const asyncCheck = () => dispatch => {
            dispatch({type: "LOGIN_INIT"});
            axios.get('api/checkToken')
                .then(res => {
                    if (res.status === 200) {
                        dispatch({type: "LOGIN_SUCCEED"});
                        dispatch({
                            type: "USER_INFO_GOTTEN",
                            payload: {username: res.data.username, userid: res.data.userid, name: res.data.name}
                        });
                        console.log(res.data);
                    } else {
                        throw new Error(res.error);
                    }
                })
                .catch(err => {
                    dispatch({type: "LOGIN_FAILED"});
                });

        };
        dispatch(asyncCheck());
    },

}))(App);
