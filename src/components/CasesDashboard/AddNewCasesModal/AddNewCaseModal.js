import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import "./model.css";
import { useLocation } from "react-router";
import { fieldConfigs } from "./Constants";
import { addCases } from "../../services/Api";
import { editCase } from "../../services/Api";
import Select from "react-select";
import { useDispatch } from "react-redux";

export const AddNewJobModal = ({
  showDesh,
  setShowDesh,
  renderCaseData,
  setRenderCaseData,
  showEditModal,
  isCloseCase,
  setShowEditModal,
  setRenderEditData,
  renderEditData,
  existingCaseData,
  setIsCloseCase,
}) => {
  const caseDetailsData = useSelector((state) => state.cases.caseDetailsData);
  const location = useLocation();
  const isDetailRoute = location.pathname === "/detail";
  const dispatch = useDispatch();
  const initialVal = {
    case_number: isDetailRoute ? caseDetailsData.case_number : "",
    intial_date: isDetailRoute
      ? new Date(caseDetailsData?.inital_date)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")
        .replace(/-(\d)-/g, "-0$1-")
        .replace(/-(\d)-/g, "-0$1-")
      : "",
    type: isDetailRoute ? caseDetailsData.type : "",
    tags: isDetailRoute ? caseDetailsData.tags : "",
    location: isDetailRoute ? caseDetailsData.location : "",
  };
  const [formInputField, setFormInputField] = useState(initialVal);
  const [errorMessage, setErrorMessage] = useState({});
  const { isUploading } = useState(false);
  const token = useSelector((state) => {
    return state.verifys.Token;
  });

  const handleClose = () => {
    setShowDesh(false);
    setErrorMessage({});
    setFormInputField(initialVal);
  };
  const handleShowEditModal = () => {
    setShowEditModal(false);
    setErrorMessage({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputField({ ...formInputField, [name]: value });
  };
  const validate = (values) => {
    const errors = {};
    fieldConfigs.forEach((fieldGroup) => {
      fieldGroup.forEach((field) => {
        const { name, validation } = field;
        if (validation && validation.required && values[name]?.trim() === "") {
          errors[name] = validation.errorMessage;
        }
      });
    });
    return errors;
  };
  const presentDate = new Date();
  const selectedDate = new Date(formInputField.intial_date);
  const handleformsubmit = () => {
    const formError = validate(formInputField);
    if (Object.keys(formError).length > 0) {
      setErrorMessage(formError);
    } else if (selectedDate > presentDate) {
      setErrorMessage({
        intial_date: "Please select a date on or before the present day.",
      });
    } else {
      setShowDesh(false);
      addCases(
        token,
        formInputField,
        setFormInputField,
        initialVal,
        setShowDesh,
        setRenderCaseData,
        renderCaseData
      );
    }
  };
  const handleEditChanges = () => {
    const formError = validate(formInputField);
    if (Object.keys(formError).length > 0) {
      setErrorMessage(formError);
    } else {
      setShowEditModal(false);
      editCase(
        dispatch,
        setIsCloseCase,
        isCloseCase,
        token,
        caseDetailsData.id,
        formInputField.case_number,
        formInputField.type,
        formInputField.tags,
        formInputField.location,
        formInputField.intial_date,
        setRenderEditData,
        renderEditData
      )
        .then((response) => { })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container fluid className="p-0">
        <Modal
          onHide={isDetailRoute ? handleShowEditModal : handleClose}
          show={showDesh || showEditModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Container fluid>
              <Modal.Header
                closeButton
                style={{ marginLeft: "622px" }}
              ></Modal.Header>
              {isDetailRoute ? (
                <h4
                  className="m-4 create-new-case create-sec-case"
                  placeholder=""
                >
                  Edit Case
                </h4>
              ) : (
                <h4
                  className="m-4 create-new-case create-sec-case"
                  placeholder=""
                >
                  Create New Case
                </h4>
              )}
              {fieldConfigs.map((item, index) => {
                return (
                  <Row key={index}>
                    {Object.values(item).map((formData, key2) => {
                      return (
                        <Col
                          key={key2}
                          className={
                            !isDetailRoute
                              ? formData.case_className
                              : formData.detail_className
                          }
                        >
                          {!isDetailRoute ||
                            formData.type !== "datetime-local" ? (
                            <Col>
                              <Form.Group
                                className="mb-1"
                                controlId={`formField-${formData.name}`}
                                key={index}
                              >
                                <Form.Label
                                  className={`Select-dash mt-${errorMessage[formData.name] &&
                                    formData.name !== "case_number"
                                    ? "1"
                                    : "3"
                                    }`}
                                >
                                  {formData.label}
                                </Form.Label>
                                {formData.type === "Select" ? (
                                  <Select
                                    name={formData.name}
                                    value={formData.options.find(
                                      (option) =>
                                        option.value ===
                                        formInputField[formData.name]
                                    )}
                                    onFocus={() =>
                                      (errorMessage[formData.name] = "")
                                    }
                                    onChange={(selectedOption) =>
                                      handleChange({
                                        target: {
                                          name: formData.name,
                                          value: selectedOption.value,
                                        },
                                      })
                                    }
                                    options={formData.options}
                                  />
                                ) : (
                                  <Form.Control
                                    className={`search-cases s1 selectoption date-format`}
                                    type={formData.type}
                                    name={formData.name}
                                    autoComplete="off"
                                    value={formInputField[formData.name]}
                                    onFocus={() =>
                                      (errorMessage[formData.name] = "")
                                    }
                                    onChange={handleChange}
                                  />
                                )}
                                <div className="mt-3">
                                  <div className="emailError-dash">
                                    {errorMessage[formData.name]}
                                  </div>
                                </div>
                              </Form.Group>
                            </Col>
                          ) : (
                            <div style={{ display: "none" }}></div>
                          )}
                        </Col>
                      );
                    })}
                  </Row>
                );
              })}
              <Row className="mb-3 mt-3">
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="dark"
                    type="submit"
                    data-dismiss="modal"
                    className="create-case"
                    onClick={
                      isDetailRoute ? handleEditChanges : handleformsubmit
                    }
                  >
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1.75L7.30625 8.25L5.46875 10L0 4.70833L1.8375 2.95833L5.46875 6.5L12.1625 0L14 1.75Z"
                        fill="white"
                      />
                    </svg>
                    {isDetailRoute ? (
                      <span>Save Changes</span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </Button>
                </Col>
              </Row>
              {isUploading && (
                <TailSpin
                  height="50"
                  width="50"
                  radius="5"
                  color="black"
                  ariaLabel="loading"
                  wrapperStyle={{ position: "absolute", top: "40%" }}
                />
              )}
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};
