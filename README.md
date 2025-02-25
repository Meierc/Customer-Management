# Customer Management 🚀

A full-stack project built with Vue.js (frontend) and Node.js (backend) for managing customers.

## 📌 Technologies Used

-   **Frontend:** Vue 3 with TypeScript & Vuetify
-   **Backend:** Node.js with Express & MongoDB
-   **Database:** MongoDB Atlas

## 🛠 Setup & Installation

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/Meierc/Customer-Management.git
cd Customer-Management
```

🔹 2. Set Up the Backend

```bash
cd customer-management-backend
npm install
```

🔹 Create a .env file (not included in the repo):

```ini
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/customer-management
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend:

````bash
npm run dev
🔹 3. Set Up the Frontend
```bash
cd ../customer-management-frontend
npm install
npm run dev
```
✅ Features
JWT-based authentication (Login & Registration)
CRUD operations for customers
Secure access control
Responsive UI with Vuetify
MongoDB Atlas for data storage
````
