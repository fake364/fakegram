import React, {Component} from 'react';
import axios from 'axios';




class RegForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            phone: '',
            password: '',
            login: '',
            name: '',
            err:""

        };

    }
    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }
    onRegister = (event) => {
        event.preventDefault();
        axios.post("/api/user", this.state).then((res) => {
            if(res.data.err){
                this.setState({err:res.data.err});
            }
        });
    }

    render() {
        return (
            <form method="post" action="/api/user" onSubmit={this.onRegister}>
                {this.state.err!==""?<center style={{color:"red",marginBottom:"14px"}}>{this.state.err}</center>:null}
                <input onChange={this.handleInputChange} name="phone" type="text" placeholder="Моб телефон" required/>
                <input onChange={this.handleInputChange} name="name" type="text" placeholder="Имя и фамилия" required/>
                <input onChange={this.handleInputChange} name="login" type="text" placeholder="Имя пользователя"
                       required/>
                <input onChange={this.handleInputChange} name="password" type="password" placeholder="Пароль" required/>
                <button>Регистрация</button>
            </form>
        );
    }
}

export default RegForm;