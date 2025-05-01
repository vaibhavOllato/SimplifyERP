# SimplifyERP

SimplifyERP is a modular ERP (Enterprise Resource Planning) solution tailored for shop management, built with the **MERN stack** and role-based access. It includes separate portals for **shop users** and **admins**, enabling efficient product, inventory, and user management.

---

## 🏗️ Project Structure


---

## 🚀 Tech Stack

- **Frontend (Shop)**: React + Tailwind CSS + Axios + Vite
- **Admin Panel**: React + Tailwind CSS + React Router + Lucide + Axios
- **Backend**: Node.js + Express + MongoDB + JWT Auth
- **Styling**: Tailwind CSS
- **Authentication**: Token-based (JWT), Local Storage

---

## 🧩 Features

### 🔐 Authentication
- Admin login with JWT token.
- Protected routes for admin pages.
- Persistent auth with localStorage.

### 🛒 Shop (User) Frontend
- Product listing with size/color variations.
- Inventory visibility.
- Order placement and status tracking.
- Customer dashboard.

### 🛠️ Admin Panel
- **Dashboard**: View key analytics.
- **Manage Shops**: Add, edit, activate, or deactivate shop accounts.
- **Manage Users**: Handle user roles and access.
- **Reports & Analytics**: View and export usage, sales, and inventory data.
- **Logout Modal**: Secure logout with confirmation.

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/simplifyERP.git
cd simplifyERP


cd backend
npm install
npm run dev
# API runs on http://localhost:5000


cd ../admin
npm install
npm run dev
# Admin panel on http://localhost:5173/admin/login



cd ../frontend
npm install
npm run dev
# Shop frontend on http://localhost:3000


📂 Folder Highlights
/backend/routes — Auth, Products, Shops, Users

/admin/pages — Dashboard, Manage Shops, Manage Users, Login

/frontend/pages — Home, Products, Orders, Profile



📈 Future Enhancements
Multi-language support

Role-specific permissions

Advanced reporting with charts

Mobile responsive UI

Subscription plans for shop owners



---

Would you like me to include screenshots or setup scripts in the README as well?
