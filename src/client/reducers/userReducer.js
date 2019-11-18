export default (state={username:"user",userid:""},action)=>{
    if(action.type==="USER_INFO_GOTTEN"){
        return {username: action.username,userid:action.userid};
    }
    return state;
}