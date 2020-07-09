import React, {Component} from "react";
import {connect} from "react-redux";
import Avatar from "../../public/img/avatar.jpg";
import Dots from "../../public/icons/dots.png";
import Like from "../../public/icons/like.png";
import Comment from "../../public/icons/comment.png";
import Button from "@material-ui/core/Button";
import axios from "axios";

class DetailedPost extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            comment: "",
            comments: this.props.post.comments
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {author: this.props.username, comment: this.state.comment};
        axios.patch(`api/post/${this.props.post._id}`, data).then((res) => {
            if (res.status === 200) {
                this.setState({comments: [...this.state.comments, data]})
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return <div className="DetailedPostBack">
            <div onClick={() => {
                this.props.unfocus()
            }} className="BlackScreen"/>
            <div className="DetailedPost">
                <img style={{objectFit: "cover", maxWidth: "710px"}} id="image"
                     src={"images/posts/" + this.props.post.image}/>
                <div className="DetailSecond">
                    <div className="PostHeader">
                        <div className="Ava"><img src={Avatar}/></div>
                        <div style={{marginLeft: "16px", flex: "1"}}><h2>{this.props.author}</h2></div>
                        <div><img style={{width: "20px", height: "20px", padding: "8px", boxSizing: "padding-box"}}
                                  src={Dots}/></div>
                    </div>
                    <div className="CommentsSocial">
                        <div className="Comments">
                            <div className="Comment">
                                <div><img src={Avatar}/></div>
                                <div className="CommentText">
                                    <h2>{this.props.author}</h2>{" " + this.props.post.description}
                                </div>
                            </div>
                            {this.state.comments.map(comment =>
                                <div className="Comment">
                                    <div><img src={Avatar}/></div>
                                    <div className="CommentText">
                                        <h2>{comment.author}</h2>{" " + comment.comment}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="Social">
                            <img src={Like}/>
                            <img src={Comment}/>
                            <h2>Нравится N человек</h2>
                        </div>
                        <div className="SendComment">
                            <form onSubmit={this.onSubmit}>
                                <input required onChange={(e) => {
                                    this.setState({comment: e.target.value})
                                }} value={this.state.comment} type="text" placeholder={"Добавьте комментарий..."}/>
                                <Button type="submit" color="primary">Опубликовать</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default connect(state => ({
        username: state.userReducer.username
    }),
    dispatch => ({
        unfocus: () => {
            dispatch({type: "DETAIL_UNFOCUS"});
        }
    }))(DetailedPost);