import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import * as jwt from "jsonwebtoken";


class LoginComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            userlogin: '',
            passlogin: '',
            err: ""
        }
    }

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }
    onLogin = (event) => {
        event.preventDefault();
        const {userlogin, passlogin} = this.state;
        this.props.onLogIn(userlogin,passlogin);
    }

    render() {

        return (
            <div className="Auth" style={{height:"100%"}}>
                <main style={{height:"100%"}}>
                    <div className="MainFlex">
                        <div className="SecondSlide">
                            <div style={{
                                paddingBottom: "32px"
                            }} className="RegisterForm">
                                <h1 style={{
                                    margin: "0 0 40px 0",
                                    paddingTop: "24px"
                                }}>Fakegram</h1>
                                <form onSubmit={this.onLogin} method="post">
                                    {this.state.err !== "" ? <center
                                        style={{color: "red", marginBottom: "14px"}}>{this.state.err}</center> : null}
                                    <input onChange={this.handleInputChange} name="userlogin"
                                           placeholder="Номер телефона, имя пользователя или эл. адрес"/>
                                    <input onChange={this.handleInputChange} type="password" name="passlogin"
                                           placeholder="Пароль"/>
                                    <button>Войти</button>
                                </form>
                            </div>
                            <div className="IfHasLogin">
                                У вас ещё нет аккаунта? <Link to="/">Зарегистрироваться</Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default connect(null,(dispatch => ({
    onLogIn: (userlogin,passlogin) => {
        const asyncAuth=(us,pass)=> dispatch=>{
            axios.post("/api/authenticate", {userlogin:us, passlogin:pass}).then((res) => {
                if (res.status == 200) {
                    console.log(res);
                    dispatch({type:"LOGIN_SUCCEED"})
                    dispatch({type:"USER_INFO_GOTTEN",payload:{username:res.data.username,userid:res.data.userid}});
                }
            }, (err) => {
                dispatch({type: "LOGIN_FAILED"});
            });
        }
        dispatch(asyncAuth(userlogin,passlogin));
    }
})))(LoginComponent);