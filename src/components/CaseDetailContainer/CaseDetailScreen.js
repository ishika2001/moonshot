import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Header } from "./Header/Header";
import { MainHeader } from "./MainHeader/MainHeader";
import { CaseDetail } from "./CaseDetails/CaseDetail";
import { Attachment } from "./Attachment/Attachment";
import { Evidence } from "./Evidence/Evidence";
import { getCaseDetail } from "../services/Api";
import { useDispatch, useSelector } from "react-redux";
import ShowPreView from "../Preview/ShowPreview";

export const CaseDetailScreen = ({ caseDetails, setCaseDetails }) => {
  const [renderData, setRenderData] = useState(false);
  const [renderEditData, setRenderEditData] = useState(false);

  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isCloseCase, setIsCloseCase] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const caseDetailsData = useSelector((state) => state.cases.caseDetailsData);
  const authToken = useSelector((state) => {
    return state.verifys.Token;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    getCaseDetail(authToken, dispatch, setCaseDetails, caseDetailsData);
  }, [isCloseCase]);
  return (
    <Container fluid className="p-0">
      <Row>
        <MainHeader/>
      </Row>
      <Row>
        <Header
          isCloseCase={isCloseCase}
          setIsCloseCase={setIsCloseCase}
          caseDetails={caseDetails}
          renderEditData={renderEditData}
          setRenderEditData={setRenderEditData}
        />
      </Row>
      <div>
        {isOpenPreview && (
          <ShowPreView
            isOpenPreview={isOpenPreview}
            setIsOpenPreview={setIsOpenPreview}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
          />
        )}
        <Row className="mt-3 mb-4 mx-5 my-4">
          <CaseDetail />
        </Row>
        <Row className="mt-3 mb-4 mx-5 my-4">
          <Attachment
            isOpenPreview={isOpenPreview}
            setIsOpenPreview={setIsOpenPreview}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            caseDetails={caseDetails}
          />
        </Row>
        <Row className="mt-3 mb-4 mx-5 my-4">
          <Evidence
            renderData={renderData}
            setRenderData={setRenderData}
            caseDetails={caseDetails}
          />
        </Row>
      </div>
    </Container>
  );
};
