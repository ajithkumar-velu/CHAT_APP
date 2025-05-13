# 💬 Real-Time Chat Application (Group & Private Messaging)

A full-stack real-time chat application built using the **MERN Stack**, supporting **private chat**, **group chat**, **user status**, **emojis**, and more — with **Socket.IO** for real-time communication.

🔗 **Live Demo:** [chat-app-frontend-qss7.onrender.com](https://chat-app-frontend-qss7.onrender.com)  
📂 **GitHub:** [github.com/ajithkumar-velu/CHAT_APP](https://github.com/ajithkumar-velu/CHAT_APP)

---

## ⚙️ Features

- 💬 Private and Group Chats  
- 👥 Create, Update, and Manage Groups  
- ➕➖ Add / Remove Users in Groups  
- 👤 User Profile  
- ⌨️ Typing Indicator  
- 🟢🔴 Online / Offline Status  
- 😊 Emoji Support  
- 🧹 Clear Chat History  
- 🔐 JWT Authentication & Authorization  
- 📡 Real-Time Messaging with Socket.IO  

---

## 🛠 Tech Stack

**Frontend:**  
- React.js  
- TailwindCSS + DaisyUI  
- Socket.IO Client  
- Vite

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT for Authentication  
- Cloudinary for Image Uploads  
- Socket.IO for real-time functionality  

---

## 📦 Environment Variables

### 🔐 Backend `.env`
```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL= your_frontend_url
SAMESITE=None
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

### 🔐 Frontend `.env`
VITE_BACKEND_URL=https://your-backend-api-url


git clone https://github.com/ajithkumar-velu/CHAT_APP.git
cd CHAT_APP

cd backend
npm install
# Create a .env file and add environment variables as shown above
npm start

cd frontend
npm install
# Create a .env file and add VITE_BACKEND_URL
npm run dev



---

Let me know if you want a version with screenshots, badges, or instructions for using **Postman** to test APIs.





