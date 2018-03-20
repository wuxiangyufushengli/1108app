/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief

//使用对象存储lastmsg,属性名是chat_id
function getLastMsgs(chatMsgs,userid) {
  const lastMsgObjs={};
 chatMsgs.forEach(msg=>{
   msg.unReadCount=0;
     const savedMsgs=lastMsgObjs[msg.chat_id];
     if(!savedMsgs){
         lastMsgObjs[msg.chat_id]=msg;
         if(!msg.read&&msg.to===userid ){
           msg.unReadCount=1;

         }
     }else{
       if(msg.create_time>savedMsgs.create_time){
           lastMsgObjs[msg.chat_id]=msg;
           msg.unReadCount=savedMsgs.unReadCount;
           if(!msg.read&&msg.to===userid){
               msg.unReadCount++;
           }

       }else {
           if(!msg.read&&msg.to===userid){
               savedMsgs.unReadCount++;
           }
       }
     }

 })
    //对对象组成数组,并对lastmsgs数组进行排序
    const lastMsgs=Object.values(lastMsgObjs)
     lastMsgs.sort(function (msg1,msg2) {
       return msg2.create_time-msg1.create_time
     })
  return lastMsgs;
}


class Msg extends Component {

    render() {
      const {user,chat}=this.props;
      const {users,chatMsgs}=chat;
      const meId=user._id;
      //得到所有聊天的msg数组
        const lastMsgs=getLastMsgs(chatMsgs,meId)



        return (
            <List style={{marginTop:50,marginBottom:50}}>
                <QueueAnim>
                    {lastMsgs.map(lastMsg=>{
                        const targetId=lastMsg.to===meId?lastMsg.from:lastMsg.to;
                        const targetUser=users[targetId];
                        const targetAvatarIcon=targetUser.avatar?require(`../../components/imgs/boy.png`):null;
                        return  <Item onClick={()=>{this.props.history.push(`/chat/${targetId}`)}} key={lastMsg._id}
                                      extra={<Badge text={lastMsg.unReadCount}/>}
                                      thumb={targetAvatarIcon}
                                      arrow='horizontal'
                        >
                            {lastMsg.content}
                            <Brief>{targetUser.name}</Brief>
                        </Item>
                    })}
                </QueueAnim>



            </List>
        )
    }
}

export default connect(
    state=>({user:state.user,chat:state.chat}),{ }
)(Msg)
