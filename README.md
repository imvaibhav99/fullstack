frontend):

# Full-Stack Note-Taking Application

This is a full-stack note-taking application built with **MERN stack** (MongoDB, Express.js, React.js, Node.js) and TypeScript. The project includes user authentication, note management, and a responsive frontend UI.

---

## Project Structure



fullstack/
│
├─ backend/ # Node.js + Express backend
│ ├─ src/
│ │ ├─ index.ts # Entry point
│ │ ├─ middleware/ # Authentication middleware
│ │ ├─ models/ # Mongoose models (User, Note)
│ │ ├─ routes/ # API routes (auth, notes)
│ │ └─ services/ # Email or other services
│ ├─ package.json
│ └─ tsconfig.json
│
└─ frontend/ # React + TypeScript frontend
├─ src/
│ ├─ pages/ # Pages (SignIn, SignUp, Dashboard)
│ ├─ assets/ # Images, icons
│ ├─ App.tsx
│ └─ styles.css
├─ index.html
├─ package.json
└─ vite.config.ts


---

## Features

- User sign-up and login with email & OTP or Google account.
- Dashboard to manage notes (create, update, delete).
- Responsive design for desktop and mobile.
- Secure authentication using JWT.
- TypeScript for type safety.

---

## Installation

### Backend

1. Go to the backend folder:

```bash
cd backend


Install dependencies:

npm install


Set up environment variables:

Create a .env file with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


Start the server:

npm run dev


Backend runs on http://localhost:5000.

Frontend

Go to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the development server:

npm run dev


Frontend runs on http://localhost:5173 (Vite default).

Usage

Open the app in your browser.

Sign up or log in.

Create, edit, or delete notes.

Log out using the dashboard button.

Tech Stack

Frontend: React.js, TypeScript, Vite, Tailwind CSS (or custom CSS)

Backend: Node.js, Express.js, TypeScript

Database: MongoDB + Mongoose

Authentication: JWT

Email Service: Nodemailer for OTP
