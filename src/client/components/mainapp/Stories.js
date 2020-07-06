import React, {Component} from 'react';
import Avatar from "../../public/img/avatar.jpg";
import {connect} from "react-redux";

class Stories extends Component {
    render() {
        return (
            <div className="Stories">
                <div style={{display: "flex", alignItems: "center"}}>
                    <img className="Avatar" src={Avatar} alt="Photo"/>
                    <div style={{marginLeft: "14px"}}>
                        <h2>{this.props.username}</h2>
                        <p>{this.props.name}</p>
                    </div>
                </div>
                <div className="StoriesList">
                    <div className="StoriesHeader">
                        <p>Истории</p>
                        <h3>Смотреть все</h3>
                    </div>
                    <div className="ScrollList">
                        <div className="Story">
                            <img src={Avatar} alt="Photo"/>
                            <div className="nickmar">
                                <h2>bolkonski_v</h2>
                                <p>1 ЧАС НАЗАД</p>
                            </div>
                        </div>
                        <div className="Story">
                            <img src={Avatar} alt="Photo"/>
                            <div className="nickmar">
                                <h2>bolkonski_v</h2>
                                <p>1 ЧАС НАЗАД</p>
                            </div>
                        </div>
                        <div className="Story">
                            <img src={Avatar} alt="Photo"/>
                            <div className="nickmar">
                                <h2>bolkonski_v</h2>
                                <p>1 ЧАС НАЗАД</p>
                            </div>
                        </div>
                        <div className="Story">
                            <img src={Avatar} alt="Photo"/>
                            <div className="nickmar">
                                <h2>bolkonski_v</h2>
                                <p>1 ЧАС НАЗАД</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(state => ({
    username: state.userReducer.username,
    name: state.userReducer.name
}), null)(Stories);
