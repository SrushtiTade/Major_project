# 🏡 WanderLust – Airbnb Clone

A full-stack Airbnb-inspired web application that allows users to explore, create, manage, and review property listings. Built using **Node.js, Express.js, MongoDB, and EJS**, the project follows the **MVC Architecture** and implements secure user authentication, authorization, image uploads, and complete CRUD operations.

---

## ✨ Features

### 🔐 User Authentication

* User Registration (Sign Up)
* User Login
* User Logout
* Secure password hashing using Passport.js
* Persistent login sessions

### 🏡 Property Listings

* View all property listings
* View detailed listing information
* Create new listings
* Edit existing listings
* Delete listings
* Upload property images

### 📸 Image Upload

* Upload images using Cloudinary
* File handling with Multer
* Cloud-based image storage

### ⭐ Reviews & Ratings

* Add reviews and ratings
* Delete reviews
* Display reviews on individual listing pages

### 🛡 Authorization & Security

* Authentication using Passport.js
* Authorization for listing ownership
* Authorization for review ownership
* Server-side validation using Joi
* Express Session management
* Flash messages for user feedback
* Centralized error handling middleware

### 🎨 User Interface

* Responsive design using Bootstrap 5
* Clean and user-friendly interface
* Reusable EJS layouts with EJS Mate

---

# 🛠 Tech Stack

## Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* EJS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication & Security

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session
* Connect Flash

## File Upload & Storage

* Cloudinary
* Multer
* Multer Storage Cloudinary

## Validation & Utilities

* Joi
* Method Override
* Dotenv
* EJS Mate

---

# 📂 Project Structure

```text
Major_project/
│
├── controllers/
├── init/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
│
├── routes/
├── utils/
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── middleware.js
├── cloudConfig.js
├── schema.js
├── app.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/SrushtiTade/Major_project.git
cd Major_project
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Configure Environment Variables

Create a `.env` file and add your MongoDB and Cloudinary credentials.

## 4️⃣ Start the Application

```bash
npm start
```

or

```bash
nodemon app.js
```

## 5️⃣ Open in Browser

```
http://localhost:8080
```

---

# 📚 Concepts Implemented

* MVC Architecture
* RESTful Routing
* CRUD Operations
* Authentication
* Authorization
* Middleware
* Session Management
* Server-side Validation
* File Uploads
* Cloud Storage Integration
* Error Handling
* Flash Messages

---

# 🚀 Future Enhancements

* 🔍 Search and Filter Listings
* 🗺 Google Maps Integration
* ❤️ Wishlist / Favorites
* 📅 Booking System
* 💳 Payment Gateway Integration
* 👤 User Profile Dashboard
* 📧 Email Verification
* 🌙 Dark Mode

---

# 👩‍💻 Author

**Srushti Tade**

Computer Science Engineering Student

GitHub: https://github.com/SrushtiTade

---

## ⭐ Support

If you found this project helpful or interesting, please consider giving it a **⭐ Star** on GitHub. Your support is greatly appreciated!
