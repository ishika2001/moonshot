import React, { useContext, useState } from "react";
import "./verify-identity.css";
import { verifyPinGet } from "../../slices/pinSlice";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { callVerifiyAPItoVerifyPIN } from "../services/Api";
import { useLocation } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export const VerifyPin = () => {
  const location = useLocation();
  const isVerifyPin = location.pathname === "/verifyPin";
  const navigate = useNavigate();
  const [passwordError, setpasswordError] = useState("");
  const { setTokenFromVerifyPin } = useContext(UserContext);
  const dispatch = useDispatch();
  const [PIN, setPIN] = useState("");
  const identity = useSelector((state) => {
    return state.identity.email;
  });
  const count = useSelector((state) => state.checkedVerifys.count);
  const VerifyPIN = (e) => {
    e.preventDefault();

    if (PIN === "") {
      setpasswordError("Enter PIN");
    } else if (PIN.length < 4 || PIN.length > 4) {
      setpasswordError("Enter correct PIN");
    } else {
      callVerifiyAPItoVerifyPIN(
        isVerifyPin,
        dispatch,
        identity,
        PIN,
        verifyPinGet,
        navigate,
        setpasswordError,
        setTokenFromVerifyPin,
        count,
        setPIN
      );
    }
  };
  const handlepasswordchange = (e) => {
    setpasswordError("");
    setPIN(e.target.value);
  };
  const clearPIN = () => {
    setPIN("");
    setpasswordError("");
  };
  return (
    <Container>
      <Row>
        <Col className="col-style">
          <Card className="card-style">
            <Card.Body>
              <Card.Title className="title">Verify Your PIN</Card.Title>
              <hr />
              <Card.Text className="mt-4">
                You've received a secured PIN to:
              </Card.Text>
              <Card.Text>
                To open this secure link, we'll need you to enter the PIN that
                item was shared to.
              </Card.Text>
              <div
                className={`input-box mt-4 ${passwordError ? "mb-0" : "mb-4"}`}
              >
                <input
                  type="password"
                  className="login-input-identity border"
                  placeholder="Enter PIN"
                  value={PIN}
                  onChange={handlepasswordchange}
                />
                 <div className="info-btn">
                  <img src="./clear.svg" alt="clear" onClick={clearPIN} />
                </div>
              </div>
              <div className="emailError mt-1 mb-3"> {passwordError}</div>
              <Button
                variant="primary"
                className="next-btn mb-4"
                onClick={VerifyPIN}
              >
                Verify PIN
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
