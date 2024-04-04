import React, { useState, useContext } from "react";
import { Image, Button, Row, Col, FormGroup} from "react-bootstrap";
// import myImage from "";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { verifyGet } from "../../slices/verifySlice";
import { TailSpin } from "react-loader-spinner";
import { UserContext } from "../../App";
import { emailGet } from "../../slices/loginSlice";
import { callLoginAPI, callVerifiyAPI } from "../services/Api";
import { attempCount } from "../../slices/checkVerify";
import { useLocation } from 'react-router'

export const VerifyScreen = () => {
  const location = useLocation();
  const isVerifyScreen = location.pathname !== '/verify';
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const { ip, setemail, setTokenFromVerify } = useContext(UserContext);
  const dispatch = useDispatch();
  const emails = useSelector((state) => { return state.emails.email });
  const count =useSelector(state=>state.checkedVerifys.count)
  const loadingCondition = useSelector((state) => { return state.emails.isLoadingCondition });



  
  const handlepasswordchange = (e) => {
   setpasswordError ("");
    setOTP(e.target.value);
  };
  const handleResend = () => {
    dispatch(attempCount(3))
    setpasswordError ("");
    setOTP("");
    callLoginAPI(false,dispatch, emails, ip, setemail, emailGet);
  }

  const VerifyOTP = (e) => {
    e.preventDefault();

    if (OTP === "") {
      setpasswordError("Enter OTP");
    }
    else if (OTP.length < 6) {
      setpasswordError(" Enter correct OTP");
    }
    else {
      callVerifiyAPI(isVerifyScreen,dispatch, emails, OTP, verifyGet, navigate, setpasswordError, setTokenFromVerify,count,setOTP);
    }
  };
  const clearOTP = () => {
    setOTP("");
    setpasswordError("")
  };

  return (
    <>
      <div
        style={{
          width: "3rem",
          height: "3rem",
          Zindex: "999",
          position: "absolute",
          top: "44%",
          left: "51%",
        }}
      >
      </div>
      <Row className="row main-login-container">
        <Row>
          {loadingCondition && (
            <TailSpin
              height="50"
              width="100"
              radius="5"
              color="black"
              ariaLabel="loading"
              wrapperStyle={{ position: "absolute", top: "60%", left: "50%" }}
            />
          )}
        </Row>
        <Col className="img-content">
          <Image
            className="img"
            src={'../assets/Image.png'}
            alt="My pic"
            style={{ width: "85%" }}
          />
        </Col>
        <Col className="col container center-item input-part">

          <Row className="inner-input">
            <Col>
              <div className="heading img1">
                <Image src={logo} alt="Logo" />
              </div>
            </Col>
            <Row className="heading-verify paragraph log">
              <span>
              Only available for authorised users with an email from .gov.sg or other whitelisted email address
              </span>
            </Row>
            <Row className="heading-verify paragraph">
              <span>
                One-time password:
              </span>
            </Row>
            <Row className={`form-group form-inline mx-sm-1 mb-${passwordError ? 0 : 2} login`}>
              <FormGroup>
                <div className="input-container" id={passwordError && "OtpError"}>
                  <input
                    type="password"
                    className="login-input "
                    placeholder="Enter OTP"
                    value={OTP}
                    onChange={handlepasswordchange}
                    maxLength={6}
                  />
                  <div className="cross-btn">
                    <img src="./clear.svg" alt="clear" onClick={clearOTP} />
                  </div>
                </div>
              </FormGroup>
              <div className="emailError mt-1"> {passwordError}</div>
            </Row>
            <Row>
              <Col className="submit-div">
                <Button
                  className="login-submit"
                  variant="dark"
                  type="submit"
                  onClick={VerifyOTP}
                  size="lg"
                  disabled={count===0}
                  >
                  Verify
                </Button>
              </Col>
            </Row>
            <Row className="resend" onClick={handleResend}>
              Resend Verification Code
            </Row>
            <Row>{count<3 && <span className="alert-msg">OTP hash varification failed, only {count} attempts remaining</span>}</Row>
          </Row>
        </Col>
      </Row>
    </>
  );
};
