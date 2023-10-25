import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import './Screen.css'
import { ImFolderOpen } from 'react-icons/im';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { getCases } from "../../slices/getCaseSlice";
import { getAllCases } from "../services/Api";
import { MainHeader } from "../CaseDetailContainer/MainHeader/MainHeader";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {AddNewJobModal} from './AddNewCasesModal/AddNewCaseModal';
import NewVersionAlert from "./newVersionAlert/NewVersionAlert";

export function CaseScreen() {
    const [showDesh, setShowDesh] = useState(false);
    const [searchQuery] = useState("");
    const [searchText, setSearchText] = useState("");
    const [mainData, setMainData] = useState([]);
    const [renderCaseData, setRenderCaseData] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadingCondition = useSelector((state) => { return state.emails.isLoadingCondition });
    const token = useSelector((state) => { return state.verifys.Token });

    const handleRowClick = async (row, e) => {
        e.stopPropagation()
        await dispatch(getCases(row))
        navigate("/detail")
    };
    useEffect(() => {
        getAllCases(token,setMainData,dispatch)
    }, [renderCaseData]);
   
    const customDataTableStyles = {
        rows: {
            style: {
                minHeight: "70px",
                fontFamily: 'Roboto',
            },
        },
        headCells: {
            style: {
                fontSize: "16px",
                fontWeight: 500,
            },
        },
        cells: {
            style: {
                paddingRight: "0px",
                fontSize: "16px",
            },
        },
        TableCol: {
            style: {
                background: "black",
            },
        },
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const dataTableColumns = [
        {
            name: "Cases",
            selector: (row) => (
                <>
                    <div onClick={(e) => handleRowClick(row, e)} >
                        <div className="first-content" >
                            <div>
                                <p >{row?.case_number}</p>
                            </div>
                            <div className="sub-content-item">
                                {
                                    !row.CaseStatus === true ? <span style={{ color: "#F87171", fontSize: ".9rem" }}>
                                        <img src="./info_icon.svg" alt="info" />
                                    </span> :
                                        <span> <img src='./rightTick.svg' alt='case' id='common' /></span>
                                }
                            </div>
                            <div className="sub-content-item">
                                <ImFolderOpen style={{ color: "#999CA0", fontSize: "1.1rem" }} />
                            </div>
                            <div className="sub-content-item">
                                <RiDeleteBin5Fill style={{ color: "#999CA0", fontSize: "1.1rem" }} />
                            </div>
                        </div>
                        <div className="sub-content">
                            <div >
                                {row.tags}
                            </div>
                            <div className="sub-content-item">
                                {row.caseType}
                            </div>
                            <div className="sub-content-item">
                                {row.type}
                            </div>
                        </div>
                    </div>
                </>
            ),
            sortable: true,
            width: "30%",
        },
        {
            name: "Case Status",
            selector: (row) => (
                <>
                    <div className="cell-content" onClick={(e) => handleRowClick(row, e)}>
                        {row.case_status === true ? <button className="inner-btn">Open</button> : <button className="inner-btn2">Reviewed</button>}
                    </div>
                </>
            ),
            sortable: true,
            width: "15%",
        },
        {
            name: "Initiation Date",
            selector: (row) => (
                <>
                <div className="cell-content"  onClick={(e) => handleRowClick(row, e)}>
                <div className="date-content">
                        <div className="time-icon"><BiTimeFive style={{ marginRight: '4px' }} /></div>
                        <div style={{ color: "#06152B" }}>{new Date(row.inital_date).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, "-").replace(/-(\d)-/g, '-0$1-').replace(/-(\d)-/g, '-0$1-')}</div>
                    </div>
                </div>
                    
                </>
            ),
            sortable: true,
            width: "15%",
        },
        {
            name: "Type",
            selector: (row) => (
                <>
                 <div className="cell-content"  onClick={(e) => handleRowClick(row, e)}>
                    <div className="type-content" style={{ color: "#06152B" }} >
                        {row.type}
                    </div>
                    </div>
                </>
            ),

            sortable: true,
            width: "15%",
        },

        {
            name: "Location",
            selector: (row) => (
                <>
                    <div className="location-content" onClick={(e) => handleRowClick(row, e)}>
                        <div className="type-content" style={{ color: "#06152B" }}>
                            {row.location}
                        </div>
                        <div>
                            <div className="created-by">
                                Accepted on {' '}
                                {new Date(row.inital_date).toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                                ,{" "}
                                {new Date(row.inital_date).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "UTC", 
                                })}
                            </div>
                            <div className="created-by">
                                {row.caseSubmitedBy}
                            </div>
                        </div>
                    </div>
                </>
            ),
            sortable: true,
            width: "25%",
        },
    ];
    // 
    return (
        <>
            <div>
                <NewVersionAlert />
                <div>
                    <MainHeader/>
                </div>
                <div className="row sub-header">
                    <div className="col">
                        <div className="search-content " >
                            <div style={{ padding: "2%", display: "flex", alignItems: 'center' }}>
                                <span>
                                    <img src="./case_search.svg" className="my-img" alt="search"/>
                                </span>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search"
                                    value={searchText}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className=" d-flex justify-content-center h-100 align-items-center flex-wrap">
                            <div className=" border  inner-content">
                                <div className="mr-1 Fsize">
                                    <img src='./order.svg' alt='search' id='dstance' />
                                </div>
                                <span className="icons">Order</span>
                            </div>
                            <div className=" border inner-content border-left-0">
                                <div className="mr-1 Fsize">
                                    <img src='./order_by.svg' alt='layer' id='distance' />
                                </div><span className="icons">Order by</span>
                            </div>
                            <div className=" border inner-content border-left-0">
                                <div className="mr-1 Fsize">
                                    <img src='./filter.svg' alt='union' id='distance' />
                                </div><span className="icons">Filter</span>
                            </div>
                            <div className=" border inner-content border-left-0">
                                <div className="mr-1 Fsize">
                                    <img src='./stats.svg' alt='union' id='distance' />
                                </div><span className="icons">Stats</span>
                            </div>
                            <div className=" border inner-content border-left-0">
                                <div className="mr-1 Fsize">
                                    <img src='./date_filters.svg' alt='union' id='distance' />
                                </div><span className="icons">Date Filter</span>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="create-button">
                            <Button
                                variant="dark"
                                type="submit"
                                className="create-case-button button-shift"
                                onClick={() => setShowDesh(true)}>
                                <FontAwesomeIcon icon={faPlus} />  New Case
                            </Button>
                        </div>
                    </div>
                </div>
                {!loadingCondition &&
                    <div className="table-case-content">
                        <DataTable
                            columns={dataTableColumns}
                            data={mainData}
                            customStyles={customDataTableStyles}
                            pagination
                            highlightOnHover
                            filter={searchQuery}
                            className="set-padding"/>
                    </div>
                }
                {loadingCondition && (
                    <TailSpin
                        height="50"
                        width="50"
                        radius="5"
                        color="black"
                        ariaLabel="loading"
                        wrapperStyle={{ position: "absolute", top: "60%", left: "50%" }}/>
                )}
                <div>
                    <AddNewJobModal
                        showDesh={showDesh}
                        setShowDesh={setShowDesh}
                        renderCaseData={renderCaseData}
                        setRenderCaseData={setRenderCaseData}/>
                </div>
            </div>
        </>
    );
}

