import React from 'react';
import Slide1 from '../../public/img/first.jpg'
import {Link, Switch} from "react-router-dom";
import RegForm from "./RegForm";
import {Route} from "react-router-dom";
import MainScreen from "./MainScreen";
import LoginComponent from "./Login";

function Auth() {
    return (
        <main>
            <div className="MainFlex">
                    <MainScreen/>
            </div>
        </main>

    );
}

export default Auth;