import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
    const { id } = useParams(); // Get recipe ID from URL
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // If token exists, include it in the request header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get(`http://localhost:5000/api/recipes/${id}`, config)
            .then((response) => {
                setRecipe(response.data);
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
                setError("Failed to load recipe details.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    if (!recipe) {
        return <p className="text-center text-warning">Recipe not found.</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h1 className="text-center">{recipe.title || "Untitled Recipe"}</h1>

                {recipe.image && (
                    <img
                        src={recipe.image}
                        alt={recipe.title || "Recipe Image"}
                        className="img-fluid d-block mx-auto my-3 rounded"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                )}

                <h4 className="mt-4">Ingredients:</h4>
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    <ul className="list-group mb-3">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index} className="list-group-item">{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">No ingredients listed.</p>
                )}

                <h4>Instructions:</h4>
                <p className="bg-light p-3 rounded">{recipe.instructions || "No instructions provided."}</p>

                <p className="text-muted text-end"><strong>Created by:</strong> {recipe.createdBy || "Unknown"}</p>
            </div>
        </div>
    );
}

export default RecipeDetails;
