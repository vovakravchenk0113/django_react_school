import React, { Component } from 'react';
import PropTypes from 'utils/propTypes';

import { Table, Progress } from 'reactstrap';

import Avatar from 'components/Avatar';

import withBadge from 'hocs/withBadge';

import axios from 'axios';


const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'success',
})(Avatar);

class UserTable extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      users: [{
        avatar: '',
        firstName: '',
        lastName: '',
        username: '',        
        createdDate: ''
      }]
    }
    this.tableRow = this.tableRow.bind(this);
  }
  
  componentDidMount() {
    axios.get('http://localhost:4200/users/')
    .then(response => {
      this.setState({users: response.data });
      console.log("Usertable is loaded");
    })
    .catch(function(error) {
      console.log(error);
    })
  }


  tableRow(){
    if (this.state.users instanceof Array) {
      return this.state.users.map(function (user, i) {
        return (
          <tr key={i}>
            <td className="align-middle text-center">
              <AvatarWithBadge src={user.avatar} />
            </td>
            <td className="align-middle text-center">{user.firstName}</td>
            <td className="align-middle text-center">{user.lastName}</td>
            <td className="align-middle text-center">{user.username}</td>
            <td className="align-middle text-center">{user.createdDate}</td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <Table responsive hover >
        <thead>
          <tr className="text-capitalize align-middle text-center">
            <td>Photo</td>
            <td>Fisrst name</td>
            <td>Last name</td>
            <td>Username</td>
            <td>Created date</td>
          </tr>
        </thead>
        <tbody>
          {this.tableRow()}
        </tbody>
      </Table>
    );
  }
 
}
 
export default UserTable;
