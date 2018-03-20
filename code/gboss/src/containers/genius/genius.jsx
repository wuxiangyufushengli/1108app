import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getUser} from '../../api';
import UserList from '../../components/uerlist/uerlist';
import {getUlist} from '../../components/../redux/actions'
 class Genius extends Component {
     componentDidMount(){
         this.props.getUlist('boss')
     };
     render () {
      return (
          <UserList users={this.props.users}/>)
    }
}
export default connect(
    state=>({users:state.userlist}),
    {getUlist}

)(Genius)