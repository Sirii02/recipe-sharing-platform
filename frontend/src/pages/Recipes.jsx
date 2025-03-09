import React, { useEffect, useState, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import SocketContext from "../context/SocketContext"; // Import SocketContext

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const socket = useContext(SocketContext); // Access the socket instance

    // Fetch recipes on component mount
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/recipes");
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError("Failed to load recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Listen for real-time updates
    useEffect(() => {
        if (!socket) return;

        // Listen for new recipes
        socket.on("recipeCreated", (newRecipe) => {
            setRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
        });

        // Listen for updated recipes
        socket.on("recipeUpdated", (updatedRecipe) => {
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe._id === updatedRecipe._id ? updatedRecipe : recipe
                )
            );
        });

        // Listen for deleted recipes
        socket.on("recipeDeleted", (deletedRecipeId) => {
            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe._id !== deletedRecipeId)
            );
        });

        // Cleanup listeners on unmount
        return () => {
            socket.off("recipeCreated");
            socket.off("recipeUpdated");
            socket.off("recipeDeleted");
        };
    }, [socket]);

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Culinary Canvas</h1>

            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            )}

            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!loading && !error && (
                <div className="row g-3 justify-content-center">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <div className="col-md-4" key={recipe._id}>
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))
                    ) : (
                        <p className="text-muted text-center fs-5">No recipes found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Recipes;