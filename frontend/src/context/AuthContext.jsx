import { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from localStorage (if exists) on initial render
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    // Sync the user state with localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", user.token); // Store token if user exists
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token"); // Also remove token when logged out
        }
    }, [user]);

    // Login function - used for setting user
    const login = (userData) => {
        setUser(userData);
    };

    // Logout function - clears user from state and localStorage
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export AuthProvider as default
export default AuthProvider;
