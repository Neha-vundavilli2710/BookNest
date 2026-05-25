BookNest - MERN Stack Online Book Store
A modern and full-featured MERN Stack Book Store application for browsing, searching, purchasing, and managing books online.
---
BookNest
![MERN](https://img.shields.io/badge/MERN-Stack-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-success)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Express](https://img.shields.io/badge/Framework-Express-black)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Responsive](https://img.shields.io/badge/UI-Responsive-orange)
---
Project Tagline
BookNest is a complete MERN Stack Online Book Store platform that allows users to discover books, manage carts, place orders, and enables administrators to manage books and users efficiently.
---
Live Demo
Frontend: https://book-nest-sage.vercel.app/
Backend API: https://booknest-backend-j93g.onrender.com
---
Project Overview
BookNest is a modern e-commerce web application specially designed for book lovers and online readers. The application provides a smooth and responsive experience where users can browse books, search for their favorite titles, view detailed book information, add books to their shopping cart, and place orders securely.
This project demonstrates a complete implementation of a MERN Stack application using:
MongoDB
Express.js
React.js
Node.js
The project follows scalable architecture, reusable component structure, REST API principles, authentication mechanisms, and responsive UI design.
---
Purpose of the Application
The main purpose of BookNest is to:
Simplify online book purchasing
Provide a modern bookstore platform
Demonstrate real-world MERN Stack development
Practice frontend-backend integration
Implement RESTful APIs
Manage database operations effectively
---
Problem It Solves
Traditional bookstores often face problems such as:
Limited accessibility
Manual inventory handling
Poor digital experience
Lack of online management systems
BookNest solves these problems by offering:
Online accessibility
Easy book discovery
Search and filtering
Authentication and security
Admin management system
Organized order handling
---
Target Users
Students
Book Readers
Online Customers
Developers learning MERN Stack
Administrators managing books and orders
---
Features
User Authentication
User Signup
User Login
JWT Authentication
Secure Password Hashing
Protected Routes
Authentication Middleware
---
Browse Books
Users can:
Explore all books
View categories
Check prices
Access book details
---
Search Functionality
Users can search books using:
Book title
Author name
Categories
Keywords
---
Shopping Cart
Features include:
Add to cart
Remove from cart
Quantity update
Dynamic price calculation
---
Book Details Page
Displays:
Book image
Book description
Author information
Pricing details
Ratings
Availability status
---
Order Management
Users can:
Place orders
View order history
Track purchased books
---
Admin Functionalities
Admin features include:
Add books
Edit books
Delete books
Manage users
Manage orders
---
Responsive UI
Fully responsive design supporting:
Desktop devices
Tablets
Mobile phones
---
API Integration
REST APIs
Axios integration
Backend communication
Dynamic data rendering
---
Database Management
MongoDB stores:
User information
Book data
Orders
Authentication details
---
Error Handling
Includes:
Backend validation
API error handling
Invalid route handling
Frontend notifications
Try-catch middleware handling
---
Tech Stack
Frontend Technologies
Technology	Purpose
React.js	Frontend Library
Vite	Build Tool
React Router DOM	Routing
Axios	API Requests
CSS / Tailwind CSS / Bootstrap	Styling
---
Backend Technologies
Technology	Purpose
Node.js	Runtime Environment
Express.js	Backend Framework
JWT	Authentication
bcryptjs	Password Security
dotenv	Environment Variables
---
Database
Technology	Purpose
MongoDB	NoSQL Database
Mongoose	MongoDB ODM
---
Tools & Libraries
Git
GitHub
Postman
Nodemon
ESLint
npm
---
Project Folder Structure
```bash
BookNest/
│
├── Frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── screenshots/
├── README.md
└── .gitignore
```
---
Folder Explanation
Frontend Folder
Folder	Description
assets	Images and static files
components	Reusable UI components
pages	Application pages
services	API handling
routes	Route configuration
hooks	Custom React hooks
context	Global state management
utils	Utility/helper functions
---
Backend Folder
Folder	Description
config	Database configuration
controllers	Business logic
middleware	Authentication middleware
models	MongoDB schemas
routes	API routes
utils	Helper functions
uploads	Uploaded images/files
---
Installation & Setup Guide
Prerequisites
Install the following before running the project:
Node.js
MongoDB
Git
npm
---
Clone Repository
```bash
git clone https://github.com/Neha-vundavilli2710/BookNest
```
```bash
cd BookNest
```
---
Frontend Setup
```bash
cd Frontend
```
Install dependencies:
```bash
npm install
```
Run frontend:
```bash
npm run dev
```
---
Backend Setup
```bash
cd Backend
```
Install dependencies:
```bash
npm install
```
Run backend:
```bash
npm run dev
```
or
```bash
nodemon server.js
```
---
Environment Variables
Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```
---
Backend `.env`
```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/booknest

JWT_SECRET=your_jwt_secret_key

NODE_ENV=development
```
---
Running the Project
Start Backend
```bash
cd Backend
npm run dev
```
---
Start Frontend
```bash
cd Frontend
npm run dev
```
---
Build Commands
```bash
npm run build
```
---
API Endpoints
Endpoint	Method	Purpose
/api/auth/register	POST	Register User
/api/auth/login	POST	Login User
/api/books	GET	Get All Books
/api/books/:id	GET	Get Single Book
/api/cart	POST	Add Book To Cart
/api/cart/:id	DELETE	Remove Book From Cart
/api/orders	POST	Place Order
/api/orders/user	GET	Get User Orders
/api/admin/books	POST	Add New Book
/api/admin/books/:id	PUT	Update Book
/api/admin/books/:id	DELETE	Delete Book
---
Screenshots
Home Page
```md
Add screenshot here:
screenshots/home-page.png
```
---
Login Page
```md
Add screenshot here:
screenshots/login-page.png
```
---
Cart Page
```md
Add screenshot here:
screenshots/cart-page.png
```
---
Admin Dashboard
```md
Add screenshot here:
screenshots/admin-dashboard.png
```
---
Book Details Page
```md
Add screenshot here:
screenshots/book-details-page.png
```
---
Application Workflow
```text
Frontend (React.js)
        ↓
API Requests (Axios)
        ↓
Backend Server (Node.js + Express.js)
        ↓
Routes
        ↓
Controllers
        ↓
MongoDB Database
        ↓
Response Sent Back
        ↓
Frontend UI Updates
```
---
Workflow Explanation
Users interact with the frontend UI.
React sends API requests using Axios.
Express receives API requests.
Routes forward requests to controllers.
Controllers handle business logic.
MongoDB stores and retrieves data.
Responses are returned to the frontend.
React dynamically updates the UI.
---
Challenges Faced
Challenge	Solution
Authentication Handling	Implemented JWT authentication
State Management	Used Context API
API Integration	Structured Axios services
Database Design	Created proper MongoDB schemas
Error Handling	Added middleware validations
Routing Issues	Configured React Router correctly
---
Future Enhancements
Online Payment Integration
Wishlist Feature
Book Reviews & Ratings
Dark Mode
Pagination
Advanced Search Filters
Email Notifications
Cloud Image Uploads
Order Tracking
AI-based Recommendations
---
Deployment
Frontend Deployment
Recommended Platforms:
Vercel
Netlify
Build frontend:
```bash
npm run build
```
---
Backend Deployment
Recommended Platforms:
Render
Railway
Cyclic
Make sure environment variables are configured properly during deployment.
---
Testing
Frontend Testing
```bash
npm test
```
---
Backend Testing
```bash
npm run test
```
---
GitHub Repository Setup
Initialize Git
```bash
git init
```
---
Add Files
```bash
git add .
```
---
Commit Changes
```bash
git commit -m "Initial Commit"
```
---
Push to GitHub
```bash
git remote add origin https://github.com/Neha-vundavilli2710/BookNest
git branch -M main
git push -u origin main
```
---
Database Schema Overview
User Schema
Contains:
Name
Email
Password
Role
Orders
---
Book Schema
Contains:
Title
Author
Category
Price
Description
Image URL
---
Order Schema
Contains:
User Information
Ordered Books
Total Amount
Payment Status
Order Date
---
Best Practices Used
Modular folder structure
REST API architecture
Environment variable protection
Reusable React components
Secure password hashing
Clean code structure
Error handling middleware
---
Contributing
Contributions are welcome.
Steps to contribute:
Fork the repository
Create a feature branch
```bash
git checkout -b feature-name
```
Commit changes
```bash
git commit -m "Added new feature"
```
Push changes
```bash
git push origin feature-name
```
Open a Pull Request
---
License
This project is licensed under the MIT License.
---
Author
Neha Vundavilli
MERN Stack Developer
GitHub: https://github.com/Neha-vundavilli2710
Email: nehavundavilli27@gmail.com
---
Acknowledgements
Special thanks to:
MongoDB Documentation
React Documentation
Node.js Community
Express.js Documentation
Open Source Community
---
Support
If you like this project:
Star the repository
Fork the repository
Share the project
---
Final Note
BookNest is a complete MERN Stack Book Store application built to demonstrate modern full-stack development concepts including authentication, API integration, database management, responsive UI design, and scalable architecture.
This project is ideal for:
Learning MERN Stack
Academic Projects
Portfolio Showcase
Full Stack Practice
Real-world Development Experience