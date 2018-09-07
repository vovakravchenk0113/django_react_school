import React from 'react';


/* import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardGroup,
  CardDeck,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
} from 'reactstrap'; */

import Page from 'components/Page';

class HomePage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <Page
        className="HomePage"
        title="Home page"
        breadcrumbs={[{ name: 'Homepage', active: true }]}>

      </Page>
    );
  }
}
export default HomePage;
