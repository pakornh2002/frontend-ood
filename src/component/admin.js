import "./admin.css";
import { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
    const [checkslip, setSlip] = useState([]);
    useEffect(() => {
      fetch("http://localhost:3001/allorder").then(res => res.json()).then(
          (result) => {
            setSlip(result);
          } 
        )
    }, [])
    return(
        <div>
    <table className="table">
    <thead>
      <h2>Update Buy Status</h2>
      <tr>
        <th>Student ID</th>
        <th>Course ID</th>
        <th>Order ID</th>
        <th>Price</th>
        <th>Datetime</th>
        <th>Payment Status</th>
        <th>Update Payment Status</th>
      </tr>
    </thead>
    <tbody>
          {checkslip.map(checkslip => (
            <tr key={checkslip.Student_buyID}>
              <td>{checkslip.Student_buyID}</td>
              <td>{checkslip.Course_buyID}</td>
              <td>{checkslip.OrderID}</td>
              <td>{checkslip.Total_price}</td>
              <td>{checkslip.Buy_date}</td>
              <td>{checkslip.Buy_status}</td>
              <div >
                <button className='Yes'>Yes</button>
                <button className='No'>No</button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
}
export default Admin;