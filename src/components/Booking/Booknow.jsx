import React, { useState ,useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import "react-datepicker/dist/react-datepicker";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import hotel1 from '../../imgs/hotel1.jpg';
import './Booknow.css'
import { ref, set } from "firebase/database";
import { db } from "../../config/firebase-config";
import { TextField } from "@mui/material";
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';




export default function Booknow() {
debugger;
//alert start
const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//alert end
//payment start
const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [amount, setAmount] = useState('');
    const navigate1 = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically handle payment processing
      // For this example, we'll just navigate to the receipt page
      debugger;


     
  
      const url = 'https://localhost:7080/api/Test/ConfirmPayment'
      axios.put(url).then((result) => {
        debugger;
        if (result.data == 'Payment Successfull.') {
          debugger;
          alert("Payment Successfull.");
          navigate("/");
          handleClose();

        }
  
      }).catch((ex) => {
  
        alert(ex.message);
        handleClose();
      })

    };
//payment end
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

  const { roomType } = useParams();
  console.log(roomType)
  var roomsDetails = {}
  if (roomType == "1") {//Single room

    roomsDetails = {
      Adult: 1,
      Child:0,
      breakfast: "included",
      price: 2000,
      pets: "allowed",
      roomtype: "SINGLE ROOM",
      size: "250 sqft"
    }

  }

  else if (roomType == "2") {
    roomsDetails = {//DOUBLE ROOM
      Adult: 2,
      Child:2,
      breakfast: "included",
      price: 4500,
      pets: "allowed",
      roomtype: "DOUBLE ROOM",
      size: "500 sqft"

    }
  }
  else if (roomType == "3") {//FAMILY ROOM
    roomsDetails = {
      Adult: 4,
      Child:2,
      breakfast: "not included",
      price: 5500,
      pets: "not allowed",
      roomtype: "FAMILY ROOM",
      size: "750 sqft"

    }
  }

  else if (roomType == "4") {//PRESIDENTIAL ROOM
    roomsDetails = {
      Adult: 4,
      Child:2,
      breakfast: "included",
      price: 9500,
      pets: "not allowed",
      roomtype: "PRESIDENTIAL ROOM",
      size: "1000 sqft"

    }
  }

  const [fullName, setFullName] = useState("");
  const [value, setValue] = useState(0);
  const [cnic, setCnic] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
   const [Phone, setPhone] = useState("");
  const [persons, setPersons] = useState("");
  const [child, setChild] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  
  function handleName(name) {
    setFullName(name);
    console.log(fullName)
  }
  function handlepersons(val) {
    setPersons(val.target.value);
    console.log(persons)
  }
  function handlechild(val) {
    setChild(val.target.value);
    console.log(child)
  }
  function handleemail(val) {
    debugger;
    setEmail(val);
    console.log(email)

  }
  function handlephone(val) {
    debugger;
    setPhone(val);
    console.log(Phone)

  }
  function handleaddress(val) {
    setAddress(val.target.value);
    console.log(address)

  }
  function handleCnic(val) {
    setCnic(val.target.value);
    console.log(cnic)

  }
  function handleChangeStart(date) {
    setStartDate(date);
  }


  function handleChangeEnd(date) {
    setEndDate(date);
  }

  function calculateDaysLeft(startDate, endDate) {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);
    return endDate.diff(startDate, "days");
  }
 
  var daysLeft = calculateDaysLeft(startDate, endDate);

  

  const bookdate = new Date(); 
  const formatedbookdate = bookdate.toISOString();

  const formattedDate = startDate
    .toLocaleDateString("en-GB", {
      year: "numeric",  
      month: "short",
      day: "numeric",
      
    })
    .replace(/ /g, "-");
    const dateObject = new Date(formattedDate);
    const newstartdate = dateObject.toISOString()

  const formattedEndDate = endDate
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .replace(/ /g, "-");

    const dateObject2 = new Date(formattedEndDate);
    const newenddate = dateObject2.toISOString()

    function writeToDatabase() {
     
   
      const userdetails = localStorage.getItem("data");
      const details = JSON.parse(userdetails);
      console.log(details);
      if (persons > roomsDetails.Adult) {
        return alert("Please check the capacity of Room.");
      }
      if (daysLeft === 0) {
        return alert("Please select the dates.");
      }
      if (
        fullName &&
      
        email &&
        Phone &&
        persons <= roomsDetails.Adult &&
        child <=  roomsDetails.Child &&
        startDate &&
        endDate
      ) {
        
     
        const url= 'https://localhost:7080/api/Test/RoomBooking';
     const data={
      "user_ID": 0,
       "room_ID": roomType,
       "adlt_cnt":persons,
       "chld_cnt":child,
       "booking_dt": formatedbookdate,
       "check_in": newstartdate,
       "check_out": newenddate,
       "no_of_days": daysLeft,
       "booking_status": 0,
       "amount": daysLeft * roomsDetails.price,
       "transaction_id":0,
       "review":details.PhoneNo
     }

     axios.post(url,data)
        .then(() => {
          alert("Booked Succesfully! ");
          handleClickOpen();
          //navigate("/");
        });
        setFullName("");
        setAddress("");
        setPhone("");
        setEmail("");
        // setValue(0);
        setPersons(0);
        setChild(0);
        
        


      } else {
        alert("Please Fill all fields");
      }
    }

 

  return (
    <div className="container my-5">
      <div>
            <h1 className="display-4 booking-hd">BOOKING</h1>
          </div>
      

      <div>
        {/* new page */}

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>

            <Grid size={{ xs: 6, md: 8 }}>
              <Item>
                <div className="col-md-6 col-12 my-auto">
                  <img
                    src={hotel1}
                    className="img-fluid"
                    alt="selected room"
                  />
                </div>
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Item><div className="room_dtl">
                <h1 className="h1dtl">Rooms Details</h1>
                <table className="">
                  <thead className="thead-light">
                    <tr>
                      <th className="dark-shade">Room Type</th>
                      <td>{roomsDetails.roomtype}</td>
                    </tr>
                    <tr>
                      <th className="dark-shade">Max Adults</th>
                      <td>{roomsDetails.Adult + " persons"}</td>
                    </tr>
                    <tr>
                      <th className="dark-shade">Max children</th>
                      <td>{roomsDetails.Child + " persons"}</td>
                    </tr>
                    <tr>
                      <th className="dark-shade">Size</th>
                      <td>{roomsDetails.size}</td>
                    </tr>
                    <tr>
                      <th className="dark-shade">Breakfast</th>
                      <td>{roomsDetails.breakfast}</td>
                    </tr>
                    <tr>
                      <th className="dark-shade">Pets</th>
                      <td>{roomsDetails.pets}</td>
                    </tr>
                  </thead>
                </table>
              </div>
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <Item><div className="col-md-6 col-12">
                <div >
                  <label htmlFor="Fromdate" className="datename">
                    From Date{" "}
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleChangeStart}
                    minDate={moment().toDate()}
                    className="form-control datedtl"
                    required
                  />
                </div>
              </div>
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <Item><div >
                <label htmlFor="Todate" className="datename">
                  To Date{" "}
                </label>
                <DatePicker
                  selected={endDate}
                  minDate={moment().toDate()}
                  onChange={handleChangeEnd}
                  className="form-control datedtl"
                />
              </div></Item>
            </Grid>
{/* full name */}
            <Grid size={{ xs: 6, md: 12 }}>
              <Item><div className="">
                <h6 className="datename1">
                  Number of days : {daysLeft}
                </h6>
                <mark className="datename1">Please make sure Checkin time is from 9 am to 12 pm</mark>
                <h6 className="datename1">
                  Price per day :{" "}
                  <span className="">Rs {roomsDetails.price}</span>
                </h6>
                <h6 className="datename1">
                  Total Price to be paid :{" "}
                  <span className="text-primary">Rs {roomsDetails.price * daysLeft}</span>
                </h6>
              </div>

              </Item>

            </Grid>
            <Grid size={{ xs: 2, md: 4 }}>
              <Item>
                <label htmlFor="forName" className="datename">Name   </label>
                <input
                  type="text"
                  className="form-control"
                   value={fullName}
                  id="forName"
                  onChange={(e) => handleName(e.target.value)}
                  //  onChange={handleName}
                  placeholder="Full name"
                  required
                />
              </Item>
            </Grid>
            <Grid size={{ xs: 2, md: 4 }}>
              <Item>
                <label htmlFor="persons" className="datename">Adult Count  </label>
                <input
                  type="number"
                  value={persons}
                  className="form-control"
                  onChange={handlepersons}
                  id="persons"
                  placeholder="No. of persons"
                  required
                />
              </Item>
            </Grid>
            <Grid size={{ xs: 2, md: 4 }}>
              <Item>
                <label htmlFor="persons" className="datename">Child Count   </label>
                <input
                  type="number"
                  value={child}
                  className="form-control"
                  onChange={handlechild}
                  id="child"
                  placeholder="No. of children"
                  required
                />
              </Item>
            </Grid>
            
            <Grid size={{ xs: 6, md: 6 }}>
              <Item>

                
                <label htmlFor="exampleInputEmail1" className="datename">Contact No   </label>
                <input
                  
                  className="phoneInput"
                  value={Phone}
                  id="number"
                  onChange={(e) => handlephone(e.target.value)}
                  placeholder="Enter phone number"
                  required />
                  <div>
                  <span className="mailtxt">*Enter the same phone number through which you have logged in.</span>
                    </div>
                 
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <Item>
                
                <label htmlFor="exampleInputEmail1" className="datename">Email  </label>
                <input
                  type="email"
                  className="form-control"
                   value={email}
                  // onChange={handleemail}
                  onChange={(e) => handleemail(e.target.value)}
                  id="exampleInputEmail1new"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  required /><div><span className="mailtxt">*Enter the same email through which you have logged in.</span>
                    </div> 

              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 12 }}>
              <br></br><br>
              </br>

              <center>
                <button onClick={writeToDatabase}
                  className="btn btn-block btn-outline-primary confirm-booking-btn"
                >
                  Confirm Booking
                </button>
              </center>
              

            </Grid>
            <Grid>
            <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
            <div className="payment-container">
        <h2>Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber" className=".labelpaynow">Card Number</label>
            <input className="inputpaynow"
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv" className=".labelpaynow">CVV</label>
            <input className="inputpaynow"
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate" className=".labelpaynow">Expiry Date (MM/YY)</label>
            <input className="inputpaynow"
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount" className=".labelpaynow">Payment Amount</label>
            <input className="inputpaynow"
              type=""
              id="amount"
              value={daysLeft * roomsDetails.price}
          
              required
            />
          </div>
          <button className="buttonpaynow" type="submit" onClick={(e) => handleSubmit(e)}>Pay Now</button>
        </form>
      </div>
            </div>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </Dialog>
    </React.Fragment>
            </Grid>

          </Grid>
    </Box>
      </div>
    </div>
    
  );
}
