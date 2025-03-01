import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });
  }, [id]);

  if (!recipe) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="img-fluid d-block mx-auto my-3" style={{ maxHeight: "400px" }} />
      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>
      <p><strong>Created by:</strong> {recipe.createdBy}</p>
    </div>
  );
}

export default RecipeDetails;