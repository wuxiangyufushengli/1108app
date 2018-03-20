import React from 'react';
import {List,Grid} from 'antd-mobile'
class Avatar extends React.Component{
    state={
        icon:null
    };
    constructor(props){
        super(props);
        //创建图像列表
        this.avatarList='boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',').map(text=>({
                text,icon:require(`../imgs/${text}.png`)
            }));
    };

    selectAvatar=({icon,text})=>{
        this.setState({
            icon
        });
        this.props.setAvatar(text)
    };


    render(){
        const {icon}=this.state;
        const gridHeader=icon?<p>已选择头像：<img src={icon}/></p>:'请选择头像';
        return(
            <List renderHeader={gridHeader} >
                <Grid data={this.avatarList} columnNum={5} onClick={this.selectAvatar}/>
            </List>
        )
    }
}
export default Avatar;