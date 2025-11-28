# 🛍️ Perfume Shop - Admin Dashboard

A modern e-commerce platform for perfume shops with a beautiful React-based admin dashboard powered by Firebase.

## ✨ Features

### 👥 Customer Features
- 🎨 Beautiful product showcase with filter and search
- 🛒 Shopping cart with persistent storage
- 💳 Order placement with customer information
- 📦 Real-time order tracking

### 🔧 Admin Features
- 📊 Dashboard with statistics overview
- 📦 Product Management (Create, Read, Update, Delete)
- 🛒 Order Management with payment slip verification
- 💰 Revenue tracking
- 🔐 Secure authentication with Firebase

## 🚀 Tech Stack

- **Frontend**: React 18.3.1
- **Build Tool**: Vite 5.4.0
- **Routing**: React Router DOM
- **Backend**: Firebase (Firestore, Storage, Authentication)
- **Styling**: CSS3 with Golden Theme
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Firebase account and project
- Git

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mohkaow/perfume-shop.git
cd perfume-shop
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase

#### Option A: Using Environment Variables (Recommended)
Create a `.env.local` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### Option B: Direct Configuration
Edit `src/firebase.js` and replace the configuration values:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 4. Set Up Firebase Rules

#### Firestore Rules
Copy the content from `firestore.rules` to your Firebase Console:
- Go to: Firestore Database → Rules
- Replace the existing rules with content from `firestore.rules`

#### Storage Rules
Copy the content from `storage.rules` to your Firebase Console:
- Go to: Storage → Rules
- Replace the existing rules with content from `storage.rules`

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5174`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
perfume-shop/
├── src/
│   ├── components/
│   │   ├── Login.jsx              # Admin login page
│   │   ├── ProtectedRoute.jsx     # Route protection
│   │   └── admin/
│   │       ├── ProductManagement.jsx
│   │       ├── OrderManagement.jsx
│   │       └── ProductForm.jsx
│   ├── context/
│   │   ├── AuthContext.jsx        # Authentication context
│   │   └── CartContext.jsx        # Shopping cart context
│   ├── pages/
│   │   └── AdminDashboard.jsx     # Main admin page
│   ├── services/
│   │   ├── productService.js      # Product CRUD operations
│   │   ├── orderService.js        # Order management
│   │   └── storageService.js      # File upload handling
│   ├── utils/
│   │   ├── deleteAllProducts.js
│   │   └── migrationScript.js
│   ├── data/
│   │   └── products.js            # Sample product data
│   ├── App.jsx                    # Customer app
│   ├── main.jsx                   # Entry point
│   ├── firebase.js                # Firebase config
│   ├── styles.css                 # Customer styles
│   └── admin-styles.css           # Admin styles
├── public/
│   ├── images/
│   │   └── perfumes/              # Product images
│   └── index.html
├── firestore.rules                # Firestore security rules
├── storage.rules                  # Storage security rules
├── vite.config.js
├── package.json
└── README.md
```

## 🔐 Authentication

### Admin Login
1. Navigate to `/admin/login`
2. Enter your Firebase email and password
3. Access the admin dashboard

### Protected Routes
- `/admin/dashboard` - Requires authentication
- All admin features are protected by Firebase Authentication

## 📊 Database Structure

### Collections

#### Products
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  volume: string,
  notes: string,
  image: string (URL),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Orders
```javascript
{
  id: string,
  customer: {
    name: string,
    phone: string,
    address: string,
    note: string
  },
  items: [
    {
      id: string,
      name: string,
      price: number,
      quantity: number
    }
  ],
  totalPrice: number,
  status: 'pending' | 'confirmed' | 'rejected' | 'shipped' | 'completed',
  paymentSlipUrl: string (optional),
  paymentApproved: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🎨 Theming

The application uses a sophisticated golden theme:
- **Primary Color**: #d4af37 (Gold)
- **Dark Color**: #3d2817 (Brown)
- **Light Color**: #fdfbf7 (Cream)
- **Accent Colors**: Various shades for different UI states

## 🚀 Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

2. Login to Firebase
```bash
firebase login
```

3. Initialize Firebase hosting
```bash
firebase init hosting
```

4. Build and deploy
```bash
npm run build
firebase deploy
```

## 🔄 API Reference

### Product Service
- `getAllProducts()` - Get all products
- `getProduct(productId)` - Get single product
- `addProduct(productData)` - Add new product
- `updateProduct(productId, productData)` - Update product
- `deleteProduct(productId)` - Delete product

### Order Service
- `createOrder(orderData)` - Create new order
- `getAllOrders()` - Get all orders (admin only)
- `getOrder(orderId)` - Get single order
- `updateOrderStatus(orderId, status)` - Update order status
- `approvePaymentSlip(orderId)` - Approve payment
- `rejectPaymentSlip(orderId, reason)` - Reject payment

### Storage Service
- `uploadProductImage(file)` - Upload product image
- `uploadPaymentSlip(file, orderId)` - Upload payment slip
- `deleteImage(imageUrl)` - Delete image
- `validateFileSize(file, maxSizeMB)` - Validate file size
- `validateFileType(file)` - Validate file type

## 🛠️ Development Tips

### Adding New Products
1. Go to Admin Dashboard → Products
2. Click "Add New Product"
3. Fill in product details
4. Upload product image
5. Save

### Managing Orders
1. Go to Admin Dashboard → Orders
2. View pending orders
3. Review customer details and items
4. Verify payment slip
5. Approve or reject payment
6. Update order status as shipment progresses

### Customizing Styles
- Customer styles: `src/styles.css`
- Admin styles: `src/admin-styles.css`
- Color palette defined in CSS custom properties

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please contact the development team or open an issue on GitHub.

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe/Omise)
- [ ] Email notifications for orders
- [ ] SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Inventory management
- [ ] Customer reviews and ratings
- [ ] Discount codes and promotions
- [ ] Multi-language support
- [ ] Mobile app

## 🙏 Acknowledgments

- Built with React and Vite
- Powered by Firebase
- Inspired by modern e-commerce platforms
- Special thanks to the open-source community
