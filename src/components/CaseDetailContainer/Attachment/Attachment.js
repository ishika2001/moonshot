import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './attachment.css'
import {  useSelector } from 'react-redux'
import { addAttachment, getAttachment } from '../../services/Api'
import jpgIcon from '../../assets/JPG.png'
import pngIcon from '../../assets/PNG.png'
import zipIcon from '../../assets/ZIP.png'
import pdfIcon from '../../assets/PDF.png'
import unknownIcon from '../../assets/UNKNOWN.png'

export const Attachment = ({ setIsOpenPreview, setPreviewUrl, caseDetails }) => {
  const [attachFiles, setAttachFiles] = useState([])
  const [isAttach, setIsAttach] = useState(false);
  const fileIcon = {
    png: pngIcon,
    zip: zipIcon,
    pdf: pdfIcon,
    jpg: jpgIcon,
    unknown: unknownIcon,
  }

  const caseDetailsData = useSelector((state) => state.cases.caseDetailsData)
  const authToken = useSelector((state) => { return state.verifys.Token; });

  const convertToBase64 = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      addAttachment(authToken, caseDetailsData.id, reader.result, isAttach, setIsAttach)
    }
  }
  const selectFile = (event) => {
    convertToBase64(event.target.files[0])
  }
  useEffect(() => {
    getAttachment(authToken, caseDetailsData.id, setAttachFiles)
  }, [isAttach])

  const handleShowPreview = (event, url) => {
    setPreviewUrl({ url: url[Object.keys(url)[0]], fileType: Object.keys(url) })
    setIsOpenPreview(true)
  }
  return (
    <>
      <Container fluid className='attachment-box p-0'>
        <Row className='first-row p-0'>
          <Col className='col-center-css'>
            <img src='./attachment.svg' alt='attachment' id='attachment-common' />
            <span>Attachments</span>
          </Col>
          <Col className='col-end-css'>
            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1L6.5 6L11.5 1" stroke="#5D7285" strokeWidth="1.5" />
            </svg>          </Col>
        </Row>
        <Row className='p-0'>
          <Col className='col-extra'>
            <label className="custom-file-upload">
              <input
                type="file"
                id="image"
                name="Upload image"
                onChange={selectFile}
                disabled={!caseDetails.case_status}
              />
              <Button className="add" disabled={!caseDetails.case_status}>
                <img src='./plus.svg' alt='plus' id='attachment-common' />
                <span>Add Attachment</span>
              </Button>
            </label>
          </Col>
        </Row>
        {
          attachFiles.length === 0 ?
            <Row className='second-row'>
              <Col>
                <div className='text'>
                  There are no case attachments associated with this case
                </div>
              </Col>
            </Row>
            :
            <Row className='second-row'>
              <div className='image-content'>
                {attachFiles?.map((item, index) => (
                  <div key={index} className=" d-flex uploaded-data mt-5 rounded-3 ml-2 mr-2" style={{ textAlign: "center" }}>
                    <div className='card' onClick={(e) => handleShowPreview(e, item)}>
                      <div className='selectedItem'>
                        {Object.keys(item)[0] === ("png" || "jpg") ?
                          <div>
                            <img src={
                              item[Object.keys(item)[0]]} alt='myImage' className='initial-img'/>
                          </div>
                          :
                          <div className='d-flex division'>
                            <img src={Object.keys(item)[0] === "pdf" ? fileIcon["pdf"] :Object.keys(item)[0] === "zip"?fileIcon["zip"]: fileIcon["unknown"]} alt='myImage' className='file-icon' />
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                ))}
              </div>

            </Row>
        }

      </Container>
    </>
  )
}
