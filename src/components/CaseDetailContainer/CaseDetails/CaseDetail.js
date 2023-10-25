import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../CaseDetailContainer/CaseDetails/case_detail.css";
import { useSelector } from "react-redux";

export const CaseDetail = () => {
  const caseDetailsData = useSelector((state) => state.cases.caseDetailsData);
  return (
    <>
      <Container fluid className="detail-box p-0">
        <Row className="first">
          <Col className="both">
            <img src="./Union.svg" alt="case" id="case-common" />
            <span className="case-detail-text">Case Details</span>
          </Col>
          <Col>
            <span className="case-detail-text">Case Status</span>
          </Col>
          <Col>
            <span className="case-detail-text">Initiation Date</span>
          </Col>
          <Col>
            <span className="case-detail-text">Type</span>
          </Col>
          <Col>
            <span className="case-detail-text">Location</span>
          </Col>
        </Row>
        <Row className="second">
          <Col>
            <span className="cse-Text">{caseDetailsData?.case_number}</span>
          </Col>
          <Col>
            {caseDetailsData.case_status ? (
              <button className="inner-btn open">
                <span>Open</span>
              </button>
            ) : (
              <button className="inner-btn2">
                <span>Reviewed</span>
              </button>
            )}
          </Col>
          <Col>
            {caseDetailsData && (
              <>
                <img src="./clock.svg" alt="clock" id="case-common" />
                <span className="second-detail-text">
                  {" "}
                  {new Date(caseDetailsData?.inital_date)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, "-")
                    .replace(/-(\d)-/g, "-0$1-")
                    .replace(/-(\d)-/g, "-0$1-")}
                </span>
              </>
            )}
          </Col>
          <Col>
            <span className="second-detail-text">{caseDetailsData?.type}</span>
          </Col>
          <Col>
            <span className="second-detail-text">
              {caseDetailsData?.location}
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
};
