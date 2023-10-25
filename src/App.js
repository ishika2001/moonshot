import "./App.css";
import {LoginScreen} from '../src/components/LoginPanel/LoginScreen'
import {VerifyScreen} from '../src/components/LoginPanel/VerifyScreen'
import {JobDetails} from './components/JobDashboard/JobDetails'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ProtectVerify, Protected, ProtectedCase,ProtectVerifyPIN, ProtectedJob} from "./components/services/Protected";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState ,createContext} from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { CaseScreen } from "./components/CasesDashboard/CaseScreen";
import { CaseDetailScreen } from "./components/CaseDetailContainer/CaseDetailScreen";
import { VerifyIdentity } from "./components/VerifyIdentity/VerifyIdentity";
import { VerifyPin } from "./components/VerifyIdentity/VerifyPin";
import { DashboardForAllJobs } from "./components/VerifyIdentity/DashboardForAllJobs";
export const UserContext = createContext(null);
function App() {
  const [ip,setIP]=useState("")
  const [email, setemail] = useState("");
  const [schedule, setSchedule] =useState("");
  const [TableData, setTableData] = useState([]);
  const [TableDataToShowAllJobs, setTableDataToShowAllJobs] = useState([]);
  const [caseDetails,setCaseDetails]=useState([])
  const [tokenFromVerify,setTokenFromVerify]=useState("")
  const [ip_,setIP_]=useState("")
  const [identity, setIdentity] = useState("");
  const [tokenFromVerifyPin,setTokenFromVerifyPin]=useState("")

  const value = {
    email, 
    setemail,
    schedule,
    setSchedule,
    ip,
    TableData, 
    setTableData,
    TableDataToShowAllJobs,
    setTableDataToShowAllJobs,
    tokenFromVerify, 
    setTokenFromVerify,
    identity,
    setIdentity,
    ip_,
    tokenFromVerifyPin,
    setTokenFromVerifyPin,
  };

  const getData = async () => {
    try {
      const res = await axios.get("https://api.ipify.org/?format=json");
      setIP(res.data.ip);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };
  
  const getIdentityData = async () => {
    try {
      const res = await axios.get("https://api.ipify.org/?format=json");
      setIP_(res.data.ip);
    } catch (error) {
      console.error("An error occurred while fetching identity data:", error);
    }
  };
 
  useEffect(() => {
    getData();
    getIdentityData();
  }, []);

  return (
    <>
     <ToastContainer />
     <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Protected><LoginScreen/></Protected>}/>
          <Route path='/verify' element={<ProtectVerify><VerifyScreen/></ProtectVerify>}/>
          <Route path='/case' element={<ProtectedCase><CaseScreen/></ProtectedCase>}/>
          <Route path="/detail" element={<ProtectedCase><CaseDetailScreen caseDetails={caseDetails}
          setCaseDetails={setCaseDetails}
          /></ProtectedCase>}/>
          <Route path='/evidenceDetail' element={<ProtectedCase><JobDetails caseDetails={caseDetails}
           setCaseDetails={setCaseDetails}
          /></ProtectedCase>}/>
        <Route path='/verifyIdentity' element={<VerifyIdentity/>}/>
          <Route path='/verifyPin' element={<ProtectVerifyPIN><VerifyPin/></ProtectVerifyPIN>}/>
          <Route path='/downloadJobs' element={<ProtectedJob><DashboardForAllJobs/></ProtectedJob>}/>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
export default App;

