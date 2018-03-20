import React, {Component} from 'react';
import {Result,Modal,WhiteSpace,List} from 'antd-mobile';
import {connect} from 'react-redux';
import {resetUser} from '../../containers/../redux/actions'
import browserCookies from 'browser-cookies'
const Item = List.Item
const Brief = Item.Brief
 class User extends Component {

     handleLogout = () => {
       console.log(1)
             Modal.alert('注销', '确认退出登录吗?', [
                 {
                     text: '取消',
                     onPress: () => console.log('cancel')},
                 {
                     text: '确认',
                     onPress: () => {
                         browserCookies.erase('userid')
                         this.props.resetUser()
                     }
                 }
             ])

     }

     render() {
         const {name, avatar, type, title, desc, money, company} = this.props.user
         return (
             <div style={{marginTop:50}}>
               <Result
                   img={<img src={require(`../../components/imgs/${avatar}.png`)} style={{width: 50}} alt={avatar}/>}
                   title={name}
                   message={company}
               />
               <List renderHeader={() => '相关信息'}>
                 <Item multipleLine>
                   <Brief>职位: {title}</Brief>
                   <Brief>简介: {desc}</Brief>
                     {money ? <Brief>薪资: {money}</Brief> : null}
                 </Item>
               </List>
               <WhiteSpace/>
               <List>
                 <Item onClick={this.handleLogout}>退出登录</Item>
               </List>
             </div>

         )
     }
 }

export default connect(state => ({
    user: state.user
}), {resetUser})(User)