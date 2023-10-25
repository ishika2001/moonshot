import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import { Button, Col, Container, Row } from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './evidence.css'
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { AddNewCaseModal } from '../AddNewJobsModal/AddNewJobModal'
import { getJobId } from '../../../slices/getjobSlice';
import { TailSpin } from 'react-loader-spinner';
import { getJobData } from '../../services/Api';
import { IoMdRefresh } from 'react-icons/io'
// import { updateJobStatus } from '../../services/Api';

export const Evidence = ({ renderData, setRenderData, caseDetails }) => {
    const caseDetailsData = useSelector((state) => state.cases.caseDetailsData)
    const job_id = useSelector((state) => state.jobs.jobId)
    const loadingCondition = useSelector((state) => { return state.emails.isLoadingCondition });
    const [tableData, setTableData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const token = useSelector((state) => { return state.verifys.Token });
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const customTableStyles = {
        rows: {
            style: {
                fontFamily: 'Roboto',
            },
        },
        headCells: {
            style: {
                fontSize: "16px",
                fontWeight: 500,
                display: 'none'
            },
        },
        cells: {
            style: {
                paddingRight: "0px",
                fontSize: "16px",
                textAlign: "left",
            },
        },
        TableCol: {
            style: {
                background: "black",
            },
        },
    };


    function funcUpdateJobStatus(e) {
        e.stopPropagation();
        getJobData(token, dispatch, setTableData, caseDetailsData)
    }

    useEffect(() => {
        getJobData(token, dispatch, setTableData, caseDetailsData)
    }, [renderData]);

    const handleRowClick = async (row, e) => {
        e.stopPropagation()
        await dispatch(getJobId(row))
        navigate("/evidenceDetail")
    };
    const Tablecolumns = [
        {
            selector: (row) => (
                <>
                    <div className="evid-firstContent" onClick={(e) => handleRowClick(row, e)}>
                        <div>
                            <span> {row.job_no}</span>
                        </div>
                    </div>
                </>
            ),
            sortable: true,
            width: "25%",
        },
        {
            selector: (row) => (
                <>
                    <div className="evid-firstContent" onClick={(e) => handleRowClick(row, e)}>
                        <img src='./attachment.svg' alt='attach' id='evid-common' />
                        <span className='evid-second-detail-text w-75'>{row.type}</span>
                    </div>
                </>
            ),
            sortable: true,
            width: "25%",
        },
        {
            selector: (row) => (
                <>
                    <div className='evid-second-detail-text1' onClick={(e) => handleRowClick(row, e)}>
                        <img src='./clock.svg' alt='clock' id='max' />
                        <span className='w-75'>
                            {new Date(row.updatedAt).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }).replace(/(\w{3}) (\d{2}), (\d{4})/, "$2 $1, $3")},{" "}
                            {new Date(row.updatedAt).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true
                            })}
                        </span>
                    </div>
                </>
            ),
            sortable: true,
            width: "25%",
        },
        {
            selector: (row) => (
                <>
                    <div className='status-btn'>
                        <div onClick={(e) => handleRowClick(row, e)}>
                            {<Button className={row.status === 'Success' ? 'success' : 'created'}><span>{row.status || "Created"}</span></Button>}
                        </div>
                    </div>
                </>
            ),
            sortable: true,
            width: "25%",
        },
    ];
    return (
        <>
            <Container fluid className='p-0 evidence-box'>
                <Row className='one1'>
                    <Col className='evid-col-one'>
                        <img id="evid-group" src='./Group.svg' alt='gropus' />
                        <span className='evid'>Evidence</span>
                    </Col>
                    <Col className='evid-col-two'>
                        <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1L6.5 6L11.5 1" stroke="#5D7285" strokeWidth="1.5" />
                        </svg>
                    </Col>
                </Row>
                <Row className='two'>
                    <Col className='evid-col-three'>
                        <ButtonGroup size="lg" className="mb-2">
                            <Button className='btn-text'>
                                <img src='./search.svg' alt='search' id="evid-common" style={{ paddingBottom: '4px' }} />
                                <span>Explore</span></Button>
                            <Button className='btn-text'>
                                <img src='./Layer_1.svg' alt='layer' id='evid-common' />
                                <span>Movement</span></Button>
                            <Button className='btn-text'>
                                <img src='./Union.svg' alt='union' id='evid-common' />
                                <span>Log</span></Button>
                        </ButtonGroup>
                    </Col>
                    <Col className='evid-col-four'>
                        <Button className='add2'>
                            <div>
                                <IoMdRefresh id='refresh' onClick={(e) => funcUpdateJobStatus(e)} />
                            </div>
                        </Button>
                        <Button className='add1' disabled={!caseDetails.case_status}
                            onClick={() => setShowModal(true)}>
                            <img src='./plus.svg' alt='plus' id='evid-common' />
                            <span>Add item</span></Button>
                    </Col>
                </Row>
                <Row className='evid-tableCaseContent'>
                    <DataTable
                        columns={Tablecolumns}
                        data={tableData}
                        customStyles={customTableStyles}
                        pagination
                        responsive
                        className="no-header"
                        highlightOnHover
                    />
                </Row>
                <Row>
                    <AddNewCaseModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        setRenderData={setRenderData}
                        renderData={renderData} />
                </Row>
                {loadingCondition && (
                    <TailSpin
                        height="50"
                        width="50"
                        radius="5"
                        color="black"
                        ariaLabel="loading"
                        wrapperStyle={{ position: "absolute", top: "60%", left: "50%" }} />
                )}
            </Container>
        </>
    )
}
