import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Geniusinfo from '../Geniusinfo/Geniusinfo';
import Bossinfo from '../boss-info/boss-info';
import cooikes from 'browser-cookies';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getU} from '../../containers/../redux/actions';
import {gettype} from '../dashboard/../../containers/../untils';
import NotFound from '../dashboard/../../components/notfound/not-found';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import Msg from '../msg/msg';
import User from '../user/user';
import {NavBar} from 'antd-mobile';
import Navfooter from '../dashboard/../../components/navfooter/navfooter'
import {ReUpdate} from "../../api/index";
import Chat from '../chat/chat';
class Dashboard extends React.Component{
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '牛人列表',
            icon: 'boss',
            text: '牛人',
        },
        {
            path: '/genius', // 路由路径
            component: Genius,
            title: 'BOSS列表',
            icon: 'job',
            text: 'BOSS',
        },
        {
            path: '/msg', // 路由路径
            component: Msg,
            title: '消息列表',
            icon: 'msg',
            text: '消息',
        },
        {
            path: '/user', // 路由路径
            component: User,
            title: '个人中心',
            icon: 'user',
            text: '我',
        }
    ]

    componentDidMount(){
      const userid=cooikes.get('userid');
      const {user}=this.props;
      if(userid&&!user._id){
          this.props.getU()
      }

  }
    render(){
        //得到当前的请求的path
        const pathname=this.props.location.pathname;
        let userid=cooikes.get('userid');
        if(!userid){
            return <Redirect to='/login'/>
        };
        const {user}=this.props;
        if(!user._id){
            return null
        }else {
            const pathname=this.props.location.pathname;
            if(pathname==='/'){
                const path=gettype(user.type,user.avatar);
                return <Redirect to={path}/>
            }
        };
        if(user.type==='boss'){
            this.navList[1].hide=true;
        }else{
            this.navList[0].hide=true;
        }
        const currentNav=this.navList.find(nav=>nav.path===pathname)



        return(
            <div>
                {currentNav?<NavBar className='stick-top'>{currentNav.title}</NavBar>:null}
            <Switch>
                <Route path='/geniusinfo' component={Geniusinfo}/>
                <Route path='/bossinfo' component={Bossinfo}/>
                <Route path='/boss' component={Boss}/>
                <Route path='/genius' component={Genius}/>
                <Route path='/msg' component={Msg}/>
                <Route path='/chat/:userid' component={Chat}/>
                <Route path='/user' component={User}/>
                <Route component={NotFound}/>
            </Switch>
                {currentNav?<Navfooter unReadCount={this.props.unReadCount} navList={this.navList}/>:null}
            </div>
        )
    };
}
export default connect(
    state=>({user:state.user,unReadCount:state.chat.unReadCount}),
        {getU}
)(Dashboard);