import {SUCESS,ERROR} from './action-type';
import {ReqRegister,ReqLogin} from '../api/index.js'
export const sucess=(data)=>({
    type:SUCESS,
    data
});
export const error=(data)=>({type:ERROR,data:data});

export const regiseter=({name,pwd,pwd2,type})=>{
    if(!name||!pwd){
        return error('用户名或密码不能为空')
    }else if(pwd!==pwd2){
        return error('两次输入的密码必须一致')
    };

    return dispatch=>{
        ReqRegister({name,pwd,pwd2,type}).then((response)=>{
            var result=response.data;
            if(result.code===0){
                dispatch(sucess(result.data))
            }else{
                dispatch(error(result.msg))
            }
    })
    }

};
export const login=({name,pwd})=>{
    if(!name||!pwd){
        return error('用户名或密码不能为空')
    }
    return dispatch=>{
        ReqLogin({name,pwd}).then((response)=>{
            var result=response.data;
            if(result.code===0){
                dispatch(sucess(result.data))
            }else{
                dispatch(error(result.msg))
            }
        })
    }

};
