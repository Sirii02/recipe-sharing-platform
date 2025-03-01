import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchRecipes = async () => {
    const response = await axios.get(`${API}/recipes`);
    return response.data;
};

export const createRecipe = async (recipeData, token) => {
    const response = await axios.post(`${API}/recipes`, recipeData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const deleteRecipe = async (id, token) => {
    await axios.delete(`${API}/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
