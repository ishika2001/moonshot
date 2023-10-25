import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import '../../CaseDetailContainer/Header/header.css'
import { useNavigate, useLocation } from 'react-router'
import {useSelector } from 'react-redux'
import { closeCase } from '../../services/Api'
import { AddNewJobModal } from '../../CasesDashboard/AddNewCasesModal/AddNewCaseModal'

export const Header = ({ isCloseCase, setIsCloseCase, caseDetails, renderEditData, setRenderEditData }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const caseDetailsData = useSelector((state) => state.cases.caseDetailsData)
  const authToken = useSelector((state) => { return state.verifys.Token });
  const isDetailRoute = location.pathname === '/detail'
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseCase = (id) => {
    closeCase(authToken, caseDetailsData.id, setIsCloseCase, isCloseCase)
  }
  const navigateButton = () => {
    if (!isDetailRoute)
      navigate('/detail')
    else
      navigate('/case')
  }
  return (
    <>
      <Container fluid className='box p-0'>
        <Row className='header-row'>
          <Col className='header-col1'>
            <svg onClick={navigateButton} className='arrow' width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.96333 8.32939C6.08637 8.32939 6.20941 8.32939 6.33246 8.32939C11.5993 8.32939 16.8655 8.32886 22.1323 8.33045C22.9176 8.33045 23.5246 8.62782 23.8582 9.35417C24.3132 10.3438 23.6159 11.5268 22.5124 11.6355C22.3226 11.6542 22.1307 11.6563 21.9393 11.6563C16.7272 11.6574 11.5156 11.6569 6.30347 11.6579C6.19027 11.6579 6.07707 11.6681 5.89005 11.6766C5.98958 11.7933 6.03879 11.861 6.09786 11.9185C7.8314 13.6041 9.56275 15.2913 11.3023 16.971C11.6764 17.3318 11.9667 17.7277 11.9952 18.2537C12.0329 18.955 11.6293 19.5695 10.9638 19.861C10.3387 20.1343 9.58135 20.0011 9.07386 19.5108C7.89647 18.3731 6.7251 17.23 5.55154 16.089C3.90058 14.4834 2.24961 12.8777 0.599735 11.271C-0.197586 10.4946 -0.203054 9.50978 0.591532 8.73653C3.38161 6.0203 6.1777 3.31207 8.95957 0.58998C9.75962 -0.192861 10.7746 -0.145965 11.4259 0.434904C12.1713 1.09891 12.2019 2.11782 11.4964 2.82552C10.7981 3.5263 10.0812 4.20895 9.3719 4.89853C8.28857 5.95209 7.20415 7.00458 6.12082 8.05814C6.05793 8.11942 5.99887 8.1855 5.93817 8.24892C5.94692 8.27556 5.95512 8.30221 5.96387 8.32885L5.96333 8.32939Z" fill="#5D7285" />
            </svg>
            <span className='cases'>Cases :</span>
            <span className='cse-text'>{caseDetailsData?.case_number}</span>
          </Col>
          <Col className='header-col2'>
            <Button className='share'>
              <div className='header-btn'>
                <div>
                  <img id='header-common' src='./upwardArrow.svg' alt='upwardArrow' style={{ paddingBottom: '6px' }} />
                </div>
                <span>Share</span>
              </div>
            </Button>
            {isDetailRoute && (
              <>
                <Button className='edit' disabled={!caseDetails.case_status} onClick={() => setShowEditModal(true)}>
                  <div className='header-btn'>
                    <div>
                      <img src='./edit.svg' alt='edit' id='header-common' style={{ paddingBottom: '6px' }} />
                    </div>
                    <span>Edit</span>
                  </div>
                </Button>
              </>
            )}
            <Button className='delete' disabled={!caseDetails.case_status} onClick={() => handleCloseCase(caseDetailsData.id)}>
              <div className='header-btn'>
                <div>
                  <img id='header-common' src='./cross.svg' alt='cross' style={{ paddingBottom: '6px' }} />
                </div>
                <span>Close</span>
              </div>
            </Button>
          </Col>
        </Row>
        <Row>
          <AddNewJobModal
            showEditModal={showEditModal}
            isCloseCase={isCloseCase}
            setIsCloseCase={setIsCloseCase}
            setShowEditModal={setShowEditModal}
            setRenderEditData={setRenderEditData}
            renderEditData={renderEditData}
            existingCaseData={caseDetailsData} 
          />
        </Row>
      </Container>
    </>
  )
}
