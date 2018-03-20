import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import './components/index.less'
import './text/text'
import Register from './containers/register/register';
import Login from './containers/login/login';
import Dashboard from './containers/dashboard/dashboard';


ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                    <Route  component={Dashboard}/>

                </Switch>
            </BrowserRouter>
        </Provider>),document.getElementById('root'))
