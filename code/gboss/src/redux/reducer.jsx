import {combineReducers} from 'redux';
import {MSG_READ,SUCESS,ERROR,UPDATEUSER,RESETUSER,REVEVICEUSER,RECEIVE_MSG,RECEIVE_MSGLIST}from './action-types';
import {gettype} from '../untils'
const initUser={
    name:'',
    type:'',
    msg:'',
    redirectTo:''
}
 function user(state=initUser,action) {

    switch (action.type){
        case SUCESS:
            var user=action.data;
            return {...action.data,redirectTo:gettype(user.type,user.avatar)};
        case  ERROR:
            return {...state,msg:action.data};
        case UPDATEUSER:
            return action.data;
        case RESETUSER:
            return {...initUser,msg:action.data}
        default:
            return state;
    }
};

function userlist(state=[],action) {
    switch (action.type){
        case REVEVICEUSER:
            return action.data;
        default:
            return state;
    }

}



const initChat={
    chatMsgs:[],
    users:{},
    unReadCount:0,
}
function chat(state=initChat,action) {
  switch (action.type){
      case RECEIVE_MSG:
          var {chatMsg,userid}=action.data;
          return {
              chatMsgs:[...state.chatMsgs,chatMsg],
              users:state.users,
              unReadCount:state.unReadCount+(!chatMsg.read&&chatMsg.to===userid)
          };
      case RECEIVE_MSGLIST:
          const {chatMsgs,users,userid}=action.data;
          return{
              chatMsgs,
              users,
              unReadCount:chatMsgs.reduce((pretoal,msg)=>{
                  return pretoal+(!msg.read&&msg.to===userid)
              },0)
          }
      case MSG_READ:
          const {count,from,to}=action.data;
          return{
              chatMsgs:state.chatMsgs.map(msg=>{
                  if(msg.from===from&&msg.to===to&&!msg.read){
                      return {...msg,read:true}
                  }else{
                      return msg
                  }

              }),
              users:state.users,
              unReadCount:state.unReadCount-count
          }
      default:
          return state;
  }
}
export default combineReducers({
    user,
    userlist,
    chat


})
