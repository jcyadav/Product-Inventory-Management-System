<img width="1920" height="1080" alt="Screenshot (126)" src="https://github.com/user-attachments/assets/a36e2871-a2b4-4dca-b39b-236930606557" />
<img width="1920" height="1080" alt="Screenshot (127)" src="https://github.com/user-attachments/assets/afcc15e0-a377-4eb0-9d90-77689dbd11e1" />
<img width="1920" height="1080" alt="Screenshot (128)" src="https://github.com/user-attachments/assets/cda40c74-b849-435d-bcc3-8d9dab227cf8" />


# Product Inventory Management System

This is a simple full-stack CRUD project for managing products.  
It allows users to add, view, update, delete, and search products.

---

## Features

- Add Product
- View Product List
- Update Product
- Delete Product
- Search Product by name
- Filter by category

---

## Tech Stack

Frontend:
- React.js
- JavaScript
- Bootstrap / Tailwind CSS
- Axios

Backend:
- Laravel (REST API)
- PHP
- MySQL

---

## Setup Instructions

---

## Backend Setup (Laravel)

### Step 1: Clone Project
git clone <repo-url>
cd backend

### Step 2: Install Dependencies
composer install

### Step 3: Create .env file
cp .env.example .env

### Step 4: Database Configuration (.env)

DB_DATABASE=your_database_name  
DB_USERNAME=root  
DB_PASSWORD=

### Step 5: Run Migrations
php artisan migrate

### Step 6: Start Server
php artisan serve

Backend URL:
http://127.0.0.1:8000

---

## 🔹 Frontend Setup (React)

### Step 1: Go to frontend folder
cd frontend

### Step 2: Install dependencies
npm install

### Step 3: Run project
npm run dev

Frontend URL:
http://localhost:5173

---

## 🔗 API Endpoints

- POST   /api/products → Add Product  
- GET    /api/products → Get All Products  
- GET    /api/products/{id} → Get Single Product  
- PUT    /api/products/{id} → Update Product  
- DELETE /api/products/{id} → Delete Product  

---

## Database Table Structure

Table: products

- id (Primary Key)
- name (string)
- category (string)
- price (decimal)
- quantity (integer)
- description (text)
- created_at (timestamp)

---

## Notes

- Backend must run before frontend
- API base URL should be correct in frontend
- Run migrations before using project

---

## FullStack Developer

Name: Jaichand Yadav  
Project: Product Inventory Management System (Task Submission)
