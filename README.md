Recipe Sharing Platform

A simple web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to share, view, and manage recipes.

Features

- User authentication (sign up, login)
- CRUD operations for recipes
- Real-time updates for recipes using Socket.io
- Recipe image upload
- Search and filter recipes

]Tech Stack

- Frontend: React.js, Bootstrap
- Backend: Node.js, Express.js, MongoDB, Socket.io
- Authentication: JWT, bcrypt

Installation

1. Clone the repo:
   git clone https://github.com/your-username/recipe-sharing-platform.git

2. Install backend dependencies:
   cd backend
   npm install

3. Install frontend dependencies:
   cd frontend
   npm install

4. Set up environment variables in .env for the backend (MongoDB URI, JWT secret).

5. Start the backend and frontend:
   npm run dev

6. Open the app in the browser at `http://localhost:5173/`.

API Endpoints

-POST /api/auth/register: Register a new user
-POST /api/auth/login: Login
-GET /api/recipes: Get all recipes
-POST /api/recipes: Create a new recipe
-GET /api/recipes/:id: Get a single recipe


