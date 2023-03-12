import qr from './logo/qr_code.svg';
import './App.css';
import { Component } from 'react';
import { FiShoppingCart, FiUser } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Buffer } from 'buffer';

class App extends Component {
  localStorage = "";
  state = {};
  itembuy = ""
  constructor() {
    super();
    this.state = {
      data:"",
      userInfo: 
        { studentID: "Stu0000003", studentFname: "Nawiya" , studentLname: "Sawangsena",studentEmail: "nawiya@gmail.com", studentPhone: "0634578961"},
        userBuy:"",
        total_price:0,
        image:''
    }
    this.onImageChange = this.onImageChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentDidMount() {
    const itembuy = localStorage.getItem('data');
    this.setState({ itembuy });

      const stuid=  this.state.userInfo.studentID
    
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };
  fetch('http://localhost:3001/buycourse?id='+stuid, requestOptions)
      .then(response => response.json())
      .then(data => {

          this.setState({ userBuy: data }, function () {
              console.log(this.state.userBuy)
         const  totalPrice = [...this.state.userBuy].reduce((sum, item) => sum + item.totalprice, 0);
            this.setState({
              total_price:totalPrice
            })

          });
      })
      .catch(error => {
          console.error('There was an error!', error);
          alert('เกิดข้อผิดพลาดในการดึงข้อมูล');
      });

    this.itembuy = localStorage.getItem('data')
    this.itembuy = JSON.parse(itembuy)
    // console.log(this.itembuy);
    this.setState({
      data:itembuy
    })
    console.log(this.state.userInfo);
  }

  readImage(img) {
    var buffer = new Buffer(img, "base64");
    return buffer;
  }

  onImageChange(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      this.setState({ image: reader.result });
      console.log(this.state.image);
    });
    reader.readAsDataURL(file);

  }

  submit(){
    const raw = JSON.stringify({
      "image":this.state.image,
      "orderid":this.state.userBuy[0].orderid
    })
    console.log(this.state.userBuy);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:raw
  };
 
  fetch('http://localhost:3001/insertqr', requestOptions)
      .then(response => response)
      .then(data => {
        alert('upload complete')
      })
      // .catch(error => {
      //     console.error('There was an error!', error.toString());
      //     alert('เกิดข้อผิดพลาดในการเพิอ่้มข้อมูล');
      // });

    
  }

  render() {
    return (<div className='header'>
      <div className='container'>
        <div className='header-buay'>
          <div>
              <h2 className='home'>Home</h2>
          </div>
          <ul className='menu'>
            <li className='menu-link'>
              <a href='#'>คอร์สเรียน</a>
            </li>
            <li className='menu-link'>
              <a href='#'>คำถามที่พบบ่อย</a>
            </li>
            <li className='menu-link'>
              <a href='#'>ติดต่อเรา</a>
            </li>
            <li className='menu-link'>
              <a href='#'><FiShoppingCart /></a>
            </li>
            <li className='menu-link'>
              <a href='#'><FiUser /></a>
            </li>
            <li className='menu-link'>
              <a href='#'>ออกจากระบบ</a>
            </li>
          </ul>
      
        </div>
        <div className = 'payment-menu'>
            <h2>Payment Page</h2>
          </div>
        <div className='row'>

          <div className='col-6 qr-image'>
            <img src={qr} alt='QR code' />
          </div>
          <div className='col-6 paymentdetail'>
            <div className='header_id'>
              {this.state.userInfo.studentID}
             </div>
            {Array.isArray(this.state.userBuy) && this.state.userBuy.map((item, index) => {
              const isFirstItem = index === 0 || item.orderid !== this.state.userBuy[index - 1].orderid;
              return (
                <div key={item.stuid}>
                    {isFirstItem && <p className='orderid_head'>OrderID: {item.orderid}</p>}
                    <p>Course name: {item.coursename}</p>
                    <p>Course Price: {item.totalprice} บาท</p>
                </div>
            )
            }


)}
<div className = 'total'>
Total price: {this.state.total_price} บาท
</div>

<form>
  <input className = 'input' type="file" onChange={this.onImageChange}></input>
  <button className = 'button' type="submit" onClick={this.submit}>Submit</button>
</form>
<img src={this.state.image}></img>
          </div>
        </div>
      </div>

    </div>
    )
  }
  };

export default App;
