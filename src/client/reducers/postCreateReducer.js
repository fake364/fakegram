const initialState = {
    postStatus: {
        isLoading: false,
        isDone: false,
    },
    file: "",
    description:""
}
export default (state=initialState,action)=>{
    if(action.type==="POST_CREATE_INIT"){
        return Object.assign({},state,{postStatus: {isLoading: true,isDone: false}});
    }else if(action.type==="POST_CREATE_FAILED"){
        return Object.assign({},state,{postStatus: {isLoading: false,isDone: false}});
    }else if(action.type==="POST_CREATE_FILE"){
        return Object.assign({},state,{file:action.file});
    }else if(action.type==="POST_CREATE_DESCRIPTION"){
        return Object.assign({},state,{description:action.description});
    }else if(action.type==="POST_CREATE_SUCCEED"){
        return Object.assign({},state,{postStatus: {isLoading: false,isDone: true}});
    }
    else if(action.type==="POST_CREATE_RESET"){
        return Object.assign({},state,initialState);
    }
    return state;
}