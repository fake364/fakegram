export default (state={activePost:undefined},action)=>{
    if(action.type==="DETAIL_SHOW"){
        return {activePost:action.post};
    }else if(action.type==="DETAIL_UNFOCUS"){
        return {activePost: undefined};
    }
    return state;
}