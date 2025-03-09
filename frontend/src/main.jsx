import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext"; // Import SocketProvider
import "./index.css"; // Ensure global styles are applied

const root = document.getElementById("root");

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <AuthProvider>
                <SocketProvider> {/* Wrap App with SocketProvider */}
                    <App />
                </SocketProvider>
            </AuthProvider>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found. Make sure your HTML contains <div id='root'></div>.");
}