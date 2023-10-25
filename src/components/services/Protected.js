import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
export function Protected({ children }) {
    const token = useSelector((state) => { return state.verifys.Token });
    const emails = useSelector((state) => { return state.emails.email });
    if (token && emails) { return <Navigate to="/case" replace /> }
    return children;
}

export function ProtectVerify({ children }) {
    const isLogin = useSelector((state) => state.checks.isCheck);
    const token = useSelector((state) => { return state.verifys.Token });
    const emails = useSelector((state) => { return state.emails.email });
    if (emails && token) { return <Navigate to="/case" replace /> }
    else if (!isLogin) { return <Navigate to="/" replace /> }
    return children;
}

export function ProtectedCase({ children }) {
    const token = useSelector((state) => { return state.verifys.Token });
    if (!token) { return <Navigate to="/" replace /> }
    return children;
}

export function ProtectedJob({ children }) {
    const token = useSelector((state) => { return state.pin.Token });
    if (!token) { return <Navigate to="/verifyIdentity" replace /> }
    return children;
}
export function ProtectedVerifyIdentity({ children }) {
    const token = useSelector((state) => { return state.pin.Token });
    const identity = useSelector((state) => { return state.identity.email });
    if (token && identity) { return <Navigate to="/case" replace /> }
    return children;
}
export function ProtectVerifyPIN({ children }) {
    const isLoggedIn = useSelector((state) => state.checks.isCheck);
    const token = useSelector((state) => { return state.pin.Token });
    const identity = useSelector((state) => { return state.identity.email });
    if (identity && token) { return <Navigate to="/downloadJobs" replace /> }
    else if (!isLoggedIn) { return <Navigate to="/verifyIdentity" replace /> }
    return children;
}
