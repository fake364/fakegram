export default (state = {isLogined: false,isLoading:false}, action) => {
    if (action.type === "LOGIN_SUCCEED") {
        return {isLogined: true,isLoading: false};
    }
    else if(action.type==="LOGIN_FAILED"){
        return {isLogined: false,isLoading:false};
    }else if(action.type==="LOGIN_INIT"){
        return {isLogined: false,isLoading: true}
    }else if(action.type==="LOGOUT"){
        return Object.assign({},state,{isLogined:false});
    }
    else return state;
}
