import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const location = useLocation();

    // While the authentication status is being determined
    if (authLoading) {
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    // If user is not authenticated, redirect to login page
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the protected content (children)
    return children;
};

export default ProtectedRoute;