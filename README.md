# ⚡ Cyber Goals – Cyberpunk Themed AI-Powered Productivity App

Cyber Goals is a full-stack, cyberpunk-styled productivity web application that helps users set, track, and complete personal goals with futuristic flair. It also integrates OpenAI to provide smart recommendations for goal planning.

---

## 🌐 Live Demo

🚀 we haven't done a live yet, may be in future, as the billing methods are not set in open.ai as well as heroko.

---

## 📦 Features

- ✅ Create, update, and delete goals
- ✨ Get AI-powered suggestions based on your goal inputs
- 🔐 Secure login and registration using JWT
- 🎨 Neon cyberpunk UI with Tailwind CSS
- ☁️ Deployed using Heroku (monorepo setup)

---

## 🧰 Tech Stack

### Frontend:
- React
- Tailwind CSS
- Axios
- React Router

### Backend:
- Node.js + Express
- MongoDB + Mongoose
- OpenAI API
- JWT + bcrypt
- dotenv

---

## 📂 Project Structure

cyber-goals-app/
├── client/ # React frontend
├── server/ # Node.js backend


---

## 📪 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Goals
- `GET /api/goals/`
- `POST /api/goals/`
- `PUT /api/goals/:id`
- `DELETE /api/goals/:id`

### AI
- `POST /api/recommendations`

---

## 🚀 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/AeoN-interm/Cyber-Goals.git
cd Cyber-Goals

# Backend
cd server
npm install

# Frontend
cd ../client
npm install

server/.env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key

client/.env
REACT_APP_API_URL=http://localhost:5000

Run App
# In server/
node index.js

# In client/
npm start
