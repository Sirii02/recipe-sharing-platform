import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create a reusable Axios instance
const apiClient = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" }
});

// Response interceptor for handling unauthorized requests
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("Unauthorized! Redirecting to login...");
            // Handle logout or redirection logic if needed
        }
        return Promise.reject(error);
    }
);

// Create headers for requests
const createHeaders = (token, isFileUpload) => ({
    ...(isFileUpload ? {} : { "Content-Type": "application/json" }),
    Authorization: token ? `Bearer ${token}` : "",
});

// Fetch all recipes
export const fetchRecipes = async () => {
    try {
        const response = await apiClient.get("/recipes");
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch recipes.");
    }
};

// Create a new recipe (supports image uploads)
export const createRecipe = async (recipeData, token) => {
    try {
        const isFileUpload = recipeData instanceof FormData;
        const response = await apiClient.post("/recipes", recipeData, {
            headers: createHeaders(token, isFileUpload),
        });
        return response.data;
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw new Error(error?.response?.data?.message || "Failed to create recipe.");
    }
};

// Update an existing recipe
export const updateRecipe = async (id, recipeData, token) => {
    try {
        const isFileUpload = recipeData instanceof FormData;
        const response = await apiClient.put(`/recipes/${id}`, recipeData, {
            headers: createHeaders(token, isFileUpload),
        });
        return response.data;
    } catch (error) {
        console.error("Error updating recipe:", error);
        throw new Error(error?.response?.data?.message || "Failed to update recipe.");
    }
};

// Delete a recipe
export const deleteRecipe = async (id, token) => {
    try {
        await apiClient.delete(`/recipes/${id}`, {
            headers: { Authorization: token ? `Bearer ${token}` : "" }
        });
    } catch (error) {
        console.error("Error deleting recipe:", error);
        throw new Error(error?.response?.data?.message || "Failed to delete recipe.");
    }
};