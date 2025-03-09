import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error("Registration failed", error);
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-lg">
                        <h2 className="text-center mb-3">Register</h2>

                        {error && <div className="alert alert-danger text-center">{error}</div>}

                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    name="username" 
                                    placeholder="Username" 
                                    value={formData.username} 
                                    onChange={handleChange} 
                                    required 
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    className="form-control"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
