import React from 'react'
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { verifyGet } from "../../../slices/verifySlice";
import { emailGet } from "../../../slices/loginSlice";
import { identityGet } from '../../../slices/identitySlice';
import { verifyPinGet } from '../../../slices/pinSlice';
import { getSchedule } from '../../../slices/identitySlice';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router'
import { useContext } from 'react';
import { UserContext } from '../../../App';

export const MainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isDashboardForAllJobs = location.pathname === '/downloadJobs'
  const {setTableDataToShowAllJobs} = useContext(UserContext);
  const logoutHandler = () => {
    dispatch(verifyGet("",""))
    dispatch(emailGet(""));
    dispatch(verifyPinGet("",""))
    dispatch(identityGet(""));
    dispatch(getSchedule(""));
    setTableDataToShowAllJobs([]);
    if(isDashboardForAllJobs)
    {
      navigate('/verifyIdentity')
    }else{
      navigate('/')
    }
  };
  return (
    <>
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        className="justify-content-end nav-bar  navbar-expand-lg navbar-light "
      >
        <Nav.Item className="mr-auto" gap={3}>
          <img src='./logo.svg' alt='my_image' />
          <img src='./CEP.svg' alt='my title' style={{ marginLeft: '8px' }} />
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: "white" }}>FAQ</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: "white" }} onClick={logoutHandler}>
            Logout <FontAwesomeIcon icon={faPowerOff} />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}
