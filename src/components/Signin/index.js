import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./signin.scss";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useContext(GlobalContext).isLoggedIn;
  const [uemail, setUemail] = useState("");
  const [upwd, setUpwd] = useState("");
  const [isError, setIsError] = useState(false);
  const emailHandler = (evt) => {
    setUemail(evt.target.value);
  };
  const pwdHandler = (evt) => {

    setUpwd(evt.target.value);
  };
  const signInHandler = (evt) => {
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropogation();
    }
    let canUserArray = JSON.parse(localStorage.getItem("canUserList"));
    let recUserArray = JSON.parse(localStorage.getItem("recUserList"));
    let flag = 0;
    let currentUserDetails;
    canUserArray && canUserArray.forEach((user) => {
      if (user.email === uemail && user.pwd === upwd) {
        flag = 1;
        currentUserDetails = user;
        return;
      }
    });
    recUserArray && recUserArray.forEach((user) => {
      if (user.email === uemail && user.pwd === upwd) {
        flag = 1;
        currentUserDetails = user;
        return;
      }
    });
    if (flag) {
      localStorage.setItem("currentUser", JSON.stringify(currentUserDetails));
      localStorage.setItem("status", currentUserDetails.userstatus);
      // setIsError(false);
      setIsLoggedIn(true);
      navigate("../profile");
    }
    else if (!flag) {
      // setIsError(true);
      setIsLoggedIn(false);
      localStorage.setItem("status", "");
      // evt.preventDefault();
    }
  };
  return (
    <div className="sign-in-form">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={emailHandler} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={pwdHandler} required />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={signInHandler}>
          Sign In
        </Button>
        {/* {isError ? <Form.Text id="userAlreadyExists" muted>
          A user with this email id already exists
        </Form.Text> : <></>} */}

      </Form>
    </div>
  );
};

export default Signin;