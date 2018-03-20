import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect,NavLink} from 'react-router-dom';
import Geniusinfo from '../../containers/genius-info/genius-info';
import Bossinfo from '../../containers/boss-info/boss-info';
class Dashboard extends React.Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path='/geniusinfo' component={Geniusinfo}/>
                    <Route path='/bossinfo' component={Bossinfo}/>
                </Switch>
            </div>

        )
    }
}
export default Dashboard;