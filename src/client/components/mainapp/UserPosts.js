import React, {Component} from "react";
import DetailedPost from "./DetailedPost"
import {connect} from "react-redux";

class UserPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePost: undefined
        }
    }



    render() {

        return <React.Fragment>

            {this.props.posts.map((post, index) =>
                <div key={index} onClick={()=>{this.props.showPost(index)}}><img src={"images/posts/" + post.image}/></div>
            )}

        </React.Fragment>
    }
}

export default connect(
    state=>({}),
    dispatch=>({
        showPost:(index)=>{
            dispatch({type:"DETAIL_SHOW",post:index});
        }
    }))(UserPosts);