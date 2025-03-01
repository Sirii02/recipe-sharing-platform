import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
    return (
        <div className="card m-3" style={{ width: "20rem", height: "100%" }}>
            <img src={recipe.image} className="card-img-top" alt={recipe.title} style={{ height: "300px", objectFit: "cover" }}  />
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link to={`/recipes/${recipe.id}`} className="btn btn-primary">
                    View Recipe
                </Link>
            </div>
        </div>
    );
}

export default RecipeCard;
