import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./job_modal.css";
import "../../CasesDashboard/AddNewCasesModal/model.css";
import "../../CasesDashboard/Screen.css";
import { formFields } from "./Constants";
import { addJobsByApi } from "../../services/Api";
import Select from "react-select";
import { initialVal } from "./Constants";

export const AddNewCaseModal = ({
  showModal,
  setShowModal,
  renderData,
  setRenderData,
}) => {
  const caseDetailsData = useSelector((state) => state.cases.caseDetailsData);
  const dispatch = useDispatch();

  const [formInputField, setFormInputField] = useState(initialVal);
  const [errorMessage, setErrorMessage] = useState({});
  const authToken = useSelector((state) => {
    return state.verifys.Token;
  });

  const handleClose = () => {
    setShowModal(false);
    setErrorMessage({});
    setFormInputField(initialVal);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputField({ ...formInputField, [name]: value });
  };

  const validateModalInputs = (values) => {
    const errors = {};
    formFields.forEach((field) => {
      const { name, validation } = field;
      if (validation.required && values[name].trim() === "") {
        errors[name] = validation.errorMessage;
      }
      if (name === "url") {
        const url = values[name].trim();
        if (validation.required && url === "") {
          errors[name] = validation.errorMessage;
        } else if (validation.pattern && !validation.pattern.test(url)) {
          errors[name] = "Invalid URL.";
        }
      }
    });
    return errors;
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formError = validateModalInputs(formInputField);
    if (Object.keys(formError).length > 0) {
      setErrorMessage(formError);
    } else {
      addJobsByApi(
        authToken,
        setShowModal,
        dispatch,
        formInputField,
        caseDetailsData,
        setFormInputField,
        initialVal,
        setErrorMessage,
        renderData,
        setRenderData
      );
    }
  };
  return (
    <>
      <Container fluid className="p-0">
        <Modal
          onHide={handleClose}
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-center"
          centered
        >
          <Modal.Body>
            <Container fluid>
              <Modal.Header
                closeButton
                style={{ marginLeft: "622px" }}
              ></Modal.Header>

              <h4 className="m-2 create-new-case create-sec-case" placeholder="">
                Create New Item
              </h4>
              <Form className="formDetails">
                {formFields.map((field, index) => (
                  <div key={index}>
                    <Form.Group
                      as={Row}
                      controlId={field.name}>
                      <Form.Label
                        className={`Select-dash mt-${
                          errorMessage[field.name] && field.name !== "job_no"
                            ? "1"
                            : "3"
                        }`}>
                        {field.label}
                      </Form.Label>
                      <Col>
                        {field.type === "select" ? (
                          <Select
                            options={field.options}
                            name={field.name}
                            value={field.options.find(
                              (option) =>
                                option.value === formInputField[field.name]
                            )}
                            onFocus={() => (errorMessage[field.name] = "")}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: field.name,
                                  value: selectedOption.value,
                                },
                              })
                            }
                          />
                        ) : (
                          <Form.Control
                            className="search-modal date-format s1 selectoption"
                            type={field.type}
                            name={field.name}
                            autoComplete="off"
                            value={formInputField[field.name]}
                            onFocus={() => (errorMessage[field.name] = "")}
                            onChange={handleChange}
                          />
                        )}
                        {errorMessage[field.name] && (
                          <Form.Text className="emailError-dash mt-1 mb-2">
                            {errorMessage[field.name]}
                          </Form.Text>
                        )}
                      </Col>
                    </Form.Group>
                  </div>
                ))}
                <Row className="mb-3 mt-3">
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="dark"
                      type="submit"
                      data-dismiss="modal"
                      className="create-case"
                      onClick={handleFormSubmit}
                    >
                      <img src="./plus.svg" className="marg" alt="plus" />
                      <span className="create">Create</span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};
