import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import google from '../../imgs/google.png'
import { useUserAuth } from "../../Context/UserAuthContext";
import facebook from '../../imgs/facebook.png'
import './Login.css';
import { Alert } from "react-bootstrap";
import MyFooter from "../Footer/MyFooter";
import MyCopyright from "../Copyright/MyCopyright";
import axios from 'axios';


const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const { fbLogIn, facebookSignIn } = useUserAuth();
    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        const data = {
            Email: email,
            PhoneNo: password


        };
        if (email != "" && password!="") {
        const url = 'https://localhost:7080/api/Test/Login'
        axios.post(url, data).then((result) => {
           
            if(result.data=="111"){
                localStorage.setItem('data', JSON.stringify(data)); // Save as JSON
                alert("Log in Successfully....");
                navigate("/");
                
            }
            else if(result.data=="333"){
                localStorage.setItem('data', JSON.stringify(data)); // Save as JSON
                alert("Admin Logged Successfully....");
                navigate("/admin");
            }
            else{
                alert("No Data found");
                localStorage.setItem("data",null);
                navigate("/login");
            }
           

            
        }).catch((ex) => {

            alert(ex.message);
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {ex.message}
            </Alert>
        })
    }
    else
    {
        <Alert variant="danger">Please fill the input fields</Alert> 
    }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleFacebookSignIn = async (e) => {
        e.preventDefault();
        try {
            await facebookSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };


    return (<>
        <div className='login-form-main'>

            <div className='login-form-login-div'>
                <h1 className='login-form-login-heading'>Log In</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <center>

                    <div>
                        <TextField type="email" id="standard-basic" label="Email" variant="standard" className="login-form-input-fields " onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <TextField type="password" id="standard-basic" label="Password" variant="standard" className="login-form-input-fields " onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <Button variant="contained" className="login-form-submit-btn" onClick={(e) => handleSubmit(e)}>Log In</Button>
                    <div className='design'> <hr/> <b>OR</b> </div>
                    <center>
                        <Button variant="contained" className=" google" onClick={(e) => handleGoogleSignIn(e)}><img src={google} />Log In with Google+</Button>
                        <br />   <Button variant="contained" className=" facebook" onClick={(e) => handleFacebookSignIn(e)}><img src={facebook} />Log In with Facebook</Button>
                    </center>
                </center>
            </div>


        </div>
        <MyFooter/>
        <MyCopyright/>
        </>
    )
}

export default Login