import axios from 'axios';

class SchoolService {

    sendSchoolName(data) {
      axios.post('http://localhost:4200/api/schools/add', {
      name: data
    })
    .then(res => function() {
      console.log(res);;
      this.setState({ names: res.data });
      })
    .catch(function (error) {
      console.log(error);
    });
    }
  
    updateData(data, id){
      axios.post('http://localhost:4200/items/update/'+id, {
        item: data
      })
      .then(res => this.setState({ items: res.data }))
      .catch(err => console.log(err))
    }  
  
    deleteData(id){
      axios.get('http://localhost:4200/items/delete/'+id)
      .then(console.log('Deleted')).catch(err => console.log(err))
    }

    sendSchoolData(data) {
      axios.post('http://localhost:4200/api/schools/statistics', data)
      .then(res =>       
      this.setState({ schoolData: res.data , message: res.message})
      )
      .catch(function (error) {
        console.log(error);
      });
    }
  
  }

  export default SchoolService;