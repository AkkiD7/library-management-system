# 📚 Library Management System – Backend (Node.js + Express + MongoDB)

This is the backend for the **Library Management System**, built as part of the Suntel Global Take-Home Assignment.  
It includes:

- 🔐 JWT Authentication  
- 👤 User Registration & Login  
- 🛡 Role-Based Access Control (RBAC)  
- 📚 CRUD API for Books  
- 📏 Request Validation using Zod  
- 🧪 Full Test Coverage using Jest + Supertest  
- 🗂 Clean Folder Structure & Best Practices  

---

## 🚀 Tech Stack

- Node.js + Express  
- MongoDB + Mongoose  
- TypeScript  
- Zod  
- JWT (jsonwebtoken)  
- bcryptjs  
- Jest + Supertest (Integration tests)  
- dotenv  

---

## 📂 Project Structure

```
backend/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── tests/
│   ├── auth.test.ts
│   ├── books.test.ts
│   └── setupTestDB.ts
│
├── jest.config.cjs
├── tsconfig.json
└── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Create a `.env` file

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/library_db
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1h
```

### 3️⃣ Start the server

```
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 🔐 Authentication Endpoints

### ➤ POST /auth/register
Registers a new user (role defaults to **user**).

#### Request
```json
{
  "username": "john",
  "password": "password123"
}
```

### ➤ POST /auth/login
Authenticates a user and returns a JWT.

#### Request
```json
{
  "username": "john",
  "password": "password123"
}
```

---

## 🛡 Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| **User** | View books |
| **Admin** | Add / Edit / Delete books |

Admin-only routes use:

```
authMiddleware + allowRoles("admin")
```

---

## 📚 Books API

### ➤ GET /books  
**Any authenticated user**

### ➤ POST /books  
**Admin only**

### ➤ PUT /books/:id  
**Admin only**

### ➤ PATCH /books/:id/status  
Updates only the status.

### ➤ DELETE /books/:id  
**Admin only**

---

## 🧪 Running Tests (Jest + Supertest)

A separate test database is used:

```
library_test_db
```

### Run all tests:

```
npm test
```

### Test coverage includes:

- ✔ Register user  
- ✔ Login user  
- ✔ Get books  
- ✔ Create book  
- ✔ Update book  
- ✔ Update book status  
- ✔ Delete book  

---

## 👤 Admin User Setup (Auto-Seeded)

```
username: admin
password: Admin@123
role: admin
```

---

## 🧹 Request Validation (Zod)

All request bodies & params validated with Zod.

---

## 🏁 Conclusion


