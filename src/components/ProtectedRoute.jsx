import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthProvider"
import { useContext } from "react";

const ProtectedRoute = () => {
    const { auth } = useContext(AuthContext);

    return (
        auth ? <Outlet/> : <Navigate to="/signIn" />
    );
}


export default ProtectedRoute;