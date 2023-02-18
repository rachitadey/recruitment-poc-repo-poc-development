import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../App";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
//const imagePath = require("../../assets/images/person.png");

const Homepage = () => {
  const [currentPath, setCurrentPath] = useContext(GlobalContext).currentPath;
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  });
  const navigate = useNavigate();
  const recruiterHandler = () => {
    localStorage.setItem("status", "recruiter");
    setCurrentPath("/signin");
    navigate("../signin");
  };
  const candidateHandler = () => {
    localStorage.setItem("status", "candidate");
    setCurrentPath("/signin");
    navigate("../signin");
  };
  return (
    <div className="homepage row">
      <div className="col-xl-6 col-lg-6 col-md-12 banner-left">
        <div className="banner-text">
          Find the job that fits your life
        </div>
        <div className="banner-actions">
          <div className="recruiter-action" onClick={recruiterHandler}>
            I'm a Recruiter
          </div>
          <div className="candidate-action" onClick={candidateHandler}>
            I'm looking for Job
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 banner-right">
        <div className="banner-right-content">
          <div className="img-bg-circle-area">
            <div className="img-bg-circle1 rotate-center"></div>
            <div className="img-bg-circle2 rotate-center-reverse"></div>
            <div className="img-bg-circle3"></div>
          </div>
          <div className="user-img">
            {/* <img src={imagePath} alt="user" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;