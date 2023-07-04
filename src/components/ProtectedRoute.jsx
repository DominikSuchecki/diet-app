import { useLocation, Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/AuthProvider"
import { useContext } from "react";

const ProtectedRoute = () => {

    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (
        auth ? <Outlet />
            : <Navigate to="/" state={{ from: location}} replace />
    );
}

export default ProtectedRoute;