import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        ingredients: "",
        instructions: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Recipe:", formData);
        alert("Recipe added successfully!");
        navigate("/recipes");
    };

    return (
        <div className="container mt-4">
            <h2>Create a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ingredients (comma-separated)</label>
                    <input type="text" className="form-control" name="ingredients" value={formData.ingredients} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Instructions</label>
                    <textarea className="form-control" name="instructions" value={formData.instructions} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-success">Add Recipe</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
