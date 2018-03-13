import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'antd-mobile'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Register from './components/register/register';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';


ReactDOM.render((<BrowserRouter>
    <Switch>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>

    </Switch>
  </BrowserRouter>),document.getElementById('root'))
