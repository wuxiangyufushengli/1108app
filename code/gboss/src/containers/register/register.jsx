import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Redirect}from 'react-router-dom';
import {register,reqsucess,reqerror}from '../../redux/actions'


import Logo from '../../components/logo'
import './logo.less';

//引入组件
import {Button,WingBlank,WhiteSpace,List,NavBar,InputItem,Radio} from 'antd-mobile';
const RadioItem = Radio.RadioItem
class Register extends React.Component{

    handleLogin=()=>{
        //跳转到登录页面
        this.props.history.replace('/login')
    };
    state={
        name:'',
        pwd:'',
        pwd2:'',
        type:'boss',
    }
    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    };
    handleRegister=()=>{
       this.props.register(this.state)
    }

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
                    <InputItem onChange={value=>this.handleChange('name',value)}>用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' onChange={value=>this.handleChange('pwd',value)}>密码：</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' onChange={value=>this.handleChange('pwd2',value)}>确认密码：</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==='boss'} onClick={()=>{this.handleChange('type','boss')}}>boss</RadioItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==='genius'} onClick={()=>{this.handleChange('type','genius')}} >牛人</RadioItem>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    <Button onClick={this.handleLogin} >已经有账号</Button>
                </List>
            </WingBlank>

        </div>)
    }
}
export default connect(
    state=>({user:state.user}),{register}
)(Register);