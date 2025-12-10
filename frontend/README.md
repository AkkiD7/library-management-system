# 📚 Suntel Library Management System – Frontend

A modern library management dashboard built using **React + TypeScript + Tailwind CSS**.

---

## 🚀 Tech Stack

- React + TypeScript  
- Tailwind CSS  
- Axios  
- React Router v6  
- Context API  
- Lucide Icons  

---

## 🛠️ Setup Instructions

### 1️⃣ Install dependencies
npm install

shell
Copy code

### 2️⃣ Create `.env` file
VITE_API_BASE_URL=http://localhost:5000

shell
Copy code

### 3️⃣ Start the frontend
npm run dev

yaml
Copy code

### App URL
http://localhost:5173/

---

## 🔑 Demo Login Credentials

### Admin
username: admin
password: Admin@123

yaml
Copy code

### User  
Register from `/register` page.

---

## 👤 User vs Admin Permissions

| Feature | User | Admin |
|--------|------|--------|
| Login / Register | ✅ | ✅ |
| View books | ✅ | ✅ |
| Search/Filter | ✅ | ✅ |
| Borrow/Return | ❌ | ✅ |
| Add new book | ❌ | ✅ |
| Edit book | ❌ | ✅ |
| Delete book | ❌ | ✅ |

---

## 📁 Folder Structure
src
├── assets/
├── components/
├── context/
├── lib/
├── pages/
├── types/
├── App.tsx
├── App.css
├── main.tsx
└── index.css

yaml
Copy code

---

## 📦 API Endpoints Used

- POST `/auth/login`
- POST `/auth/register`
- GET `/books`
- POST `/books`
- PUT `/books/:id`
- DELETE `/books/:id`
- PATCH `/books/:id/status`

---

## ✨ Features Implemented

✔ Login + Register  
✔ JWT Authentication  
✔ Protected Routes  
✔ Admin user only actions  
✔ Add / Edit / Delete books  
✔ Borrow/Return toggle  
✔ Search + Status filtering  
✔ Modal-based book form  
✔ Loading & validation UI  

---

## 👨‍💻 Developer

Created by **Akshay Dabhade**