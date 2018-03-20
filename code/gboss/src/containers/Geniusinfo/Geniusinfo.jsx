import React from 'react';
import {NavBar,List,Grid,Button,InputItem,TextareaItem} from 'antd-mobile';
import Avater from '../../components/avatar-selector/avatar-selector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {Updata} from '../Geniusinfo/../../containers/../redux/actions';
class Geniusinfo extends React.Component{
    state = {
        // 头像
        avatar: '',
        // 职位简介
        desc: '',
        // 职位名
        title: '',

    };
    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })

    }
    //更新头像
    setAvatar=(avatar)=>{
        this.setState({avatar})
    };
    render(){
        var {user}=this.props;
        if(user.avatar){
            return <Redirect to='/genius'/>
        }
        return(<div>
            <NavBar>牛人信息完善</NavBar>
            <Avater setAvatar={this.setAvatar}/>
            <InputItem onChange={(value)=>this.handleChange('title',value)}>招聘职位:</InputItem>
            <TextareaItem title='个人简介:' rows={3} onChange={(value)=>this.handleChange('desc',value)}/>
            <Button type='primary' onClick={()=>this.props.Updata(this.state)}>保存</Button>
        </div>)
    }
}
export default connect(
    state=>({user:state.user}),
    {Updata}
)(Geniusinfo);