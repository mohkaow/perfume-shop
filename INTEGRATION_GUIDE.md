# 🔗 Customer to Admin Integration Guide

Complete guide for customer orders flowing from the shop to the admin dashboard.

## 📊 Flow Diagram

```
Customer                        Firebase                    Admin
┌──────────────────┐           ┌──────────────┐           ┌─────────────┐
│ 1. Browse Shop   │           │              │           │             │
│ 2. Add to Cart   │────────→  │  CartContext │           │             │
│ 3. Checkout      │ (Local)   │  (Local)     │           │             │
└──────────────────┘           └──────────────┘           └─────────────┘
                                                                 △
                                                                 │
┌──────────────────┐           ┌──────────────┐           ┌─────────────┐
│ 4. Fill Details  │           │              │           │             │
│ 5. Submit Order  │─→create──→│  Firestore   │─→listen─→ │  Dashboard  │
│                  │   Order   │ /orders/{id} │           │  sees order │
└──────────────────┘           └──────────────┘           └─────────────┘
                                                                 │
                                                                 ↓
                                                          ┌─────────────┐
                                                          │ 6. Review   │
                                                          │ 7. Verify   │
                                                          │ 8. Approve  │
                                                          │ 9. Ship     │
                                                          └─────────────┘
```

## 🔄 Order Lifecycle

### Status Progression
```
pending → confirmed → shipped → completed
   ↓
rejected (if payment rejected)
```

### Status Descriptions

| Status | Meaning | Who Sets | Action |
|--------|---------|----------|--------|
| **pending** | Waiting for payment verification | System (automatic) | Admin reviews payment slip |
| **confirmed** | Payment approved, ready to ship | Admin | Approve payment slip |
| **shipped** | Order dispatched to customer | Admin | Mark as shipped |
| **completed** | Delivered to customer | Admin | Mark as completed |
| **rejected** | Payment not approved | Admin | Reject with reason |

---

## 💾 Database Structure

### Orders Collection in Firestore

```javascript
/orders/{orderId}
├── customer: {
│   ├── name: "สมชาย น้ำหอมดี"
│   ├── phone: "081-234-5678"
│   ├── address: "บ้านเลขที่ 123 ..."
│   └── note: "ขอเป็นกลิ่นอ่อน ๆ"
├── items: [
│   {
│     ├── id: "p1"
│     ├── name: "Coach Green"
│     ├── price: 2390
│     └── quantity: 2
│   },
│   {
│     ├── id: "p2"
│     ├── name: "Chanel Chance"
│     ├── price: 3990
│     └── quantity: 1
│   }
│ ]
├── totalPrice: 8770
├── status: "pending"
├── paymentSlipUrl: "" (optional, for future)
├── paymentApproved: false
├── createdAt: 2025-11-28T10:30:00Z
└── updatedAt: 2025-11-28T10:30:00Z
```

---

## 🛒 Customer Order Creation Process

### File: `src/App.jsx`

**Function**: `Cart.handleSubmit()`

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Validate customer data
  if (!customer.name || !customer.phone || !customer.address) {
    // Show error
    return;
  }
  
  // 2. Create order object
  const orderData = {
    customer: { name, phone, address, note },
    items: items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    totalPrice: totalPrice
  };
  
  // 3. Send to Firebase
  const orderId = await createOrder(orderData);
  
  // 4. Clear cart
  clearCart();
  
  // 5. Show success
  alert(`✅ Order ${orderId} created!`);
};
```

---

## 👨‍💼 Admin Order Management Process

### File: `src/components/admin/OrderManagement.jsx`

**Process Flow**:

```javascript
// 1. Load orders on mount
useEffect(() => {
  loadOrders();
}, []);

// 2. Listen for real-time updates
const loadOrders = async () => {
  const data = await getAllOrders();
  setOrders(data);
};

// 3. Filter orders by status
const filteredOrders = orders.filter(order => 
  filter === 'all' || order.status === filter
);

// 4. Take action on order
const handleApprove = async (orderId) => {
  await approvePaymentSlip(orderId); // Changes status to 'confirmed'
  loadOrders(); // Refresh list
};

const handleReject = async (orderId, reason) => {
  await rejectPaymentSlip(orderId, reason); // Changes status to 'rejected'
  loadOrders();
};

const handleShip = async (orderId) => {
  await updateOrderStatus(orderId, 'shipped');
  loadOrders();
};

const handleComplete = async (orderId) => {
  await updateOrderStatus(orderId, 'completed');
  loadOrders();
};
```

---

## 📲 Real-Time Data Flow

### Customer Creates Order

1. **Client-Side** (App.jsx)
   ```javascript
   const orderId = await createOrder(orderData);
   // Calls Firebase Cloud Function
   ```

2. **Firebase** (Firestore)
   ```
   /orders/{newOrderId} is created
   - Status: "pending"
   - createdAt: timestamp
   ```

3. **Admin Dashboard** (OrderManagement.jsx)
   ```javascript
   // Listens to /orders collection
   useEffect(() => {
     loadOrders(); // Fetches all orders
   }, []);
   ```

4. **Admin sees new order**
   - ✅ Order appears in pending list
   - ⏳ Admin waits for payment verification

---

## 🔐 Security Rules for Orders

**Firestore Rules**: `firestore.rules`

```firestore
match /orders/{orderId} {
  // Customers can only read their own orders (future enhancement)
  allow read: if isAdmin();
  
  // Customers can create orders
  allow create: if true;
  
  // Only admin can update and delete
  allow update, delete: if isAdmin();
}
```

---

## 🧪 Testing the Integration

### Step 1: Create Test Order
1. Go to `http://localhost:5174`
2. Add products to cart
3. Fill customer details
4. Click "ยืนยันคำสั่งซื้อ"
5. Should see success message

### Step 2: Check Firestore
1. Open Firebase Console
2. Go to Firestore Database
3. Check `/orders` collection
4. Should see new order document

### Step 3: View in Admin Dashboard
1. Go to `http://localhost:5174/admin/dashboard`
2. Login with admin credentials
3. Go to "Orders" tab
4. Should see the order in "pending" status

### Step 4: Test Admin Actions
1. Click order to view details
2. Try approving/rejecting
3. Check order status changes
4. Verify Firestore updates

---

## 📋 Order Management Features

### View Orders
```javascript
getAllOrders() // Returns all orders sorted by creation date
```

### Filter Orders
- **All**: Show all orders
- **Pending**: Payment awaiting review
- **Confirmed**: Ready to ship
- **Shipped**: Dispatched
- **Completed**: Delivered
- **Rejected**: Payment rejected

### Admin Actions

**Approve Payment**
```javascript
await approvePaymentSlip(orderId);
// Sets status to "confirmed"
// Sets paymentApproved to true
```

**Reject Payment**
```javascript
await rejectPaymentSlip(orderId, reason);
// Sets status to "rejected"
// Stores rejection reason
```

**Update Status**
```javascript
await updateOrderStatus(orderId, 'shipped');
await updateOrderStatus(orderId, 'completed');
```

---

## 🎯 Features to Implement

### Currently Implemented ✅
- ✅ Customer order creation
- ✅ Admin order viewing
- ✅ Order filtering by status
- ✅ Approve/reject orders
- ✅ Status tracking
- ✅ Real-time updates

### Future Enhancements
- [ ] Payment slip upload by customer
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Order tracking page for customers
- [ ] Print order receipt
- [ ] Refund system
- [ ] Return management
- [ ] Customer reviews

---

## 🔧 Common Issues & Solutions

### Issue: Orders not appearing in admin dashboard

**Check**:
1. Firebase rules allow admin read access
2. Admin user is properly authenticated
3. Orders exist in Firestore (check Firebase Console)
4. No console errors

**Solution**:
- Verify Firestore rules: `allow read: if isAdmin();`
- Check authentication context
- Review browser console for errors

### Issue: Order creation fails

**Check**:
1. Firebase is initialized
2. Customer data is complete
3. Network connection is stable
4. Firestore quota not exceeded

**Solution**:
- Check Firebase config in `.env.local`
- Verify all required fields filled
- Check Firestore usage limits
- Review error message in console

### Issue: Admin can't approve orders

**Check**:
1. Admin is logged in
2. Firestore rules allow update
3. Order ID is correct

**Solution**:
- Re-login if session expired
- Check Firestore rules published
- Verify order exists in database

---

## 📊 Data Validation

### Customer Data Validation (Client-Side)

```javascript
// Required fields
- name: non-empty string
- phone: valid phone format
- address: non-empty string

// Optional fields
- note: string (can be empty)
```

### Order Data Validation (Server-Side - Firestore Rules)

```firestore
// Can be enhanced with validation rules:
match /orders/{orderId} {
  allow create: if 
    request.resource.data.customer.name is string &&
    request.resource.data.customer.phone is string &&
    request.resource.data.customer.address is string &&
    request.resource.data.items is list &&
    request.resource.data.totalPrice is number &&
    request.resource.data.status == "pending";
}
```

---

## 📈 Analytics & Monitoring

### Metrics to Track

1. **Order Creation**
   - Orders per day
   - Average order value
   - Conversion rate

2. **Order Status**
   - Pending orders count
   - Avg time to confirm
   - Rejection rate

3. **Customer Data**
   - Repeat customers
   - Popular products
   - Geographic distribution

---

## 🚀 Deployment Checklist

- [ ] Firestore rules deployed
- [ ] Admin user created
- [ ] .env.local configured
- [ ] Orders can be created
- [ ] Admin can view orders
- [ ] Approve/reject works
- [ ] Status updates working
- [ ] Real-time updates working
- [ ] Error handling complete
- [ ] Tested end-to-end

---

## 📞 Support & References

- See `FIREBASE_SETUP.md` for Firebase configuration
- Check `orderService.js` for available functions
- Review `OrderManagement.jsx` for admin features
- See `App.jsx` for customer checkout flow

---

**Last Updated**: November 28, 2025  
**Version**: 1.0.0
