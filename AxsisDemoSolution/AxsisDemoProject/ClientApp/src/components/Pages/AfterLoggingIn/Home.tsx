import * as React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import AddUser from './AddUser/AddUser';
import QueryUsers from './QueryUsers/QueryUsers';

const Home = () => (
  <>
    <Row><Col md="6">
      <Card>
        <Card.Header>
          <Card.Title as="h5">Add new user</Card.Title>
        </Card.Header>
        <Card.Body>
          <AddUser/>
        </Card.Body>
      </Card>
    </Col>
    <br/>
    <Col xs="12" sm="12" md="6">
      <Card>
        <Card.Header>
          <Card.Title as="h5">Current users</Card.Title>
        </Card.Header>
        <Card.Body>
          <QueryUsers/>
        </Card.Body>
      </Card>
    </Col></Row>
  </>
);

export default connect()(Home);
