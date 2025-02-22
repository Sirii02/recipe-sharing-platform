import React from "react";
import { useParams } from "react-router-dom";

const recipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        image: "https://oldcutkitchen.com/wp-content/uploads/2020/04/IMG_4807.jpg",
        ingredients: ["Spaghetti", "Eggs", "Cheese", "Pancetta", "Pepper"],
        instructions: "Boil pasta, cook pancetta, mix eggs and cheese, and combine all.",
    },
    {
        id: 2,
        title: "Chicken Biryani",
        description: "A flavorful rice dish cooked with marinated chicken, spices, and herbs.",
        image: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg",
        ingredients: ["Chicken", "Rice", "Spices", "Yogurt", "Onions"],
        instructions: "Marinate chicken, cook rice, layer them together, and simmer.",
    },
    {
        id: 3,
        title: "Chocolate Cake",
        description: "A rich and moist chocolate cake with creamy frosting.",
        image: "https://www.lifeloveandsugar.com/wp-content/uploads/2014/08/Best-Moist-Chocolate-Cake1-1.jpg",
        ingredients: ["Flour", "Cocoa", "Eggs", "Butter", "Sugar"],
        instructions: "Mix ingredients, bake at 350°F, and apply frosting.",
    },
];

function RecipeDetails() {
    const { id } = useParams();
    const recipe = recipes.find((r) => r.id === parseInt(id));

    if (!recipe) {
        return <h2 className="text-center mt-5">Recipe Not Found</h2>;
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="img-fluid d-block mx-auto my-3" style={{ maxWidth: "600px" }} />
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
        </div>
    );
}

export default RecipeDetails;
