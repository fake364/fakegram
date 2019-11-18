import React from 'react';
import Dots from "../../public/icons/dots.png";
import InstaPhoto from "../../public/img/instaphoto.jpg";
import Avatar from "../../public/img/avatar.jpg";
import Like from "../../public/icons/like.png";
import Comment from "../../public/icons/comment.png";

function Post() {
    return (
        <div className="Post">
            <header>
                <a href="#">
                    <img src={Avatar} alt="Photo"/>
                </a>
                <h2>bolkonski_v</h2>
                <img className="dots" src={Dots}/>
            </header>
            <div className="postphoto">
                <img src={InstaPhoto}/>
            </div>
            <div className="FootBlock">
                <div className="LikeComments">
                    <div className="PostPanel">
                        <img className="Icon" alt="Photo" src={Like}/>
                        <img className="Icon" alt="Photo" src={Comment}/>
                    </div>
                    <h2>999 лайков</h2>
                    <div className="Comments">Comments</div>
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
