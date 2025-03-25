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