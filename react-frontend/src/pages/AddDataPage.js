import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {ToastContainer, ToastStore} from 'react-toasts';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
  FormFeedback,
} from 'reactstrap';
import { ValidatingFormGroup } from 'reactstrap-validation';

import Page from 'components/Page';
import axios from 'axios';
import SchoolService from '../services/SchoolService';

class AddDataPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      schoolData: {
                  _id: '',
                  year: '',
                  week: '',
                  month: '',
                  elect_eur: '',
                  elect_kwh: '',
                  heating_eur: '',
                  heating_kwh: '',
                  water_eur: '',
                  water_litres: '' ,       
                  },
      message:''
    };
    this.addSchoolService = new SchoolService();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendSchoolData = this.sendSchoolData.bind(this);
  }
  componentDidMount(){
    axios.get('http://localhost:4200/api/schools')
    .then(response => {
      this.setState({ schools: response.data });
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  schoolOption(){
    if (this.state.schools instanceof Array) {
      return this.state.schools.map(function(school, i){
        return <option value={school._id} id={school._id} key={i}>{school.name}</option>;
      })
    }
  }

  yearOptions(){
      var years = [];
      var i = 0;
      for (let year = 2010; year < 2020; year++) {
        years[i] = year;
        i++;
      }      
      return years.map(function(year, i) {
        return <option value={year} key={i}>{year}</option>;
      })
  }

  weekOptions(){
    var weeks = [];
    var i = 0;
    for (let week = 1; week < 55; week++) {
      weeks[i] = week;
      i++;
    }      
    return weeks.map(function(week, i) {
      return <option value={week} key={i}>{week}</option>;
    })
  }
  monthOptions(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.map(function(month, i) {
      return <option value={i+1} key={i}>{month}</option>;
    })
  }

  // get the value when the value of inputbox is changed
  onChange(event) {
    const schoolData = Object.assign({}, this.state.schoolData);
    schoolData[event.target.name] = event.target.value;
    this.setState({schoolData: schoolData});
  }

  notify = () => {
    toast.success("Data added successfully !", {
      position: toast.POSITION.TOP_CENTER
    });
  }

  // send the school data to server
  sendSchoolData(data) {
    axios.post('http://localhost:4200/api/schools/statistics', data)
    .then(res => {      
      this.setState({ schoolData: res.data , message: res.message});
      // alert("success");
      ToastStore.success("Data added successfully.", 3000);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSubmit(event){
    event.preventDefault();

    this.sendSchoolData(this.state.schoolData);
    console.log(this.state.message);

  }

  render() { 
    const schoolData = this.state.schoolData;
    const { initialValid } = this.props; 
    return (
      <Page title="Add Data" breadcrumbs={[{ name: 'Add data', active: true }]}>
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>ADD DATA</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <ValidatingFormGroup>
                        <Label for="exampleSelect">School Name</Label>
                        <Input type="select" name="_id" value={schoolData._id} onChange={this.onChange}>
                          <option>Select school</option>
                          {this.schoolOption()}
                        </Input>
                      </ValidatingFormGroup>
                    </Col>
                    <Col xl={4} lg={4} md={12}>
                      <ValidatingFormGroup>
                        <Label for="exampleSelect">Year</Label>
                        <Input type="select" name="year" value={schoolData.year} onChange={this.onChange}>
                          <option>Select year</option>
                          {this.yearOptions()}
                        </Input>
                      </ValidatingFormGroup>
                    </Col>
                    <Col xl={4} lg={4} md={12}>
                      <ValidatingFormGroup>
                        <Label for="exampleSelect">Week</Label>
                        <Input type="select" name="week" value={schoolData.week} onChange={this.onChange}>
                          <option>Select week</option>
                          {this.weekOptions()}
                        </Input>
                      </ValidatingFormGroup>
                    </Col>
                    <Col xl={4} lg={4} md={12}>
                      <ValidatingFormGroup>
                        <Label for="exampleSelect">Month</Label>
                        <Input type="select" name="month" value={schoolData.month} onChange={this.onChange}>
                          <option>Select month</option>
                          {this.monthOptions()}
                        </Input>
                      </ValidatingFormGroup>
                    </Col>
                    <Col lg={6} md={12}>
                      <ValidatingFormGroup trigger="change" valid={initialValid}>
                        <Label for="elect_eur">Electricity euro</Label>
                        <Input
                          type="text"
                          name="elect_eur"
                          placeholder="Electricity euro"
                          value={schoolData.elect_euro}
                          onChange={this.onChange}
                          required
                        />
                      </ValidatingFormGroup>                  
                    </Col>
                    <Col lg={6} md={12}>
                      <ValidatingFormGroup trigger="change" valid={initialValid}>
                        <Label for="elect_kwh">Electricity KWH</Label>
                        <Input
                          type="text"
                          name="elect_kwh"
                          placeholder="Electricity KWH"
                          value={schoolData.elect_kwh}
                          onChange={this.onChange}
                          required />
                      </ValidatingFormGroup>                  
                    </Col>
                    <Col lg={6} md={12}>
                      <ValidatingFormGroup>
                        <Label for="heat_eur">Heating euro</Label>
                        <Input
                          type="text"
                          name="heating_eur"
                          placeholder="Heating euro"
                          value={schoolData.heating_euro}
                          onChange={this.onChange}
                          required
                        />
                      </ValidatingFormGroup>                  
                    </Col>
                    <Col lg={6} md={12}>
                      <ValidatingFormGroup>
                        <Label for="heat_kwh">Heating KWH</Label>
                        <Input
                          type="text"
                          name="heating_kwh"
                          placeholder="Heating KWH"
                          value={schoolData.heating_kwh}
                          onChange={this.onChange}
                          required
                        />
                      </ValidatingFormGroup>                  
                    </Col>
                    <Col lg={6} md={12}>
                      <ValidatingFormGroup>
                        <Label for="water_eur">Water euro</Label>
                        <Input
                          type="text"
                          name="water_eur"
                          placeholder="Water euro"
                          value={schoolData.water_euro}
                          onChange={this.onChange}
                          required
                        />
                      </ValidatingFormGroup>                  
                    </Col>
                    <Col lg={6} md={12}>
                      <ValidatingFormGroup>
                        <Label for="water_litres">Water litres</Label>
                        <Input
                          type="text"
                          name="water_litres"
                          placeholder="Water litres"
                          value={schoolData.water_litres}
                          onChange={this.onChange}
                          required
                        />
                      </ValidatingFormGroup>                  
                    </Col>
                    <Col md={12}>
                    <Button type="submit">Save Data</Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <ToastContainer  position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore}/>
        </Row>
      </Page>
    )
  
    
  }
}
 
export default AddDataPage;


