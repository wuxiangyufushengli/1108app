import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../containers/register/job.png';
class Logo extends React.Component {
    render(){
        return(<div className='logo-container'>
            <img src={logo} alt='logo'/>
        </div>)
    }

}
export default Logo;