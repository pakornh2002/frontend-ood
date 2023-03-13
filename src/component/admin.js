import "./admin.css";
// import { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Buffer } from 'buffer';
import Header_admin from "./header_admin";

class Admin extends Component {
    state={}
    constructor(){
      super();
      this.state ={
        checkslip:""
      }
      // this.submit = this.submit.bind(this)
    }
    componentDidMount() {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
      fetch("http://localhost:3001/allorder",requestOptions)
      .then(res => res.json())
      .then((result) => {
            this.setState({checkslip:result})
            console.log(this.state.checkslip);
          } 
        )
    }
    readImage(img) {
      var buffer = new Buffer(img, "base64");
      return buffer;
    }


    submit(status,orderid){
      
      const raw = JSON.stringify({
        "status":status,
        "orderid":orderid
      })
      console.log(raw);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:raw
    };
   
    fetch('http://localhost:3001/update-status', requestOptions)
        .then(response => response)
        .then(data => {
          alert('upload complete')
          window.location.reload();
        })
        .catch(error => {
            console.error('There was an error!', error.toString());
            alert('เกิดข้อผิดพลาดในการเพิอ่้มข้อมูล');
        });
  
      
    
    }

    render(){
    return(
    <div>  
      <Header_admin/>    
    <table className="table">
    <thead>
      <h2 className="update-header">Update Buy Status</h2>
      <tr className = 'table-header'>
        <th>Student ID</th>
        <th>Order ID</th>
        <th>Price</th>
        <th>Datetime</th>
        <th>Payment Status</th>
        <th>Uploaded slip</th>
        <th>Update Payment Status</th>
      </tr>
    </thead>
    <tbody>
  {Array.isArray(this.state.checkslip) && this.state.checkslip.map(checkslip => (
    <tr className = 'update-table' key={checkslip.Student_buyID}>
      <td><p className="my-5">{checkslip.Student_buyID}</p></td>
      <td><p className="my-5">{checkslip.OrderID}</p></td>
      <td><p className="my-5">{checkslip.Total_price}</p></td>
      <td><p className="my-5">{checkslip.Buy_date}</p></td>
      <td><p className="my-5">{checkslip.Buy_status}</p></td>
      <td>{checkslip.orderqr==null?<p className="my-5">ไม่มีรูป</p>:<img src={this.readImage(checkslip.orderqr)} style={{width: "3cm"}}></img>}</td>
      {checkslip.Buy_status === 'Yes' ?
        "" :
        <>
          <button className='Yes btn btn-primary mx-2 my-5' onClick={() => this.submit('Yes',checkslip.OrderID)}>Submit</button>
          <button className='No btn btn-danger' onClick={() => this.submit('No',checkslip.OrderID)}>Reject</button>
        </>
      }
      <div>
      </div>
    </tr>
  ))}
        </tbody>
      </table>
      </div>
    );
}
}
export default Admin;