import React from "react";
import RecipeCard from "../components/RecipeCard";

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    image: "https://oldcutkitchen.com/wp-content/uploads/2020/04/IMG_4807.jpg",
  },
  {
    id: 2,
    title: "Chicken Biryani",
    description: "A flavorful rice dish cooked with marinated chicken, spices, and herbs.",
    image: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg",
  },
  {
    id: 3,
    title: "Chocolate Cake",
    description: "A rich and moist chocolate cake with creamy frosting.",
    image: "https://www.lifeloveandsugar.com/wp-content/uploads/2014/08/Best-Moist-Chocolate-Cake1-1.jpg",
  },
  {
    id: 4,
    title: "Margherita Pizza",
    description: "A simple yet delicious pizza topped with fresh tomatoes, mozzarella, and basil.",
    image: "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067",
  },
  {
    id: 5,
    title: "Masala Dosa",
    description: "A South Indian breakfast dish of a crispy crepe stuffed with spiced potatoes, onions, and other spices.",
    image: "https://pipingpotcurry.com/wp-content/uploads/2020/11/Dosa-recipe-plain-sada-dosa-Piping-Pot-Curry.jpg",
  },
  {
    id: 6,
    title: "MysorePak",
    description: "A traditional South Indian sweet made with gram flour, ghee, and sugar.",
    image: "https://bansiwala.co.in/cdn/shop/files/MysorePak_01.jpg?v=1698482887&width=533",
  },
  {
    id: 7,
    title: "Pav Bhaji",
    description: "A spiced mixture of mashed vegetables in a thick gravy served with bread.",
    image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Instant-Pot-Mumbai-Pav-Bhaji-Recipe.jpg",
  },
  {
    id: 8,
    title: "Caesar Salad",
    description: "A fresh and crunchy salad with romaine lettuce, croutons, parmesan, and Caesar dressing.",
    image: "https://www.noracooks.com/wp-content/uploads/2022/06/vegan-caesar-salad-4.jpg",
  },
  {
    id: 9,
    title: "Blueberry Muffins",
    description: "Soft and fluffy muffins filled with juicy blueberries.",
    image: "https://bakerbynature.com/wp-content/uploads/2011/05/Blueberry-Muffins-1-of-1.jpg",
  }
];

function Recipes() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Culinary Canvas</h1>
      <div className="row g-2 justify-content-center">
        {recipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
