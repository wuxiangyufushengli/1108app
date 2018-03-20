import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect,NavLink} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import '../login/../../assets/index.less';
import {connect} from 'react-redux';
import {regiseter} from '../../redux/actions'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'
const RadioItem = Radio.RadioItem

 class Register extends React.Component {
    state={
        name:'',
        pwd:'',
        pwd2:'',
        type:'boss'
    }
     handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })

     };
     goLogin=()=>{
         this.props.history.replace('/login')
     };
     goRegister=()=>{
         this.props.regiseter(this.state)
     };
    render() {
        var user=this.props.user;
        if(user.redirectTo){
            return <Redirect to={user.redirectTo}/>
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
                        <InputItem
                            type='password'
                            placeholder='输入确认密码'
                            onChange={(val)=>{
                            this.handleChange('pwd2',val)
                        }}
                        >
                            确认密码:
                        </InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type==='boss'} onClick={()=>this.handleChange('type','boss')}
                        >
                            BOSS
                        </RadioItem>
                        <RadioItem checked={this.state.type==='genius'} onClick={()=>this.handleChange('type','genius')}
                        >
                            牛人
                        </RadioItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.goRegister}>注 册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.goLogin}>已经有账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),{regiseter}
)(Register)
