import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../../redux/actions'
import {Button,WingBlank,WhiteSpace,List,NavBar,InputItem} from 'antd-mobile';
import Logo from '../login/../../components/logo';

class Login extends React.Component{
    state={
        name:'',
        pwd:'',
        msg:'',
        redirectTo:''

    };
    handleRegister=()=>{
        this.props.history.replace('/register')
    };
    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    };
    handlelogin=()=>{
       this.props.login(this.state);
    };

    render(){
        var {user}=this.props;
        if(user.redirectTo){
           return <Redirect to={user.redirectTo}/>
        }
        return(<div>
            <NavBar>硅 谷 直 聘</NavBar>
            <Logo/>
            <WingBlank>
                <List>
                    {user.msg?<p className='msg-user'>{user.msg}</p>:''}
                    <InputItem onChange={(value)=>this.handleChange('name',value)}>用户名：</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={(value)=>this.handleChange('pwd',value)}>密码：</InputItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handlelogin}>登录</Button>
                    <Button onClick={this.handleRegister}>还没有账号</Button>

                </List>
            </WingBlank>
        </div>)
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Login);





