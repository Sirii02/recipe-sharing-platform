import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createRecipe } from "../api/recipeApi";
import { toast } from "react-toastify";

function CreateRecipe() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null, // File upload
        imageUrl: "", // Direct URL
        ingredients: "",
        instructions: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files.length > 0) {
            const file = files[0];
            if (!file.type.startsWith("image/")) {
                toast.error("Please select a valid image file.");
                return;
            }
        }
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to create a recipe.");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("ingredients", formData.ingredients);
            formDataToSend.append("instructions", formData.instructions);

            if (formData.image) {
                formDataToSend.append("image", formData.image); // Send file
            } else if (formData.imageUrl.trim() !== "") {
                // URL validation
                if (!isValidURL(formData.imageUrl)) {
                    toast.error("Please enter a valid image URL.");
                    return;
                }
                formDataToSend.append("imageUrl", formData.imageUrl); // Send URL
            }

            // Convert comma-separated ingredients to an array
            const ingredientsArray = formData.ingredients
                .split(",")
                .map((ingredient) => ingredient.trim());
            formDataToSend.append("ingredients", JSON.stringify(ingredientsArray));

            // API Call
            const response = await createRecipe(formDataToSend, token);

            toast.success("Recipe created successfully!");
            navigate("/recipes"); // Redirect after success

            // Clear form data after success
            setFormData({
                title: "",
                description: "",
                image: null,
                imageUrl: "",
                ingredients: "",
                instructions: "",
            });
        } catch (error) {
            console.error("Error creating recipe:", error);
            toast.error(error.response?.data?.message || "Failed to create recipe.");
        } finally {
            setLoading(false);
        }
    };

    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create a New Recipe</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image Upload (Choose File or Enter URL)</label>
                    <div className="d-flex flex-column">
                        <input
                            type="file"
                            className="form-control mb-2"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="imageUrl"
                            placeholder="Or enter image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ingredients (comma-separated)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Instructions</label>
                    <textarea
                        className="form-control"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Creating..." : "Add Recipe"}
                </button>
            </form>
        </div>
    );
}

export default CreateRecipe;