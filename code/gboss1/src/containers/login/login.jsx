import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect,NavLink} from 'react-router-dom';
import '../login/../../assets/index.less';
import Logo from '../../components/logo/logo';
import {connect} from 'react-redux';
import {login} from '../../redux/actions'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Button} from 'antd-mobile'
 class Login extends React.Component{
     state={
         name:'',
         pwd:'',

     }
     handleChange=(name,value)=> {
         this.setState({
             [name]: value
         })

     };
     gologin=()=>{
         this.props.login(this.state)
     };
     goRegister=()=>{
         this.props.history.replace('/register')
     }
    render() {
         var user=this.props.user;
        if(user.redirectTo){
            <Redirect to={user.redirectTo}/>
        }
        return (
            <div>

                <NavBar>硅 谷 直 聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {user.msg?<p>{user.msg}</p>:null}
                        <InputItem
                            placeholder='输入用户名' onChange={(val)=>{
                            this.handleChange('name',val)
                        }}
                        >
                            用户名:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            placeholder='输入密码' onChange={(val)=>{
                            this.handleChange('pwd',val)
                        }}
                        >
                            密 码:
                        </InputItem>
                        <WhiteSpace/>

                        <Button type='primary' onClick={this.gologin} >登 陆</Button>
                        <WhiteSpace/>
                        <Button onClick={this.goRegister} >还没有账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>{
        return {user:state.user}
    },{
        login
    }
)(Login) ;