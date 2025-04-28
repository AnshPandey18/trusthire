# Node.js Backend API

A robust RESTful API built with Node.js, Express, and MongoDB.

## Features

- RESTful API with Express
- MongoDB integration with Mongoose
- JWT Authentication
- User management (register, login, profile)
- Product management (CRUD operations)
- Data validation
- Error handling
- API documentation with Swagger
- Environment configuration

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Create a `.env` file based on `.env.example`
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

### Seeding Database

To seed the database with sample data:

```bash
node src/data/seeder.js
```

To clear the database:

```bash
node src/data/seeder.js -d
```

## API Documentation

Access the API documentation at:

```
http://localhost:5000/api-docs
```

## Available Endpoints

### Authentication
- POST /api/v1/auth/login - Login a user

### Users
- POST /api/v1/users - Register a new user
- GET /api/v1/users/profile - Get user profile (authenticated)
- PUT /api/v1/users/profile - Update user profile (authenticated)
- GET /api/v1/users - Get all users (admin only)

### Products
- GET /api/v1/products - Get all products
- GET /api/v1/products/:id - Get product by ID
- POST /api/v1/products - Create a product (admin only)
- PUT /api/v1/products/:id - Update a product (admin only)
- DELETE /api/v1/products/:id - Delete a product (admin only)

## Environment Variables

The following environment variables are required:

- PORT - Server port (default: 5000)
- NODE_ENV - Environment (development/production)
- MONGODB_URI - MongoDB connection string
- JWT_SECRET - Secret key for JWT
- JWT_EXPIRES_IN - JWT expiration time