# 🌾 NourishNet — Food Donation Platform

NourishNet is a full-stack web application that helps reduce food waste by connecting food donors with communities in need. Users can register, post food donations, browse available donations, and claim food through an easy-to-use platform.

---

## 🌐 Live Demo

Frontend: https://nourishnet-web.netlify.app
Backend API: https://nourishnet-backend-sedj.onrender.com

---

## 📂 Project Structure

```
nourishnet/
├── backend/        # Node.js + Express API
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/       # React + Vite application
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── utils/
    └── index.html
```

---

## ✨ Features

* User registration and login (JWT authentication)
* Create and browse food donation listings
* Claim available food donations
* Dashboard to manage donations
* Monetary donation support
* Club locator for donation centers

---

---
## 📸 Screenshots

### Application Preview

![](ss/1.png)

| | |
|---|---|
| ![](ss/2.png) | ![](ss/3.png) |
| ![](ss/4.png) | ![](ss/5.png) |
| ![](ss/6.png) | ![](ss/7.png) |
| ![](ss/8.png) | ![](ss/9.png) |
| ![](ss/10.png) | ![](ss/11.png) |
| ![](ss/12.png) | ![](ss/13.png) |

---
## 🛠 Tech Stack

Frontend

* React
* Vite
* Axios
* React Router

Backend

* Node.js
* Express.js
* JWT Authentication

Database

* MongoDB Atlas

Deployment

* Frontend: Netlify
* Backend: Render

---

## 🚀 Local Setup

Clone the repository:

```
git clone <repo-url>
cd nourishnet
```

Install dependencies:

```
cd backend
npm install

cd ../frontend
npm install
```

Create environment files.

Backend `.env`

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
```

Run the project.

Backend:

```
cd backend
npm run dev
```

Frontend:

```
cd frontend
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 📄 License

MIT License
