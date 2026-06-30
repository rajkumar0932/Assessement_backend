# Products API + Dashboard

A small full-stack project I built as part of a backend internship assignment. It's a
Products management app — a REST API for the products (with login/signup and JWT auth)
and a React dashboard on top of it where you can sign up, log in, add products and browse
them.

The whole thing is split into two folders:

```
Backend/    -> Node + Express + MongoDB API
Frontend/   -> React (Vite) + Tailwind dashboard
```

## Live demo

- **App (frontend):** https://assessement-backend.vercel.app
- **API (backend):** https://assessementbackend-production.up.railway.app

## What it does

- Sign up / log in with email + password (passwords are hashed with bcrypt)
- JWT-based auth — you can't touch the product routes unless you're logged in
- Full CRUD for products
- A few extra "query" endpoints the assignment asked for: featured products,
  products under a certain price, and products above a certain rating
- A React frontend with form validation (required fields, price must be digits, etc.)

## Tech used

**Backend:** Node.js, Express 5, MongoDB (Atlas), Mongoose, JWT (`jsonwebtoken`),
bcryptjs, cookie-parser, cors, dotenv.

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Axios.

## Product model

| Field      | Type    | Notes                          |
|------------|---------|--------------------------------|
| ProductID  | String  | required, unique               |
| Name       | String  | required                       |
| Price      | Number  | required                       |
| Featured   | Boolean | for featured products          |
| Rating     | Number  | 0 to 5                         |
| Company    | String  | required                       |
| createdAt  | Date    | added automatically            |

## API routes

Auth:

```
POST   /user/register          create an account
POST   /user/login             log in, returns an access token
POST   /user/forget-password   reset password
```

Products (all of these need a valid token):

```
GET    /products                       get all products
POST   /products                       add a product
PUT    /products/:id                   update a product
DELETE /products/:id                   delete a product
GET    /products/featured              only featured products
GET    /products/price?value=500       products cheaper than 500
GET    /products/rating?value=4        products rated higher than 4
```

The token can be sent either as a cookie or as an `Authorization: Bearer <token>` header.
The frontend uses the header approach.

## Running it locally

You'll need Node.js and a MongoDB connection string (I used a free MongoDB Atlas cluster).

### 1. Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```
PORT=2200
DATABASE_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=some_random_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=another_random_secret
REFRESH_TOKEN_EXPIRY=7d
ALLOWEDSITE=http://localhost:5173
```

Then start it:

```bash
npm run dev
```

The API runs at `http://localhost:2200`.

### 2. Frontend

In a second terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file inside `Frontend/`:

```
VITE_API_URL=http://localhost:2200
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173`, sign up, log in, and you're in.

## Project structure

```
Backend/
  src/
    controller/    register, login, product handlers
    database/      mongoose connection
    middleware/    auth middleware (verifies the JWT)
    model/         user and product schemas
    router/        user and product routes
    app.js         express app + middleware
    index.js       entry point

Frontend/
  src/
    components/    reusable Field input
    pages/         Login, Signup, Products
    api.js         axios instance (attaches the token)
    App.jsx        routes + navbar
```

## Notes

- `.env` files are gitignored — don't commit your secrets.
- The product routes are protected on purpose, so the frontend redirects you to the
  login page if you're not authenticated.
