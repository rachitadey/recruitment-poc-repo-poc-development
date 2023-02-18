import React, { useState } from "react";
import "./signin.scss";
const Signin = () => {
    const [uname, setUname] = useState("");
    const [uemail, setUemail] = useState("");
    const [uaadhar, setUaadhar] = useState("");
    const [upan, setUpan] = useState("");
    const [udob, setUdob] = useState();
    const [upwd, setUpwd] = useState("");
    const nameHandler = (evt) => {
        setUname(evt.target.value);
    };
    const emailHandler = (evt) => {
        setUemail(evt.target.value);
    };
    const aadharHandler = (evt) => {
        setUaadhar(evt.target.value);
    };
    const panHandler = (evt) => {
        setUpan(evt.target.value);
    };
    const dobHandler = (evt) => {
        console.log(evt.target.value);
        console.log(window.location.pathname);
    };
    const pwdHandler = (evt) => {
        setUpwd(evt.target.value);
    };
    const handleSignup = () => {
    };

    return (
        <div className="signinpage">
            Hello this is signin page
            <div className="signupform">
                <div className="home-title">SIGNUP FORM</div>
                <input placeholder="Enter Name" onChange={nameHandler} type="text" value={uname} className="uname form-input" />
                <input placeholder="Enter Email" onChange={emailHandler} type="email" value={uemail} className="uname form-input" />
                <input placeholder="Enter Aadhar" onChange={aadharHandler} type="text" value={uaadhar} className="uname form-input" />
                <input placeholder="Enter Pan" onChange={panHandler} type="text" value={upan} className="uname form-input" />
                <input placeholder="Enter DOB" onChange={dobHandler} type="date" value={udob} className="uname form-input" />
                <input placeholder="Enter Password" onChange={pwdHandler} type="password" value={upwd} className="uname form-input" />
                <button onClick={handleSignup} className="signup-btn form-input">SIGNUP</button>
                <span id="signup-msg"></span>
            </div>
        </div>
    );
};
export default Signin;