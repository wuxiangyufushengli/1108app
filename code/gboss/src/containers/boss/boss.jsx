import React, {Component} from 'react';
import {getUser} from '../../api';
import {connect} from 'react-redux';
import UserList from '../../components/uerlist/uerlist'
import {getUlist} from '../../components/../redux/actions'
class Boss extends Component {
  componentDidMount(){
     this.props.getUlist('genius')
  };

  render () {
    return (
        <UserList users={this.props.users}/>
    )
  }
}
export default connect(
    state=>({users:state.userlist}),
    {getUlist}

)(Boss)