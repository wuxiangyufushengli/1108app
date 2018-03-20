import io from 'socket.io-client';
import {MSG_READ,SUCESS,ERROR,UPDATEUSER,RESETUSER,REVEVICEUSER,RECEIVE_MSG,RECEIVE_MSGLIST} from './action-types';
import {ReqRegister,ReqLogin,ReUpdate,Reget,GetUser,ReadMsg,ReqMsgList} from './../api/index';
export const reqsucess=(user)=>({type:SUCESS,data:user});
export const reqerror=(msg)=>({type:ERROR,data:msg});
export const updateUser=(user)=>({type:UPDATEUSER,data:user});
export const resetUser=(msg)=>({type:RESETUSER,data:msg});
//接收用户列表的同步action
export const reveviceUser=(user)=>({type:REVEVICEUSER,data:user});

export const register=({name,pwd,pwd2,type})=>{
    if(!name||!pwd){
        return reqerror('用户名或密码不能为空')
    }else if(pwd!==pwd2){
        return reqerror('两次密码输入必须一致')
    }
    return async dispatch=>{
       /* ReqRegister({name,pwd,type}).then((response)=>{

        })*/
        var response= await ReqRegister({name,pwd,type});
        var result=response.data;
        if(result.code===0){
            initIo(result.data._id,dispatch)
            dispatch(reqsucess(result.data));
            getMsgList(dispatch,result.data._id)
        }else{
            dispatch(reqerror(result.msg))
        }

    }

}
export const login=({name,pwd})=>{
    if(!name||!pwd){
        return reqerror('用户名或密码不能为空')
    }
    return async dispatch=>{
        var response= await ReqLogin({name,pwd});
        var result=response.data;
        if(result.code===0){
            initIo(result.data._id,dispatch)
            dispatch(reqsucess(result.data))
            getMsgList(dispatch,result.data._id)
        }else{
            dispatch(reqerror(result.msg))
        }

    }

};
export const Updata=(user)=>{
    return  async dispatch=>{
      var response= await ReUpdate(user);
        var result=response.data;
        if(result.code===0){
            dispatch(updateUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }

};
export const getU=()=>{
    return async dispatch=>{
        var response=await Reget();
        var result=response.data;
        if(result.code===0){
            initIo(result.data._id,dispatch)
            dispatch(updateUser(result.data))
            getMsgList(dispatch,result.data._id)
        }else{
            dispatch(resetUser(result.msg))
        }

    }
};

export const getUlist=(type)=>{
    return async  dispatch=>{
        var response=await GetUser(type);
        var result=response.data;
        if(result.code===0){
            dispatch(reveviceUser(result.data))
        }

    }
}

export const ReviceMsg=(chatMsg,userid)=>({type:RECEIVE_MSG,data:{chatMsg,userid}})

function initIo(userid,dispatch) {
    io.socket= io(`ws://localhost:5000?userid=${userid}`);
    io.socket.on('receiveMsg',function (chatMsg) {
       console.log('浏览器收到消息',chatMsg)
        dispatch(ReviceMsg(chatMsg,userid))
    })
   
}
export const sendMsg=({from,to,content})=>{
    return dispatch=>{
        io.socket.emit('sendMsg',{from,to,content})
    console.log('浏览器向服务器发送消息',{from,to,content})

    }
};
async function getMsgList(dispatch,userid) {
    const response=await ReqMsgList();
    const result=response.data;

    if(result.code===0){
        console.log(1)
        const {users,chatMsgs}=result.data;
        dispatch(receiveMsglist({users,chatMsgs,userid}))
    }

};
export const receiveMsglist=(data,userid)=>({type:RECEIVE_MSGLIST,data})

export const readMsg=(from)=>{
    return async (dispatch,getState)=>{
        const response=await ReadMsg(from);
        const result=response.data;
        if(result.code===0){
            const count=result.data;
            const to=getState().user._id;
            dispatch(msgRead({count,from,to}))

        }
    }
};
const msgRead=({count,from,to})=>({
    type:MSG_READ,data:{count,from,to}
});