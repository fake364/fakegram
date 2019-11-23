import React from 'react';
import Dots from "../../public/icons/dots.png";
import InstaPhoto from "../../public/img/instaphoto.jpg";
import Avatar from "../../public/img/avatar.jpg";
import Like from "../../public/icons/like.png";
import Comment from "../../public/icons/comment.png";
import {Link} from "react-router-dom";

function Post(props) {
    let username = props.post.author.username;
    return (
        <div className="Post">
            <header>
                <Link to={username}>
                    <img src={Avatar} alt="Photo"/>
                </Link>
                <h2><Link to={username}>{username}</Link></h2>
                <img className="dots" src={Dots}/>
            </header>
            <div className="postphoto">
                <img src={"images/posts/" + props.post.image}/>
            </div>
            <div className="FootBlock">
                <div className="LikeComments">
                    <div className="PostPanel">
                        <img className="Icon" alt="Photo" src={Like}/>
                        <img className="Icon" alt="Photo" src={Comment}/>
                    </div>
                    <h2>999 лайков</h2>
                    <div className="Comments">
                        <div>
                            <h2 style={{display: "inline-block",margin:"8px 0"}}>{username}</h2>
                            {" " + props.post.description}
                        </div>
                        {props.post.comments.map(comment =>
                            <div>
                                <h2 style={{display: "inline-block",margin:"8px 0"}}>{comment.author}</h2>
                                {" " + comment.comment}
                            </div>)
                        }

                    </div>
                </div>
                <div className="Comment">
                    <input placeholder="Добавить комментарий...."/>

                    <button>Опубликовать</button>
                </div>
            </div>
        </div>

    );
}

export default Post;
