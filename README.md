# **SunshineChat**

SunshineChat is a full-stack, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO. It provides a seamless and interactive chatting experience with features like user authentication, real-time messaging, and image sharing.

Live Demo
You can try the live application here: https://chat-app-pi-jet-19.vercel.app/

Features
User Authentication: Secure user registration and login functionality.

Real-Time Messaging: Instant messaging between users powered by Socket.IO.

User Presence: See which users are currently online.

Image Sharing: Share images in your conversations, which are uploaded to and served from Cloudinary.

Unread Message Count: Keep track of unread messages from other users.

Profile Customization: Users can update their profile information, including their name, bio, and profile picture.

Tech Stack
Frontend:

React

Vite

Tailwind CSS

Socket.IO Client

Axios

React Router

Backend:

Node.js

Express

MongoDB

Mongoose

Socket.IO

Cloudinary (for image uploads)

JWT (for authentication)

bcryptjs (for password hashing)

Deployment
Frontend (Client):

The frontend is deployed on Vercel.

The vercel.json file is configured with rewrites to ensure that all routes are handled by the single-page application's index.html file, which is standard for React Router applications.

Backend (Server):

The backend is deployed on Render.

Render was chosen because it supports persistent web services, which are necessary for maintaining the stateful WebSocket connections required by Socket.IO. This allows for a stable and continuous real-time communication channel between the client and the server.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js and npm (or yarn) installed on your machine.

A MongoDB Atlas account or a local MongoDB instance.

A Cloudinary account for image storage.

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/chat-app.git
cd chat-app
Install backend dependencies:

Bash

cd server
npm install
Install frontend dependencies:

Bash

cd ../client
npm install
Configuration
You'll need to set up environment variables for both the client and the server.

Server (server/.env):
Create a .env file in the server directory and add the following variables:

MONGODB_URI="your_mongodb_connection_string"
PORT=5000
JWT_SECRET="your_jwt_secret"

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
Client (client/.env):
Create a .env file in the client directory and add the following variable:

VITE_BACKEND_URL='http://localhost:5000'
Running the Application
Start the backend server:

Bash

cd server
npm run server
Start the frontend development server:

Bash

cd client
npm run dev
The application should now be running, with the frontend accessible at http://localhost:5173 (or another port if 5173 is in use) and the backend at http://localhost:5000.
