import React from 'react';
import {Card,WhiteSpace,WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header;
const Body = Card.Body;

class UserList extends React.Component {
    handleClick=(userid)=>{
        this.props.history.push(`/chat/${userid}`)
    }
    render() {
       const {users}=this.props;
        console.log(users);
        return (
            <WingBlank style={{marginTop: 50, marginBottom: 50}}>
                <QueueAnim type='scale'>
                    {this.props.users.map(user=>
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={()=>this.handleClick(user._id)}>
                                <Header
                                    title={user.name}
                                    thumb={user.avatar?require(`../../components/imgs/${user.avatar}.png`):null}
                                    extra={<span>{user.title}</span>}
                                />
                                <Body>
                                {user.company?<div>公司: {user.company}</div>:null}
                                <div>描述: {user.desc}</div>
                                {user.money?<div>薪资: {user.money}</div>:null}
                                </Body>
                            </Card>
                        </div>)}
                </QueueAnim>




            </WingBlank>
        )
    }
}

export default withRouter(UserList);