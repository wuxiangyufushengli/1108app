import ajax from './ajax';
export const ReqRegister=(user)=>
    ajax('/api/register',user,'POST');
export const ReqLogin=(user)=>
    ajax('/api/login',user,'POST');
export  const ReUpdate=(user)=>
    ajax('/api/updata',user,'POST');
export const Reget=()=>
    ajax('/api/getUser');
export const GetUser=(type)=>
    ajax('/api/list',{type});
export const ReqMsgList=()=>
    ajax('/api/msglist')
export const ReadMsg=(from)=>
    ajax('/api/readmsg',{from},'POST')
