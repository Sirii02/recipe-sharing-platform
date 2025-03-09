import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Adjust backend URL if hosted

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch recipes initially
        axios.get("http://localhost:5000/api/recipes")
            .then((res) => setRecipes(res.data))
            .catch((err) => console.error("Error fetching recipes:", err));

        // Listen for recipe events
        socket.on("recipeCreated", (newRecipe) => {
            console.log("New Recipe Added:", newRecipe);
            setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
        });

        socket.on("recipeUpdated", (updatedRecipe) => {
            console.log("Recipe Updated:", updatedRecipe);
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe._id === updatedRecipe._id ? updatedRecipe : recipe
                )
            );
        });

        socket.on("recipeDeleted", (deletedId) => {
            console.log("Recipe Deleted:", deletedId);
            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe._id !== deletedId)
            );
        });

        return () => {
            socket.off("recipeCreated");
            socket.off("recipeUpdated");
            socket.off("recipeDeleted");
        };
    }, []);

    return (
        <div>
            <h2>Recipe List</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <h3>{recipe.title}</h3>
                        <img
                            src={recipe.image.startsWith("http") ? recipe.image : `http://localhost:5000${recipe.image}`}
                            alt={recipe.title}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipesList;