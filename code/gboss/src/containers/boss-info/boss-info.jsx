import React from 'react';
import Avater from '../../components/avatar-selector/avatar-selector'
import {NavBar,List,Grid,Button,InputItem,TextareaItem} from 'antd-mobile'
import {Updata} from '../../redux/actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
class Bossinfo extends React.Component{
    state = {
        // 头像
        avatar: '',
        // 职位简介
        desc: '',
        // 职位名
        title: '',
        // 公司名称
        company: '',
        // 工资
        money: ''
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
        const {user}=this.props;
        if(user.avatar){
            return <Redirect to='/boss'/>
        }
        return(<div>
            <NavBar>BOSS信息完善</NavBar>
            <Avater setAvatar={this.setAvatar}/>
            <InputItem onChange={(value)=>this.handleChange('title',value)}>招聘职位:</InputItem>
            <InputItem onChange={(value)=>this.handleChange('company',value)}>公司名称:</InputItem>
            <InputItem onChange={(value)=>this.handleChange('money',value)}>职位薪资:</InputItem>
            <TextareaItem title='任职要求:' rows={3} onChange={(value)=>this.handleChange('desc',value)}/>
            <Button type='primary' onClick={()=>this.props.Updata(this.state)}>保存</Button>
        </div>)
    }
}
export default connect(
    state=>({user:state.user}),{Updata}

)(Bossinfo);