import React, { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Image, Button, Col, Row, FormGroup } from "react-bootstrap";
// import myImage from "../assets/Image.png";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { emailGet } from "../../slices/loginSlice";
import '../CasesDashboard/Screen.css'
import { UserContext } from "../../App";
import { callLoginAPI } from "../services/Api";

export const LoginScreen = () => {
  const [emailError, seteEmailError] = useState("");
  const { email, setemail, ip } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const EmailHandler = (e) => {
    setemail(e.target.value);
    seteEmailError();
  };
  const SendOTP = (e) => {
    e.preventDefault();
    if (!email || email === "") {
      seteEmailError("Email is a required field.");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      seteEmailError("Invalid email entered.");
    } 
    else if (!/[A-Za-z0-9!@#$%&*_]@(gov)\.(sg)\b$/.test(email) && !/[A-Za-z0-9!@#$%&*_]@(gmail)\.(com)\b$/.test(email)) {
      seteEmailError("This is not a whitelisted public service email domain. Please log in with your official government or government-linked email address..");
    }
    else {
      navigate("/verify");
      callLoginAPI(false, dispatch, email, ip, setemail, emailGet);
    }
  };
  const clearEmail = () => {
    setemail("");
    seteEmailError("");
  };
  return (
    <>
      <Row className=" main-login-container">
        <Col className="col img-content">
          <Image
            className="img-responsive img"
            src={'../assets/Image.png'}
            alt="My pic"
            style={{ width: "85%" }}
          />
        </Col>
        <Col className=" container center-item input-part">
          <Row className="inner-input mx-sm-1">
            <Col>
              <div className="heading img1">
                <Image src={logo} alt="Logo" />
              </div>
            </Col>

            <Row className="heading paragraph mx-sm-1 log">
              <span>Only available for authorised users with an email from .gov.sg or other whitelisted email address</span>
            </Row>
            <Row className={`form-group form-inline mx-sm-1 mb-${emailError ? 0 : 2} login`}>
              <FormGroup>
                <div className="input-container" id={emailError && "OtpError"}>
                  <input type="text"
                    className="login-input"
                    placeholder="Enter email"
                    value={email || ""}
                    onChange={EmailHandler} />
                  <div className="cross-btn">
                    <img src="./clear.svg" alt="clear" onClick={clearEmail} />
                  </div>
                </div>
              </FormGroup>
              <div className="emailError mt-1"> {emailError}</div>
            </Row>
            <Row >
              <Col className="submit-div">
                <Button
                  className="login-submit"
                  variant="dark"
                  type="submit"
                  size="lg"
                  onClick={SendOTP}>
                  Sign In
                </Button>
              </Col>
            </Row>
            <Row style={{ textAlign: "center" }}><a rel="noopener"
              className="chakra-link css-1qya5dw" href="https://www.google.com">Have a question?
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" focusable="false" className="chakra-icon css-1mlwd8c" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z">
              </path>
                <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
              </svg>
            </a>
            </Row>
          </Row>
        </Col>
      </Row>
    </>
  );
};
