import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import serverUrl from "../../../../serverUrl";

const useStyles = makeStyles({
    root: {
        background: 'transparent',
        borderRadius: "50%",
        width: 38,
        padding: "8px",
        marginBottom: "8px",
        textAlign: "center"
    },
});

function NavButton(props) {
    const onLogout = function (e) {
        axios.get(serverUrl + "/api/logout").then((res, err) => {
            props.logout();
        });
    };

    const classes = useStyles();
    return <IconButton onClick={onLogout} className={classes.root}><img style={{width: "100%"}}
                                                                        src="/dist/build/images/logout.png"/></IconButton>;
}

class Header extends Component {

    render() {

        return (
            <div className="Header">

                <nav>
                    <div className="SubHead">
                        <Link to="/">
                            <div className="logotitle">

                                <div>
                                    <img alt="text" src="/dist/build/images/logo192.png"/>
                                </div>
                                <div className="leftborder">
                                    Fakegram
                                </div>
                            </div>
                        </Link>
                        <div><input type="text" placeholder="Поиск"/></div>
                        <div className="Panel">
                            <img className="Icon" src="/dist/build/images/heart.png" alt="Photo2"/>
                            <Link to={this.props.loginedUser}><img className="Icon" src="/dist/build/images/user.png"
                                                                   alt="Photo3"/></Link>
                            <Link to="post"><img className="Icon" src="/dist/build/images/upload.png"
                                                 alt="Photo3"/></Link>
                            <NavButton logout={this.props.logout}/>
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}

export default connect(state => ({
    loginedUser: state.userReducer.username
}), dispatch => ({
    logout: () => {
        dispatch({type: "LOGOUT"});
    }
}))(Header);