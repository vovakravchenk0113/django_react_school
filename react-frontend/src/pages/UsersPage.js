import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
} from 'reactstrap';

// import {
//   MdPersonPin,
// } from 'react-icons/lib/md';


// import {
//   userProgressTableData,
// } from 'demos/dashboardPage';

import Page from 'components/Page';

import UserTable from 'components/UserTable';
// import axios from 'axios';
class UsersPage extends React.Component {



  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <Page
        className="DashboardPage"
        title="Users"
        breadcrumbs={[{ name: 'Users', active: true }]}>
        
        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Users</CardHeader>
              <CardBody>
                <UserTable/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default UsersPage;
