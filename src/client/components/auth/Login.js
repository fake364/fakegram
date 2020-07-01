import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import authAction from "../../actions/authActions";


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
    };
    onLogin = (event) => {
        event.preventDefault();
        const {userlogin, passlogin} = this.state;
        this.props.onLogIn(userlogin, passlogin);
        console.log(this.props.ERR_MSG);
    };


    render() {
        return (
            <div className="Auth" style={{height: "100%"}}>
                <main style={{height: "100%"}}>
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
                                    <center
                                        style={{
                                            color: "red",
                                            marginBottom: "14px"
                                        }}>{this.props.isFailed ? this.props.ERR_MSG : null}</center>
                                    <input required onChange={this.handleInputChange} name="userlogin"
                                           placeholder="Номер телефона, имя пользователя или эл. адрес"/>
                                    <input required onChange={this.handleInputChange} type="password" name="passlogin"
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

export default connect(state => ({
    ERR_MSG: state.authReducer.ERR_MSG,
    isFailed: state.authReducer.isFailed
}), (dispatch => ({
    onLogIn: (user, pass) => {
        dispatch(authAction(user, pass));
    }
})))(LoginComponent);