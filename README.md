# 🌾 NourishNet — Full-Stack Food Donation Platform

A production-ready web application connecting food donors with communities in need.

---

## 🗂️ Project Structure

```
nourishnet/
├── backend/                  # Node.js + Express + MongoDB API
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── FoodDonation.js
│   │   ├── MonetaryDonation.js
│   │   └── Club.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── foodDonations.js
│   │   ├── monetaryDonations.js
│   │   ├── clubs.js
│   │   └── stats.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/                 # React + Vite SPA
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   ├── context/AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── FoodDonations.jsx
    │   │   ├── DonationDetail.jsx
    │   │   ├── DonateFoodForm.jsx
    │   │   ├── DonateMoneyPage.jsx
    │   │   ├── Clubs.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── About.jsx
    │   ├── utils/api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **Auth** | JWT login/register, role-based (donor / recipient / admin) |
| **Food Donations** | List, browse, filter, claim, complete, delete |
| **Monetary Donations** | Donate money with purpose, payment method, anonymous option |
| **Club Locator** | Find NourishNet hubs by city/state |
| **Dashboard** | My listings, claims, money donated, profile settings |
| **Stats API** | Real-time platform statistics on homepage |
| **Security** | Rate limiting, JWT auth middleware, input validation |

---

## 🚀 Local Setup (Development)

### Step 1 — Clone & install

```bash
git clone <your-repo-url>
cd nourishnet

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2 — Set up MongoDB Atlas (Free)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) and create a free account
2. Create a new **free M0 cluster**
3. Create a database user (username + password)
4. Whitelist IP: `0.0.0.0/0` (allow all, for development)
5. Click **Connect → Compass** and copy the connection string

### Step 3 — Configure backend environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nourishnet
JWT_SECRET=replace_with_a_long_random_string_at_least_32_chars
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Step 4 — Configure frontend environment

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 5 — Seed the database with clubs

Start the backend first, then run:
```bash
# In a separate terminal — first register as admin, then seed clubs
# Or use the curl command below after starting
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@nourishnet.in","password":"admin1234","role":"admin"}'
```

### Step 6 — Run both servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev      # runs on http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm run dev      # runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser. 🎉

---

## 🌐 Deployment

### Backend — Deploy to Render (Free)

1. Push `backend/` to GitHub (or the whole repo)
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add **Environment Variables** (same as `.env`):
   - `MONGODB_URI` → your Atlas URI
   - `JWT_SECRET` → your secret
   - `CLIENT_URL` → your Vercel frontend URL (e.g., `https://nourishnet.vercel.app`)
   - `NODE_ENV` → `production`
6. Deploy → copy the Render URL (e.g., `https://nourishnet-api.onrender.com`)

### Frontend — Deploy to Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Settings:
   - **Root Directory:** `frontend`
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add **Environment Variable**:
   - `VITE_API_URL` → `https://your-render-url.onrender.com/api`
5. Deploy → your site is live! 🚀

### Alternative: Railway (Backend)

Railway is even easier:
1. [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Select your repo → set root to `backend`
3. Add the same environment variables
4. Railway auto-detects Node.js and deploys

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Get current user |
| PUT | `/api/auth/profile` | Yes | Update profile |

### Food Donations
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/food-donations` | No | List available (filter: city, foodType, page) |
| GET | `/api/food-donations/:id` | No | Get single donation |
| POST | `/api/food-donations` | Yes | Create listing |
| PUT | `/api/food-donations/:id/claim` | Yes | Claim food |
| PUT | `/api/food-donations/:id/complete` | Yes | Mark done |
| DELETE | `/api/food-donations/:id` | Yes | Delete listing |
| GET | `/api/food-donations/user/my-donations` | Yes | My listings |
| GET | `/api/food-donations/user/my-claims` | Yes | Food I claimed |

### Monetary Donations
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/monetary-donations` | No | Recent public donations |
| POST | `/api/monetary-donations` | Yes | Make donation |
| GET | `/api/monetary-donations/my` | Yes | My donations |

### Clubs
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/clubs` | No | All clubs (filter: city, state) |
| GET | `/api/clubs/:id` | No | Club details |

### Stats
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/stats` | No | Platform statistics |

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, express-rate-limit

**Frontend:** React 18, React Router v6, Axios, react-hot-toast, date-fns, Lucide React

**Database:** MongoDB Atlas (free tier)

**Deploy:** Vercel (frontend) + Render or Railway (backend)

---

## 📈 Future Enhancements

- [ ] Razorpay payment gateway integration
- [ ] Email notifications (Nodemailer)
- [ ] Image uploads (Cloudinary)
- [ ] Google Maps embed in club locator
- [ ] Push notifications
- [ ] Admin panel
- [ ] Food expiry auto-cron jobs
- [ ] WhatsApp notification on claim

---

## 🤝 Contributing

Pull requests welcome! Please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License — free to use and modify.
