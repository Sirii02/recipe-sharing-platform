import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../api/recipeApi";

function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
        getRecipes();
    }, []);

    return (
        <div className="container mt-4 text-center">
            <h1 className="display-4">Welcome to Recipe Sharing Platform</h1>
            <p className="lead">Discover and share delicious recipes with the community!</p>

            {/* Bootstrap Carousel */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ maxWidth: "1100px", margin: "auto" }}>
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{ height: "700px", objectFit: "cover" }}>
                        <img src="https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4117-feature.jpg" className="d-block w-100" alt="Cake"/>
                    </div>
                    <div className="carousel-item" style={{ height: "700px", objectFit: "cover" }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vada_Pav-Indian_street_food.JPG/640px-Vada_Pav-Indian_street_food.JPG" className="d-block w-100" alt="Vada Pav"/>
                    </div>
                    <div className="carousel-item" style={{ height: "700px", objectFit: "cover" }}>
                        <img src="https://www.recipesaresimple.com/wp-content/uploads/2018/06/Kozhikodan-Biriyani-youtube.jpeg" className="d-block w-100" alt="Biriyani"/>
                    </div>
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

            {/* Recipe List Section */}
            <div className="mt-5">
                <h2>Latest Recipes</h2>
                <div className="row">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <div key={recipe._id} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={recipe.image} className="card-img-top" alt={recipe.title} style={{ height: "200px", objectFit: "cover" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.title}</h5>
                                        <p className="card-text">{recipe.instructions.substring(0, 100)}...</p>
                                        <a href={`/recipe/${recipe._id}`} className="btn btn-primary">View Details</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No recipes available. Add some!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;