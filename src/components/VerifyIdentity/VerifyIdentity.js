import React, { useContext, useState } from "react";
import "./verify-identity.css";
import { useNavigate } from "react-router-dom";
import { identityGet } from "../../slices/identitySlice";
import { getSchedule } from "../../slices/identitySlice";
import { UserContext } from "../../App";
import { useDispatch } from "react-redux";
import { callLoginAPItoVerifyIdentity } from "../services/Api";
import { useLocation } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { verifyPinGet } from "../../slices/pinSlice";

export const VerifyIdentity = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const isDownloadJob = searchParams.get("schedule");
  const formattedIsDownloadJob = isDownloadJob
    ? isDownloadJob.replace(/^"(.*)"$/, "$1")
    : null;

  const [emailError, seteEmailError] = useState("");
  const { identity, setIdentity, ip_, schedule, setSchedule } =
    useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setSchedule(formattedIsDownloadJob);
    dispatch(verifyPinGet("", ""));
    dispatch(identityGet(""));
    dispatch(getSchedule(""));
  }, []);
  const EmailHandler = (e) => {
    setIdentity(e.target.value);
    seteEmailError();
  };
  const SendPIN = (e) => {
    e.preventDefault();
    if (!identity || identity === "") {
      seteEmailError("Email is a required field.");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(identity)) {
      seteEmailError("Invalid email entered.");
    } else {
      navigate("/verifyPin");
      callLoginAPItoVerifyIdentity(
        true,
        dispatch,
        identity,
        ip_,
        setIdentity,
        identityGet,
        getSchedule,
        schedule,
        setSchedule
      );
    }
  };
  const clearEmail = () => {
    setIdentity("");
    seteEmailError("");
  };
  return (
    <Container>
      <Row>
        <Col className="col-style">
          <Card className="card-style">
            <Card.Body>
              <Card.Title className="title">Verify Your Identity</Card.Title>
              <hr />
              <Card.Text className="mt-4">
                You've received a secured link to:
              </Card.Text>
              <Card.Text>
                To open this secure link, we'll need you to enter the email that
                item was shared to.
              </Card.Text>
              <div className={`input-box mt-4 ${emailError ? 'mb-0' : 'mb-4'}`}>
                <input
                  type="text"
                  className="login-input-identity border"
                  placeholder="Enter email"
                  value={identity || ""}
                  onChange={EmailHandler}
                />
                <div className="info-btn">
                  <img src="./clear.svg" alt="clear" onClick={clearEmail} />
                </div>
              </div>
              <div className="emailError mt-1 mb-3"> {emailError}</div>
              <Button
                variant="primary"
                className="next-btn mb-4"
                onClick={SendPIN}
              >
                Next
              </Button>
              <Card.Text>
                By clicking Next you allow CEP to use your email address in
                accordance with their privacy statement. CEP has not provided
                links to their terms for you to review
              </Card.Text>
            </Card.Body>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
