import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRecipe from "./pages/CreateRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Recipes from "./pages/Recipes"; // Already imported
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import AboutUs from "./pages/AboutUs"; // Import About Us page

function App() {
    return (
        <Router>
            <div className="app-container d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1 container py-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/recipes" element={<Recipes />} /> {/* Recipes page */}
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                        <Route path="/create-recipe" element={<ProtectedRoute><CreateRecipe /></ProtectedRoute>} />
                        <Route path="/about" element={<AboutUs />} /> {/* About Us page */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;