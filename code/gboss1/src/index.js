import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect,NavLink,BrowserRouter} from 'react-router-dom';
import Login from './containers/login/login';
import Register from './containers/register/register';
import Dashboard from './containers/dashboard/dashboard';
import {store} from './redux/store';
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route component={Dashboard}/>
            </Switch>
        </BrowserRouter>

    </Provider>,document.getElementById('root'))