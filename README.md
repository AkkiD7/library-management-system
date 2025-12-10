# 📚 Suntel Library Management System

A full-stack library management application built with modern web technologies.

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Vitest** for testing

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Jest** for testing

### Features
- Role-based access control (User & Admin)
- RESTful API architecture
- Secure authentication system
- Book management operations

---

## 🏗️ Project Structure

```
/
├── backend/           # Express REST API
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── .env
│
├── frontend/          # React application
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md          # This file
```

---

## 🚀 Features

### 👤 Regular User Capabilities
- **Authentication**: Register new account and login
- **Browse Books**: View complete book catalog
- **Search & Filter**: Find books by title, author, or genre
- **Borrowing**: Check out available books
- **Returns**: Return borrowed books

### 👨‍💼 Admin Capabilities
All user features, plus:
- **Add Books**: Create new book entries
- **Edit Books**: Update book information
- **Delete Books**: Remove books from catalog
- **Status Management**: Update book availability status

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd suntel-library-management
```

### 2️⃣ Backend Setup

Navigate to backend directory:
```bash
cd backend
npm install
```

Create `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library_db
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=1d
```

**Important**: Replace `your-super-secret-key-change-this` with a secure random string.

Start the backend server:
```bash
npm run dev
```

The API will be available at: `http://localhost:5000`

Run backend tests:
```bash
npm test
```

### 3️⃣ Frontend Setup

Open a new terminal and navigate to frontend directory:
```bash
cd frontend
npm install
```

Create `.env` file in the `frontend` folder:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at: `http://localhost:5173` (or the port shown in terminal)


---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Add new book (Admin only)
- `PUT /api/books/:id` - Update book (Admin only)
- `DELETE /api/books/:id` - Delete book (Admin only)

### Borrowing
- `POST /api/borrow/:bookId` - Borrow a book
- `POST /api/return/:bookId` - Return a book

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 🔐 Default Admin Credentials

After seeding the database, you can use:
- **Email**: admin@suntel.com
- **Password**: admin123

**Note**: Change these credentials in production!

---

## 📝 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/library_db |
| JWT_SECRET | Secret key for JWT | your-secret-key |
| JWT_EXPIRES_IN | Token expiration time | 1d |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API URL | http://localhost:5000 |

---

## 🚢 Production Deployment

### Backend
1. Set production environment variables
2. Build the application: `npm run build`
3. Start with: `npm start`

### Frontend
1. Set production API URL in `.env`
2. Build the application: `npm run build`
3. Serve the `dist` folder using a static server or deploy to platforms like Vercel, Netlify, etc.

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your connection string is correct
- Check firewall settings for MongoDB port (27017)

### Port Already in Use
- Change the PORT in backend `.env` file
- Update VITE_API_BASE_URL in frontend `.env` accordingly

### CORS Errors
- Verify the frontend URL is allowed in backend CORS configuration
- Check that VITE_API_BASE_URL matches your backend URL

---

## 📄 License

This project is created as a take-home assignment for educational purposes.

---

## 👥 Contributing

This is a take-home assignment project. For improvements or bug fixes:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📧 Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for Suntel Library Management**