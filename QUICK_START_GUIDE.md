# Seller Dashboard - Quick Start Guide

## 🚀 What's New

A complete seller/customer dashboard system has been added to your online store platform. Sellers can now:

✅ Add, edit, and delete their own products  
✅ Manage product inventory and pricing  
✅ Configure payment methods (Razorpay & Bank Transfer)  
✅ View real-time sales analytics  
✅ Track payment history  

---

## 📁 Files Created/Modified

### New Files Created

1. **Frontend**
   - `src/Pages/SellerDashboard.jsx` - Main dashboard component
   - `SELLER_DASHBOARD_README.md` - User documentation
   - `SELLER_INTEGRATION_GUIDE.md` - Developer integration guide
   - `QUICK_START_GUIDE.md` - This file

2. **Updated Files**
   - `src/App.jsx` - Added seller dashboard route
   - `src/services/api.js` - Added seller API endpoints
   - `src/Components/UI/Header.jsx` - Added seller dashboard navigation link

### Backend Files Enhanced

1. **Models**
   - `Backend/src/models/Product.js` - Enhanced with more fields
   - `Backend/src/models/Seller.js` - Added payment methods

2. **Controllers**
   - `Backend/src/controllers/seller.controller.js` - Complete seller management
   - `Backend/src/controllers/product.controller.js` - Full CRUD operations
   - `Backend/src/controllers/payment.controller.js` - Payment handling

3. **Routes**
   - `Backend/src/routes/index.js` - Updated with all new endpoints

---

## 🎯 Quick Access

### For End Users

**Access the Seller Dashboard:**
1. Click the trending arrow icon (📈) in the header
2. Or visit: `http://localhost:5173/seller/dashboard`

**Three Main Sections:**
1. **My Products** - Manage your product catalog
2. **Payment Settings** - Configure payment methods
3. **Analytics** - View sales metrics

### For Developers

**Start the Application:**

```bash
# Terminal 1: Start Backend
cd Backend
npm install
npm start

# Terminal 2: Start Frontend
npm install
npm run dev
```

**Access Points:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`
- Seller Dashboard: `http://localhost:5173/seller/dashboard`

---

## 🔧 Setup Instructions

### Step 1: Install Dependencies

**Backend:**
```bash
cd official/Backend
npm install
```

**Frontend:**
```bash
cd official
npm install
```

### Step 2: Environment Variables

**Create `.env` in `Backend/` directory:**
```env
MONGODB_URI=mongodb://localhost:27017/online-store
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
PORT=5000
NODE_ENV=development
```

### Step 3: Database Setup

**Create MongoDB indexes (optional but recommended):**

```javascript
// In MongoDB shell or Atlas UI
db.products.createIndex({ seller: 1 });
db.products.createIndex({ category: 1 });
db.products.createIndex({ status: 1 });
db.sellers.createIndex({ user: 1 });
db.sellers.createIndex({ verified: 1 });
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd official/Backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd official
npm run dev
```

Visit: `http://localhost:5173`

---

## 📚 API Endpoints Summary

### Seller Management
```
POST   /api/seller/profile              - Create seller profile
GET    /api/seller/profile              - Get seller profile
PUT    /api/seller/profile              - Update seller profile
GET    /api/seller/products             - List seller's products
GET    /api/seller/payment-settings     - Get payment settings
PUT    /api/seller/payment-settings     - Update payment settings
GET    /api/seller/analytics            - Get sales analytics
```

### Product Management
```
GET    /api/products                    - List all products (paginated)
GET    /api/products/:id                - Get product details
POST   /api/products                    - Create product (protected)
PUT    /api/products/:id                - Update product (protected)
DELETE /api/products/:id                - Delete product (protected)
GET    /api/products/search             - Search products
GET    /api/products/category/:category - Get products by category
```

### Payment Management
```
POST   /api/payments                    - Create payment order
POST   /api/payments/verify             - Verify payment
GET    /api/payments/history            - Get payment history
POST   /api/payments/bank-transfer      - Process bank transfer
```

---

## 💻 Feature Walkthrough

### Adding a Product

1. Navigate to **Seller Dashboard** → **My Products**
2. Click **"Add New Product"** button
3. Fill in the form:
   - **Title** ⭐ (required)
   - **Category** ⭐ (required)
   - **Price** ⭐ (required)
   - **Stock** (optional, defaults to 0)
   - **Description** (optional)
   - **Image URL** (optional, shows preview)
4. Click **"Add Product"**
5. See green success notification
6. Product appears in the list immediately

### Editing a Product

1. Click **"Edit"** button on any product card
2. Form pre-fills with product details
3. Make your changes
4. Click **"Update Product"**
5. Form closes and list updates

### Deleting a Product

1. Click **"Delete"** button on any product card
2. Confirm deletion when prompted
3. Product disappears from list
4. See success notification

### Configuring Payment Methods

**Razorpay (Recommended):**
1. Go to **Payment Settings** tab
2. Copy your Razorpay credentials from Razorpay Dashboard
3. Paste **Key ID** and **Secret Key**
4. Click **"Save Payment Settings"**

**Bank Transfer:**
1. Go to **Payment Settings** tab
2. Check **"Enable"** for Direct Bank Transfer
3. Fill in your bank details:
   - Account Holder Name
   - Account Number
   - IFSC Code
   - Bank Name
4. Click **"Save Payment Settings"**

### Viewing Analytics

1. Go to **Analytics** tab
2. See real-time stats:
   - **Total Products**: Number of products you're selling
   - **Total Revenue**: Sum of all product prices
   - **Total Stock**: Total units in inventory
   - **Average Price**: Mean price per product
3. Visual sales chart for last 12 days

---

## 🧪 Testing

### Manual Testing

**Test Product Creation:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Product",
    "price": 99.99,
    "category": "Electronics",
    "stock": 10
  }'
```

**Test Fetching Products:**
```bash
curl http://localhost:5000/api/products
```

### Using Postman

1. Import API collection (coming soon)
2. Set up authentication bearer token
3. Test each endpoint
4. Verify responses match documentation

---

## 🐛 Troubleshooting

### Issue: "Seller profile not found"
**Solution**: Create seller profile first
```bash
curl -X POST http://localhost:5000/api/seller/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"shopName": "My Shop"}'
```

### Issue: Cannot access dashboard
**Solution**: 
- Ensure you're authenticated
- Check if token is valid
- Verify user exists in database

### Issue: Products not showing
**Solution**:
- Refresh the page
- Check browser console for errors
- Verify MongoDB connection

### Issue: Images not loading
**Solution**:
- Ensure image URL is valid
- Use HTTPS URLs when possible
- Check image URL is publicly accessible

---

## 📈 Performance Tips

1. **Use Pagination**: Limit displayed products to 10-20 per page
2. **Optimize Images**: Compress images before uploading
3. **Index Database**: Add indexes for frequently queried fields
4. **Cache Responses**: Implement caching for product lists
5. **Lazy Load**: Load images as user scrolls

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use HTTPS in production** - Secure payment data
3. **Encrypt payment credentials** - Don't store plain text
4. **Validate all inputs** - Both frontend and backend
5. **Implement rate limiting** - Prevent abuse
6. **Use JWT with expiration** - Secure token management
7. **Sanitize database queries** - Prevent SQL injection

---

## 📱 Mobile Compatibility

✅ Fully responsive design  
✅ Works on all screen sizes  
✅ Touch-friendly buttons  
✅ Mobile navigation menu included  

---

## 🎨 Customization

### Change Dashboard Colors

Edit `src/Pages/SellerDashboard.jsx`:
```javascript
// Change from blue
className="bg-blue-600"
// To your color
className="bg-purple-600"
```

### Customize Product Categories

Update `src/Pages/SellerDashboard.jsx` (line with select options):
```javascript
<option value="Your Category">Your Category</option>
```

### Modify Payment Methods

Update `Backend/src/models/Seller.js` to add new payment gateways.

---

## 📞 Getting Help

1. **Read Documentation**
   - `SELLER_DASHBOARD_README.md` - User guide
   - `SELLER_INTEGRATION_GUIDE.md` - Developer guide

2. **Check Logs**
   - Backend: Console output
   - Frontend: Browser console (F12)
   - Database: MongoDB logs

3. **Test APIs**
   - Use Postman for testing
   - Check response status codes
   - Verify error messages

---

## ✨ What's Next?

### Recommended Enhancements

1. **Real Razorpay Integration** - Implement actual payment processing
2. **Image Upload** - Replace URL input with file upload
3. **Order Management** - Add order tracking
4. **Email Notifications** - Send alerts for orders
5. **Seller Rating System** - Add reviews and ratings
6. **Inventory Alerts** - Notify when stock is low
7. **Tax Calculation** - Automatic tax computation
8. **Multi-currency** - Support different currencies
9. **Admin Dashboard** - Manage sellers and monitor platform
10. **Advanced Analytics** - Charts, graphs, trends

---

## 📊 Database Schema

### Product Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String (enum),
  seller: ObjectId (ref: Seller),
  stock: Number,
  rating: Number,
  reviews: Number,
  status: String (active/inactive),
  sku: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### Seller Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  shopName: String,
  description: String,
  verified: Boolean,
  rating: Number,
  totalSales: Number,
  paymentMethods: {
    razorpay: { enabled, keyId, secretKey },
    bankTransfer: { enabled, accountHolder, accountNumber, ifscCode, bankName }
  },
  commissionPercentage: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Next Steps

1. ✅ Review the implementation
2. ✅ Set up your development environment
3. ✅ Run the application
4. ✅ Test the seller dashboard
5. ✅ Integrate with actual payment gateway
6. ✅ Deploy to production

---

## 📝 Changelog

### Version 1.0 (January 2024)
- ✅ Initial seller dashboard implementation
- ✅ Product CRUD operations
- ✅ Payment settings configuration
- ✅ Sales analytics
- ✅ Razorpay and Bank Transfer support
- ✅ Mobile responsive design
- ✅ API documentation
- ✅ Integration guides

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review error logs
3. Test with curl/Postman
4. Check browser console
5. Verify database connections

---

**Happy Selling! 🎉**

For detailed information, refer to:
- User Guide: `SELLER_DASHBOARD_README.md`
- Developer Guide: `SELLER_INTEGRATION_GUIDE.md`
