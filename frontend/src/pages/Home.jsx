import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../api/recipeApi";
import { Link } from "react-router-dom";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError("Failed to load recipes. Please try again later.");
            }
        };
        getRecipes();
    }, []);

    return (
        <div className="container mt-4 text-center">
            <h1 className="display-4 fw-bold">Welcome to Recipe Sharing Platform</h1>
            <p className="lead text-muted">Discover and share delicious recipes with the community!</p>

            {/* Bootstrap Carousel */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ maxWidth: "1100px", margin: "auto" }}>
                <div className="carousel-inner">
                    {[
                        "https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4117-feature.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vada_Pav-Indian_street_food.JPG/640px-Vada_Pav-Indian_street_food.JPG",
                        "https://www.recipesaresimple.com/wp-content/uploads/2018/06/Kozhikodan-Biriyani-youtube.jpeg",
                    ].map((image, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                            <img
                                src={image}
                                className="d-block w-100"
                                alt={`Slide ${index + 1}`}
                                style={{ height: "800px", objectFit: "cover" }}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* View Recipes Button */}
            <div className="mt-4">
                <Link to="/recipes" className="btn btn-lg btn-success px-4">
                    View Recipes
                </Link>
            </div>

            {/* Recipe List Section */}
            <div className="mt-5">
                <h2 className="fw-bold">Latest Recipes</h2>
                {error ? (
                    <p className="text-danger fs-5 mt-3">{error}</p>
                ) : (
                    <div className="row">
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <div key={recipe._id} className="col-md-4 mb-4">
                                    <div className="card shadow-sm">
                                        <img
                                            src={recipe.image || "/default-recipe.jpg"} // Fallback image
                                            className="card-img-top"
                                            alt={recipe.title}
                                            style={{ height: "200px", objectFit: "cover" }}
                                            loading="lazy"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{recipe.title}</h5>
                                            <p className="card-text text-truncate" style={{ maxWidth: "100%" }}>
                                                {recipe.instructions ? `${recipe.instructions.substring(0, 100)}...` : "No instructions provided."}
                                            </p>
                                            <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted fs-5">No recipes available. Add some!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;