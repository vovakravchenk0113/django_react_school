import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SchoolService from '../services/SchoolService';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.addSchoolService = new SchoolService();
    }
    render() { 
        return (
            <tr>
                <td>{this.props.key}</td>
                <td>{this.props.datum.year}</td>
                <td>{this.props.datum.week}</td>
                <td>{this.props.datum.month}</td>
                <td>{this.props.datum.elect_eur}</td>
                <td>{this.props.datum.elect_kwh}</td>
                <td>{this.props.datum.heating_eur}</td>
                <td>{this.props.datum.heating_kwh}</td>
                <td>{this.props.datum.water_eur}</td>
                <td>{this.props.datum.water_litres}</td>
                <td><Link to={"/edit/"+this.props.datum._id} className="btn btn-primary">Edit</Link></td>
                <td>
                    <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Delete" className="btn btn-danger" />
                    </form>
                </td>
            </tr>
        );
    }
}
 
export default TableRow;