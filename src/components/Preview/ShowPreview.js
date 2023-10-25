import React from "react";
import "./showPreview.css";
import { VscClose } from "react-icons/vsc";
import { BsDownload } from "react-icons/bs";
import zipIcon from '../assets/ZIP.png';
import pdfIcon from '../assets/PDF.png'
import Modal from 'react-bootstrap/Modal';
const ShowPreView = ({ isOpenPreview, setIsOpenPreview, previewUrl }) => {
  const handleShowDialog = () => {
    setIsOpenPreview(!isOpenPreview);
  };
  return (
    <>
      {isOpenPreview && (
        <div className="">
          <Modal
            closeButton
            show={isOpenPreview}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div className="image-buttons">
                <a
                  id="no-renderer-download"
                  className="download-Btn"
                  href={previewUrl.url}
                  download={previewUrl.url}>
                  <BsDownload className="down-icon" />
                </a>
                <button className="preview-close-btn" onClick={handleShowDialog}>
                  <VscClose className="close-icon"/>
                </button>
              </div>
              <div>
                {
                  previewUrl.fileType[0] === ("zip") ? (
                    <div className="image-div">
                      <img className="preview-other" src={zipIcon} alt="myImage" />
                    </div>) :previewUrl.fileType[0] === ("pdf")?(
                    <div className="image-div">
                      <img className="preview-other" src={pdfIcon} alt="myImage" />
                    </div>):
                    (<div className="image-div">
                      <img className="preview-img" src={previewUrl.url} alt="myImage" />
                    </div>)
                }
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};
export default ShowPreView;
