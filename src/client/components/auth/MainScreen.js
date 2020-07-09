import React from 'react';
import {Link} from "react-router-dom";

import TitleImage from "../../public/img/first.jpg";

const RegForm = React.lazy(() => import("./RegForm"));

function MainScreen() {
    return (
        <div className="Auth">

            <div className="Phones">
                <div className="Slides">
                    <img src={TitleImage}/>
                </div>
            </div>
            <div className="SecondSlide">
                <div className="RegisterForm">
                    <h1><i>Fakegram</i></h1>
                    <p>Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</p>
                    <RegForm/>
                    <p style={{fontSize: "14px", padding: "8px 24px"}}>
                        Регистрируясь, вы принимаете наши Условия, Политику использования данных и Политику в
                        отношении файлов cookie
                    </p>
                </div>
                <div className="IfHasLogin">
                    Есть аккаунт? <Link to="/login">Вход</Link>
                </div>
            </div>
        </div>

    );
}

export default MainScreen;