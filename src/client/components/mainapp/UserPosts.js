import React from "react";
 function UserPosts(props) {

     return <React.Fragment>
         {props.posts.map(post=>
             <div><img src={"images/posts/"+post.image}/></div>
         )}
     </React.Fragment>
 }
 export default UserPosts;