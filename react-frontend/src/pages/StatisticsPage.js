import Page from 'components/Page';
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import SchoolService from '../services/SchoolService';
import axios from 'axios';
import {Link} from 'react-router-dom';
class StatisticsPage extends Component {

  constructor(props){
    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      school: {
        id: '',
        school_name: ''    
      },
      statistics: []
    }
    this.getSchoolService = new SchoolService();
    this.tableRow = this.tableRow.bind(this);
    this.getData = this.getData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteData = this.deleteData.bind(this);
    console.log(this.id);
  }

  componentWillReceiveProps () {
    const id = this.props.match.params.id;
    
    this.getData(id);
  }

  componentDidMount(){
    const id = this.props.match.params.id;

    this.getData(id);
  }

  handleArray(array, id){
    var dataArray = [];
    array.forEach(element => {

      var urlArray = element.school_id.split('/');
      var school_id = urlArray[urlArray.length - 2];
      if (school_id === id) { 
        dataArray.push(element);
      }
    });
    return dataArray;
  }

  getData(id){
    axios.get('http://localhost:8000/api/statistics/statistics/?format=json')
    .then(res => {
      var dataArray = this.handleArray(res.data.objects, id);
      this.setState({ statistics: dataArray});
      console.log(this.state.statistics);
      this.forceUpdate();
      // this.render();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteData(id){
    console.log("schoolid=");
    console.log(this.state.school._id);
    axios.delete('http://localhost:8000/api/statistics/statistics/' + id + '/')
    .then(res => {this.forceUpdate();})
    .catch(err => console.log(err))
  }

  handleDelete(event){
    event.preventDefault();
    const id = event.target.id.value;
    this.deleteData(id);
    window.location.reload();
  }

  tableRow(){
    if (this.state.statistics instanceof Array) {
      return this.state.statistics.map(function (data, i) {
        return  (           
          <tr key={i}>
            <td>{i+1}</td>
            <td>{data.year}</td>
            <td>{data.week}</td>
            <td>{data.month}</td>
            <td>{data.elect_eur}</td>
            <td>{data.elect_kwh}</td>
            <td>{data.heating_eur}</td>
            <td>{data.heating_kwh}</td>
            <td>{data.water_eur}</td>
            <td>{data.water_litres}</td>
            <td><Link to={"/school/"+this.id+"/edit/"+data.statistic_id} className="btn btn-primary">Edit</Link></td>
            <td>
                <form onSubmit={(event) => {this.handleDelete(event)}}>
                    <input type="hidden" name="id" value={data.statistic_id} />
                    <input type="submit" value="Delete" className="btn btn-danger" />
                </form>
            </td>
          </tr>
        );
      }.bind(this))
    }
  }

  render() {
    return (
      <Page
        title="Statistics"
        breadcrumbs={[{ name: 'Statistics', active: true }]}
        className="TablePage">
          <Row>
            <Col>
              <Card className="mb-6">
                <CardHeader>school statistics</CardHeader>
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <Card body>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Year</th>
                              <th>Week</th>
                              <th>Month</th>
                              <th>Electricity euro</th>
                              <th>Electricity kwh</th>
                              <th>Heating euro</th>
                              <th>Heating kwh</th>
                              <th>Water euro</th>
                              <th>Water litres</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.tableRow()}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </Page>
    )
  }
  // render() { 
  //   return (  );
  // }
}
 
export default StatisticsPage;

