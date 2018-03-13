/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Login extends Component {

  state = {
    name: '', // 用户名
    pwd: '', // 密码
  }

  handleChange = (name, val) => {
    //更新状态
    this.setState({
      [name]: val    // [name] 代表属性名是一个变量的值
    })
  }

  // 注册
  login = () => {
    this.props.login(this.state)
  }

  // 跳转到登陆路由
  toRegister = () => {
    this.props.history.replace('/register')
  }


  render() {

    const {type} = this.state
    const {msg, redirectTo} = this.props

    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <div>
        <NavBar className='stick-top'>
          硅 谷 直 聘
        </NavBar>
        <Logo/>
        <WingBlank>
          {msg ? <p className='error-msg'>{msg}</p> : null}
          <List>
            <InputItem onChange={val => this.handleChange('name', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={val => this.handleChange('pwd', val)}>密 码:</InputItem>

            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登 陆</Button>
            <Button onClick={this.toRegister}>还没有账号</Button>

          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => state.user,  // 向Login传入返回对象中包含的所有属性
  // state => ({user: state.user}),  // 向Login传入返回对象中包含的所有属性
  {login}
)(Login)

// 向暴露是一个包装的组件:
// <Connect(Login) ><Login name={user.name} type={user.type} login={login}>
// <Connect(Login) ><Login user={user} login={login}>
