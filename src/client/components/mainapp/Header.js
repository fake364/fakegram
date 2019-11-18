import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logo from "../../public/logos/logo192.png";
import Like from "../../public/icons/heart.png";
import Profile from "../../public/icons/user.png";
import Upload from "../../public/icons/upload.png"
import LogOut from "../../public/icons/logout.png"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
const useStyles = makeStyles({
    root: {
        background: 'transparent',
        borderRadius: "50%",
        width:38,
        padding:"8px",
        marginBottom:"8px",
        textAlign:"center"
    },
});

function NavButton(props) {
    const onLogout=function(e){
        axios.get("/api/logout").then((res,err)=>{
           props.logout();
        });
    };

    const classes = useStyles();
    return <IconButton onClick={onLogout} className={classes.root}><img style={{width:"100%"}} src={LogOut}/></IconButton>;
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
                                    <img alt="text" src={Logo}/>
                                </div>
                                <div className="leftborder">
                                    Fakegram
                                </div>
                            </div>
                        </Link>
                        <div><input type="text" placeholder="Поиск"/></div>
                        <div className="Panel">
                            <img className="Icon" src={Like} alt="Photo2"/>
                            <Link to={this.props.loginedUser}><img className="Icon" src={Profile} alt="Photo3"/></Link>
                            <Link to="post"><img className="Icon" src={Upload} alt="Photo3"/></Link>
                            <NavButton logout={this.props.logout} />
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}

export default connect(state => ({
    loginedUser: state.userReducer.username
}), dispatch=>({
    logout:()=>{
        dispatch({type:"LOGOUT"});
    }
}))(Header);