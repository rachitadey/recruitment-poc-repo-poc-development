import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./signup.scss";

const Signup = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(GlobalContext).isLoggedIn;
  useEffect(() => {
    let rec = document.getElementById("status-recruiter");
    let can = document.getElementById("status-candidate");
    let currStatus = localStorage.getItem("status");
    if (currStatus === "recruiter") {
      rec.checked = true;
    }
    else if (currStatus === "candidate") {
      can.checked = true;
    }
  }, []);
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [uemail, setUemail] = useState("");
  const [upwd, setUpwd] = useState("");
  const nameHandler = (evt) => {
    setUname(evt.target.value);
  };
  const emailHandler = (evt) => {
    setUemail(evt.target.value);
  };
  const pwdHandler = (evt) => {
    setUpwd(evt.target.value);
  };
  const handleSignup = (evt) => {
    const form = evt.currentTarget;
    form.checkValidity();
    if (form.checkValidity() === false) {
      evt.prventDefault();
      evt.stopPropogation();
    }
    let recStatusCheck = document.getElementById("status-recruiter").checked;
    let canStatusCheck = document.getElementById("status-candidate").checked;
    let signupFormUserStatus;
    if (!recStatusCheck && !canStatusCheck) {
      console.log("ERR STATUS EMPTY");
    }
    if (recStatusCheck) {
      signupFormUserStatus = "recruiter";
    }
    if (canStatusCheck) {
      signupFormUserStatus = "candidate";
    }
    if (uname && uemail && upwd) {
      let signupFormUserData = {
        name: uname,
        email: uemail,
        pwd: upwd,
        userstatus: signupFormUserStatus,
        userdetails: {},
        userhasdetails: false
      };
      if (signupFormUserStatus === "recruiter") {
        let recUserListCopy = JSON.parse(localStorage.getItem("recUserList"));
        if (recUserListCopy) {
          let temparr = recUserListCopy;
          temparr.push(signupFormUserData);
          let temparrStr = JSON.stringify(temparr);
          localStorage.setItem("recUserList", temparrStr);
        }
        else {
          let temparr = [];
          temparr.push(signupFormUserData);
          let temparrStr = JSON.stringify(temparr);
          localStorage.setItem("recUserList", temparrStr);
        }
      }
      else if (signupFormUserStatus === "candidate") {
        let canUserListCopy = JSON.parse(localStorage.getItem("canUserList"));
        if (canUserListCopy) {
          let temparr = canUserListCopy;
          temparr.push(signupFormUserData);
          let temparrStr = JSON.stringify(temparr);
          localStorage.setItem("canUserList", temparrStr);
        }
        else {
          let temparr = [];
          temparr.push(signupFormUserData);
          let temparrStr = JSON.stringify(temparr);
          localStorage.setItem("canUserList", temparrStr);
        }
      }
      //NAVIGATE TO USER PROFILE
      localStorage.setItem("currentUser", JSON.stringify(signupFormUserData));
      setIsLoggedIn(true);
      navigate("../profile");
    }
    else {
      console.log("Something missing");
    }
  };
  return (
    <div className="sign-up-form">
      <Form>
        <div className="status-checkbox">
          <Form.Check
            inline
            label="I'm a Recruiter"
            name="status"
            type="radio"
            id="status-recruiter"
            value="recruiter"
            onChange={() => localStorage.setItem("status", "recruiter")}
            required
          />

          <Form.Check
            inline
            label="I'm looking for Job"
            name="status"
            type="radio"
            id="status-candidate"
            value="candidate"
            onChange={() => localStorage.setItem("status", "candidate")}
            required
          />
        </div>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Type your name" onChange={nameHandler} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={emailHandler} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={pwdHandler} required />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSignup}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Signup;