import React from 'react';
import {Link} from "react-router-dom";

function Post(props) {
    console.log(props);
    let username = props.post.author.username;
    return (
        <div className="Post">
            <header>
                <Link to={username}>
                    <img src="/dist/build/images/avatar.jpg" alt="Photo"/>
                </Link>
                <h2><Link to={username}>{username}</Link></h2>
                <img className="dots" src="/dist/build/images/dots.png"/>
            </header>
            <div className="postphoto">
                <img
                    src={props.post.image.includes("http") && props.post.image.includes("://") ? props.post.image : "images/posts/" + props.post.image}/>
            </div>
            <div className="FootBlock" style={{maxHeight: "300px"}}>
                <div className="LikeComments">
                    <div className="PostPanel">
                        <img className="Icon" alt="Photo" src="/dist/build/images/like.png"/>
                        <img className="Icon" alt="Photo" src="/dist/build/images/comment.png"/>
                    </div>
                    <h2>999 лайков</h2>
                    <div className="Comments" style={{
                        overflowY: "auto",
                        maxHeight: "150px"
                    }}>
                        {props.post.description !== "" ? <div>
                            <h2 style={{display: "inline-block", margin: "8px 0"}}>{username}</h2>
                            {" " + props.post.description}
                        </div> : null}
                        {props.post.comments.map((comment, index) =>
                            <div key={index}>
                                <h2 style={{display: "inline-block", margin: "8px 0"}}>{comment.author}</h2>
                                {" " + comment.comment}
                            </div>)
                        }

                    </div>
                </div>
                <div className="Comment">
                    <input required placeholder="Добавить комментарий...."/>
                    <button>Опубликовать</button>
                </div>
            </div>
        </div>

    );
}

export default Post;
