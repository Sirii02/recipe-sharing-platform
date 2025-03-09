import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
    return (
        <div className="card m-3 shadow-sm" style={{ width: "20rem", minHeight: "100%" }}>
            <img
                src={recipe.image.startsWith("http") ? recipe.image : `http://localhost:5000${recipe.image}`}
                alt={recipe.title}
                style={{ width: "500px", height: "400px" }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text text-truncate" style={{ maxHeight: "3rem" }}>
                    {/* {recipe.description || "No description available."} */}
                </p>
                {recipe._id ? (
                    <Link to={`/recipe/${recipe._id}`} className="btn btn-primary mt-auto">
                        View Recipe
                    </Link>
                ) : (
                    <button className="btn btn-secondary mt-auto" disabled>
                        Recipe Unavailable
                    </button>
                )}
            </div>
        </div>
    );
}

export default RecipeCard;