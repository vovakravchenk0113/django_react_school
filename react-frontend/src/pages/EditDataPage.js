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

class EditDataPage extends Component {

  constructor(props) {
    super(props);
    this.schoolid = this.props.match.params.schoolid;
    this.statisticid = this.props.match.params.id;
     this.state = {
      schools: [],
      schoolData: {
                    year: '',
                    week: '',
                    month: '',
                    elect_eur: '',
                    elect_kwh: '',
                    heating_eur: '',
                    heating_kwh: '',
                    water_eur: '',
                    water_litres: '' ,
                    school_id: {
                      pk : 0
                    },
                    ref_id: 0   
                  },
      message:''
    };
    this.addSchoolService = new SchoolService();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendModifiedData = this.sendModifiedData.bind(this);
  }
  componentDidMount(){
    axios.get('http://localhost:8000/api/school/')
    .then(response => {
      this.setState({ schools: response.data.objects });
    })
    .catch(function(error) {
      console.log(error);
    });

    // const schoolid = this.props.match.params.schoolid;
    // const dataid = this.props.match.params.id; 

    axios.get('http://localhost:8000/api/statistics/statistics/' + this.statisticid + '/')
    .then(response => {
      const schoolData = this.getSchoolData(response.data);
      console.log("schoooldata");
      console.log(schoolData);
      this.setState({ schoolData: schoolData });
      console.log(this.schoolData);
    })
    .catch(function(error){
      console.log(error);
    });
  }

  getSchoolData(object){
    const schoolData = Object.assign({}, this.state.schoolData);
    schoolData.year = object.year;
    schoolData.month = object.month;
    schoolData.week = object.week;
    schoolData.elect_eur = object.elect_eur;
    schoolData.elect_kwh = object.elect_kwh;
    schoolData.heating_eur = object.heating_eur;
    schoolData.heating_kwh = object.heating_kwh;
    schoolData.water_eur = object.water_eur;
    schoolData.water_litres = object.water_litres;
    
    const urlArray = object.school_id.split('/');
    const school_id = urlArray[urlArray.length - 2];
    schoolData.ref_id = school_id;
    schoolData.school_id.pk = school_id;
    return schoolData;
  }

  schoolOption(){
    if (this.state.schools instanceof Array) {
      return this.state.schools.map(function(school, i){
        return <option value={school.id} id={school.id} key={i}>{school.school_name}</option>;
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
    const schoolDatum = Object.assign({}, this.state.schoolData);
    console.log(schoolDatum);
    schoolDatum[event.target.name] = event.target.value;
    this.setState({schoolData: schoolDatum});
    console.log("changed data are");
    console.log(this.state.schoolData);
  }

  sendModifiedData(data, statisticid) {
    axios.put('http://localhost:8000/api/statistics/statistics/' + statisticid + '/', data)
    .then(res => {      
      // this.setState({ schoolData: res.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.sendModifiedData(this.state.schoolData, this.statisticid);
    this.props.history.push('/statistics/' + this.schoolid);
    // window.location.reload();
  }

  render() { 
    const schoolData = this.state.schoolData;
    const { initialValid } = this.props; 
    return (
      <Page title="Edit Data" breadcrumbs={[{ name: 'Edit data', active: true }]}>
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Edit DATA</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <ValidatingFormGroup>
                        <Label for="exampleSelect">School Name</Label>
                        <Input type="select" name="school_id" value={this.ref_id} onChange={this.onChange} disabled>
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
                          value={schoolData.elect_eur}
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
                          value={schoolData.heating_eur}
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
                          value={schoolData.water_eur}
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
                    <Button type="submit">Update Data</Button>
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
 
export default EditDataPage;


