import React, {Component} from "react";
import {DropzoneArea} from 'material-ui-dropzone'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import axios from "axios";
import FormData from "form-data";
import {CircularProgress} from "@material-ui/core";
import {Redirect} from "react-router";

class PostCreator extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (files) => {
        this.props.setFile(files[0]);
    }

    onSubmit = (event) => {
        event.preventDefault();

        let formdata = new FormData();
        formdata.set("description", this.props.description);
        formdata.set("author", this.props.logedUserId);
        console.log(this.props.logedUserId);
        formdata.append("image", this.props.file);
        console.log(formdata);
        this.props.createPost(formdata);

    };
    onChangeDescription = (e) => {
        this.props.setDescription(e.target.value)
    };

    render() {
        if(this.props.postStatus.isLoading){
            return <main>
                <div className="MainFlex"><CircularProgress/></div>
            </main>
        }
        if(this.props.postStatus.isDone){
            this.props.resetPage();
            return <Redirect to="/"/>
        }
        return <main>
            <div className="MainFlex">
                <div style={{justifyContent: "center", flexDirection: "row"}} className="Post">
                    <form onSubmit={this.onSubmit} method="post">
                        <div className="PostCreator">
                            <h1>Add your best moments to our community :)</h1>
                            <DropzoneArea
                                onChange={this.handleChange}
                                acceptedFiles={['image/jpeg', 'image/png']}
                                filesLimit={1}
                                dropzoneText={"Выберите или перетащите фотографию"}
                                name="files"
                            />
                            <TextField
                                id="description"
                                name="description"
                                label="Описание фотографии"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                variant="outlined"
                                onChange={this.onChangeDescription}
                            />
                            <Button type="submit" color="primary">Опубликовать</Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    }
}

export default connect(state => ({
    logedUser: state.userReducer.username,
    logedUserId: state.userReducer.userid,
    description:state.postCreateReducer.description,
    file:state.postCreateReducer.file,
    postStatus: state.postCreateReducer.postStatus
}), dispatch => ({
    setFile: (file) => {
        dispatch({type: "POST_CREATE_FILE", file: file});
    },
    setDescription: (description) => {
        dispatch({type: "POST_CREATE_DESCRIPTION", description: description});
    },
    createPost: (formdata) => {
        const asyncPostCreate = () => dispatch => {
            dispatch({type: "POST_CREATE_INIT"});
            axios.post("/api/post", formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                if (res.status === 200) {
                    dispatch({type: "POST_CREATE_SUCCEED"});
                }
            }).catch((err) => {
                dispatch({type: "POST_CREATE_FAILED"})
                console.log(err);
            });
        }
        dispatch(asyncPostCreate());
    },
    resetPage:()=>{
        dispatch({type:"POST_CREATE_RESET"});
    }
}))(PostCreator);