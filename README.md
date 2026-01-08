# Elysian Store - E-commerce Platform

A full-stack e-commerce platform built for students, featuring product management, shopping cart, checkout with Stripe, and order management.

## Tech Stack

- **Frontend:** Next.js 16, React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcryptjs
- **Payments:** Stripe
- **Image Storage:** Firebase
- **Notifications:** React Toastify

---

## Quick Start

### 1. Install Dependencies
```bash
cd ecommerce-final
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Firebase (for image uploads)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.js            # Home page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── account/           # User account page
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout page
│   ├── orders/            # Order history
│   ├── product/           # Product pages
│   │   ├── listing/       # Product listing by category
│   │   └── [details]/     # Product detail page
│   ├── admin-view/        # Admin dashboard
│   │   ├── add-product/   # Add new product
│   │   └── all-products/  # Manage products
│   └── api/               # Backend API routes
│
├── components/            # Reusable UI components
│   ├── Navbar/           # Navigation bar
│   ├── Footer/           # Footer
│   ├── CommonListing/    # Product grid
│   ├── CommonCart/       # Cart component
│   ├── FormElements/     # Input, Select, Tile components
│   └── Loader/           # Loading spinners
│
├── context/              # React Context (global state)
├── models/               # MongoDB schemas
├── services/             # API service functions
└── utils/                # Helper functions & constants
```

---

## Features

### For Customers

| Feature | Page | Description |
|---------|------|-------------|
| Browse Products | `/product/listing/all-products` | View all available products |
| Product Details | `/product/[details]` | View product info, sizes, add to cart |
| Shopping Cart | `/cart` | View/edit cart items |
| Checkout | `/checkout` | Add address, pay with Stripe |
| Order History | `/orders` | View past orders |
| Account | `/account` | Manage addresses |

### For Admin

| Feature | Page | Description |
|---------|------|-------------|
| Dashboard | `/admin-view` | Admin overview |
| Add Product | `/admin-view/add-product` | Create new product |
| Manage Products | `/admin-view/all-products` | Edit/delete products |
| View Orders | `/admin-view` | See all customer orders |

---

## API Routes

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/all-products` | Get all products |
| POST | `/api/admin/add-product` | Add new product (admin) |
| PUT | `/api/admin/update-product` | Update product (admin) |
| DELETE | `/api/admin/delete-product` | Delete product (admin) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/all-cart-items` | Get user's cart |
| POST | `/api/cart/add-to-cart` | Add item to cart |
| DELETE | `/api/cart/delete-from-cart` | Remove item from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/order/get-all-orders` | Get user's orders |
| POST | `/api/order/create-order` | Create new order |
| GET | `/api/order/order-details` | Get order details |

### Address
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/address/get-all-address` | Get user's addresses |
| POST | `/api/address/add-new-address` | Add new address |
| PUT | `/api/address/update-address` | Update address |
| DELETE | `/api/address/delete-address` | Delete address |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/stripe` | Create Stripe checkout session |

---

## User Roles

### Customer (`role: "customer"`)
- Browse and search products
- Add products to cart
- Checkout and pay
- View order history
- Manage delivery addresses

### Admin (`role: "admin"`)
- All customer features
- Add/edit/delete products
- View all orders
- Update order status

---

## Database Models

### User
```javascript
{
  name: String,
  email: String,
  password: String,      // hashed with bcryptjs
  role: String           // "customer" or "admin"
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  sizes: Array,          // ["S", "M", "L", "XL"]
  deliveryInfo: String,
  onSale: String,        // "yes" or "no"
  priceDrop: Number,     // discount percentage
  imageUrl: String       // Firebase storage URL
}
```

### Cart
```javascript
{
  userID: ObjectId,
  productID: ObjectId,
  quantity: Number
}
```

### Order
```javascript
{
  user: ObjectId,
  orderItems: Array,
  shippingAddress: Object,
  paymentMethod: String,
  totalPrice: Number,
  isPaid: Boolean,
  paidAt: Date,
  isProcessing: Boolean
}
```

### Address
```javascript
{
  userID: String,
  fullName: String,
  address: String,
  city: String,
  country: String,
  postalCode: String
}
```

---

## How to Use

### Register an Account
1. Go to `/register`
2. Fill in name, email, password
3. Select role (customer or admin)
4. Click "Register"
5. You'll see a success message, then go to login

### Login
1. Go to `/login`
2. Enter email and password
3. Click "Login"
4. Success/error message will show on page and as toast notification

### Browse & Buy (Customer)
1. Go to Home or "All Products"
2. Click on a product to view details
3. Select size and click "Add to Cart"
4. Go to Cart and click "Checkout"
5. Select/add delivery address
6. Click "Checkout" to pay with Stripe
7. Complete payment on Stripe page
8. View order in "Orders" page

### Add Products (Admin)
1. Login as admin
2. Go to "Add New Product"
3. Fill in product details
4. Upload image (stored in Firebase)
5. Click "Add Product"
6. Product appears in "All Products"

### Manage Products (Admin)
1. Go to "Manage All Products"
2. Click "Edit" to update product
3. Click "Delete" to remove product

---

## Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Navbar` | `/components/Navbar` | Top navigation with links and cart |
| `Footer` | `/components/Footer` | Page footer |
| `InputComponent` | `/components/FormElements/InputComponent` | Reusable text input |
| `SelectComponent` | `/components/FormElements/SelectComponent` | Reusable dropdown |
| `TileComponent` | `/components/FormElements/TileComponent` | Selectable tile buttons |
| `CommonListing` | `/components/CommonListing` | Product grid display |
| `ProductTile` | `/components/CommonListing/ProductTile` | Single product card |
| `CommonCart` | `/components/CommonCart` | Cart items display |
| `CommonDetails` | `/components/CommonDetails` | Product detail view |
| `CartModal` | `/components/CartModal` | Cart popup modal |
| `Loader` | `/components/Loader` | Page loading spinner |
| `ComponentLevelLoader` | `/components/Loader/componentlevel` | Button loading spinner |

---

## Services (API Calls)

| Service | Location | Functions |
|---------|----------|-----------|
| Login | `/services/login` | `login(formData)` |
| Register | `/services/register` | `registerNewUser(formData)` |
| Product | `/services/product` | `getAllProducts()`, `getProductById()` |
| Cart | `/services/cart` | `addToCart()`, `getCartItems()`, `deleteFromCart()` |
| Address | `/services/address` | `addAddress()`, `getAllAddresses()`, `deleteAddress()` |
| Order | `/services/order` | `createOrder()`, `getAllOrders()`, `getOrderDetails()` |
| Stripe | `/services/stripe` | `callStripeSession()` |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |

---

## Troubleshooting

### "Port 3000 is in use"
```bash
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### "MongoDB connection failed"
- Check `MONGODB_URI` in `.env.local`
- Make sure MongoDB is running
- Check network/firewall settings

### "Login not showing feedback"
- Make sure `react-toastify` is installed: `npm install react-toastify`
- Check that `ToastContainer` is in `ClientProviders`

### Build errors with metadata
- Layout.js must NOT have `'use client'` directive
- Client components should be wrapped in `ClientProviders`

---

## Deploy

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual
```bash
npm run build
npm run start
```

---

## License

MIT License
