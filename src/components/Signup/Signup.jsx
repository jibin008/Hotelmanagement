import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Signup.css';
// import { authentication } from '../../config/firebase-config';
import { Link } from 'react-router-dom';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getDatabase } from "firebase/database";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from 'react-router';
import * as firebase from '../../config/firebase-config'
import { useUserAuth } from "../../Context/UserAuthContext";
import { Alert } from "react-bootstrap";
import { useState } from 'react'
import MyFooter from "../Footer/MyFooter";
import axios from 'axios';
import MyCopyright from "../Copyright/MyCopyright";

const Signup = () => {

    const [userData, setUserData] = React.useState({
        fullname: "",
        phonenumber: "",
        email: "",
        place: ""
    })

    let name, value;

    function postUserData(event) {
        name = event.target.name
        value = event.target.value
        setUserData({ ...userData, [name]: value })
    }

    const db = getDatabase();
    let navigate = useNavigate()
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();



    
    const handleSubmit = async(e) => {
        debugger;
        if (userData.phonenumber == "" || userData.place == "" || userData.email == "" || userData.fullname == "") {
            alert("Please fill the input fields")
        }

        const data = {
            Name: userData.fullname,
            PhoneNo:userData.phonenumber ,
            Email: userData.email,
            Address: userData.place,
            IsActive: 1

        };
       
        const url = 'https://localhost:7080/api/Test/Registration'
        axios.post(url, data).then((result) => {

           localStorage.setItem('data', JSON.stringify(data)); // Save as JSON
            alert(result.data);

            navigate("/");
           
        
        }).catch((error) => {

            alert(error);
            
        })
    
   
    }



    return (
        <>
            <div className='signup-form-main'>

                <div className='signup-form-signup-div'>
                    <h1 className='signup-form-signup-heading'>Sign Up</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <center>
                        <div>
                            <TextField type="name" id="standard-basic" label="Fullname" variant="standard" className="signup-form-input-fields" name="fullname" value={userData.fullname} onChange={(event) => postUserData(event)} />
                        </div>
                        <div>
                            <TextField typer="phonenumber" id="standard-basic" label="phonenumber" variant="standard" className="signup-form-input-fields" name="phonenumber" value={userData.phonenumber} onChange={(event) => postUserData(event)} />
                        </div>
                        <div>
                            <TextField type="email" id="standard-basic" label="Email" variant="standard" className="signup-form-input-fields " name="email" value={userData.email} onChange={(event) => postUserData(event)} />
                        </div>
                        <div>
                            <TextField type="place" id="standard-basic" label="Place" variant="standard" className="signup-form-input-fields " name="place" value={userData.place} onChange={(event) => postUserData(event)} />
                        </div>
                        {/* <div>
                        <TextField type="password" id="standard-basic" label="Confirm Password" variant="standard" className="signup-form-input-fields " name="cpassword" value={userData.password} onChange={(event) => postUserData(event)} />
                    </div> */}
                        <Button variant="contained" className="signup-form-submit-btn" onClick={(e) => handleSubmit(e)}>Sign Up</Button>
                    </center>
                </div>

            </div>
            <MyFooter />
            <MyCopyright/>
        </>
    )
}

export default Signup