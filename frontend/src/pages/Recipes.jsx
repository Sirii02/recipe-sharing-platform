import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes");
        setRecipes(response.data);
      } catch (error) {
        setError("Failed to load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Culinary Canvas</h1>
      {loading ? (
        <p className="text-center">Loading recipes...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div className="row g-2 justify-content-center">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div className="col-md-4" key={recipe._id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <p className="text-center">No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Recipes;