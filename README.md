# 🐾 Bunny & Bark — Online Toy Store

A full-stack e-commerce web application for an online toy store, built as coursework project. The platform allows customers to browse products, manage a cart, and checkout with Stripe payments, while admins can manage products, categories, and announcements through a protected dashboard.

---

## 🚀 Tech Stack

### Frontend (Client)
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| Axios | HTTP requests to backend API |
| Stripe (React & JS SDK) | Payment processing |
| Socket.IO Client | Real-time live feed |
| Lucide React | Icon library |

### Backend (Server)
- Node.js / Express (referenced in CI workflow)
- REST API running on port `5000` by default

### CI/CD
- GitHub Actions — runs on every push, installs backend dependencies and verifies the build

---

## 📁 Project Structure

```
e-commerce-toy-store/
├── .github/
│   └── workflows/
│       └── main.yml          # GitHub Actions CI pipeline
├── client/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # Axios instance with base URL & credentials
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── BestSellers.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── CategorySidebar.jsx
│   │   │   ├── CheckoutForm.jsx  # Stripe payment form
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── LiveFeed.jsx      # Real-time Socket.IO feed
│   │   │   ├── Navbar.jsx
│   │   │   └── layouts/
│   │   │       ├── AdminProtectLayout.jsx
│   │   │       ├── ProtectLayout.jsx
│   │   │       └── RootLayout.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Authentication state (login/logout/user)
│   │   │   └── CartContext.jsx   # Shopping cart state
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Account.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageProducts.jsx
│   │   │       ├── ManageCategories.jsx
│   │   │       └── ManageAnnouncements.jsx
│   │   ├── main.jsx          # App entry point & route definitions
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── server/                   # Express backend (separate directory)
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v20 or higher
- npm

### 1. Clone the repository

```bash
git clone <repository-url>
cd coursework-group-16-1-main
```

### 2. Set up the Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 3. Set up the Frontend (Client)

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## 🌐 Application Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page with hero, categories, best sellers |
| `/products` | Public | Browse all products |
| `/product/:id` | Public | Product detail page |
| `/search` | Public | Search for products |
| `/login` | Public | User login |
| `/register` | Public | User registration |
| `/cart` | Authenticated | Shopping cart & checkout |
| `/admin` | Admin only | Admin dashboard |
| `/admin/products` | Admin only | Manage products |
| `/admin/categories` | Admin only | Manage categories |
| `/admin/announcements` | Admin only | Manage announcements |

---

## 🔐 Authentication

- JWT-based authentication stored in `localStorage`
- Auth state managed globally via `AuthContext`
- Protected routes using `ProtectLayout` (requires login) and `AdminProtectLayout` (requires admin role)
- Cart data persisted in `localStorage` under the key `bunny_cart`

---

## 💳 Payments

Checkout is powered by **Stripe**. The `CheckoutForm` component uses `@stripe/react-stripe-js` with the `PaymentElement` for a secure, hosted payment UI. The backend creates a Payment Intent which the frontend uses to confirm the payment.

---

## 📡 Real-Time Features

The `LiveFeed` component connects to the backend via **Socket.IO** to display live activity updates (e.g., recent purchases or stock changes) to users on the home page.

---

## 🛠️ Available Scripts (Client)

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---



