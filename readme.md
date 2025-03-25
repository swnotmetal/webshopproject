# Webshop Project

A full-stack e-commerce application built with React.js, Node.js, Express, GraphQL, and MongoDB.

***

## Project Structure

The project consists of two main parts:
- **webshopbackend**: The backend server built with Node.js, Express, and GraphQL
- **webshopfront**: The frontend application built with React.js and Material-UI

*****

## Features

- 🛒 Product browsing and shopping cart functionality
- 🔒 User authentication with JWT
- 🛠️ Admin dashboard for managing products and orders
- 📝 Order processing and management
- 💾 Persistent data storage with MongoDB

***

## Backend

### Technologies Used

- Node.js
- Express
- GraphQL (Apollo Server)
- MongoDB & Mongoose
- JWT Authentication
- TypeScript

*****

### API

The backend provides both REST API and GraphQL endpoints:

#### GraphQL API
- Query: `getProducts`, `getProduct`, `getUser`
- Mutation: `addProduct`, `deleteProduct`, `addEntry`, `createUser`, `login`

#### REST API
- `GET /products`: Get all products
- `GET /products/:id`: Get a specific product
- `POST /products`: Add a new product
- `DELETE /products/:id`: Delete a product
- `POST /products/:id/entries`: Add nutritional information to a product

***

### Models

- **Product**: Stores product details, including name, price, dates, and nutritional information
- **User**: Stores user accounts with hashed passwords

*****

## Frontend

### Technologies Used

- React.js
- Material-UI
- React Router
- Formik & Yup for form validation
- Context API for state management

***

### Pages

- **Home**: Displays all available products
- **Shopping Cart**: Manages cart items and checkout process
- **Confirmation**: Order confirmation page
- **Login**: User authentication
- **Admin**: Dashboard for managing products and orders

*****

### Context Providers

- **ShopContext**: Manages shopping cart functionality
- **OrderContext**: Manages order processing

***

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Git

*****

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/webshop-project.git
   cd webshop-project/webshopbackend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a .env file with your MongoDB connection string
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

*****

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd ../webshopfront
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a .env file
   ```bash
   REACT_APP_API_URL=http://localhost:4000
   ```

4. Start the development server
   ```bash
   npm start
   ```

*****

## Available Scripts

### Backend

- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server
- `npm run build` - Build TypeScript files
- `npm test` - Run tests

### Frontend

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App