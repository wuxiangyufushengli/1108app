import React from 'react';
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item=TabBar.Item;
class Navfooter extends React.Component{
    render(){
        const navList=this.props.navList.filter(nav=>!nav.hide);
        const {pathname}=this.props.location;
        return(<TabBar>
            {
             navList.map((nav,index)=>{
             return(
                 <Item key={nav.path}
                       title={nav.text}
                       badge={nav.path==='/msg'?this.props.unReadCount:0}
                       icon={{uri: require(`../navfooter/../../components/../assets/imgs/${nav.icon}.png`)}}
                       selectedIcon={{uri: require(`../navfooter/../../components/../assets/imgs/${nav.icon}-active.png`)}}
                       selected={pathname===nav.path}
                       onPress={() => {
                           this.props.history.replace(nav.path)
                       }}
                 />
             )

             })
            }
        </TabBar>)
    }
}
export default withRouter(Navfooter);