import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, AlertCircle, CheckCircle, Loader, Upload, X } from "lucide-react";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    imageUrl: "",
    stock: "",
  });

  // Initialize with demo products
  useEffect(() => {
    setProducts([
      {
        id: 1,
        title: "Premium Leather Wallet",
        description: "High-quality leather wallet with RFID protection",
        price: 45.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612033566312-69731331baab?w=400",
        stock: 15,
        createdAt: "2024-01-10",
      },
      {
        id: 2,
        title: "Wireless Earbuds",
        description: "Noise-cancelling wireless earbuds with 30-hour battery",
        price: 89.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        stock: 8,
        createdAt: "2024-01-08",
      },
    ]);
  }, []);

  const showNotification = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("Image size must be less than 5MB", "error");
        return;
      }

      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
        showNotification("Only JPEG, PNG, WebP, and GIF images are supported", "error");
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      showNotification("Please select an image", "error");
      return;
    }

    setUploadingImage(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/uploads/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: data.data.url,
          image: data.data.url,
        }));
        showNotification("Image uploaded successfully!", "success");
        setImageFile(null);
      } else {
        showNotification(data.message || "Upload failed", "error");
      }
    } catch (error) {
      console.error('Upload error:', error);
      showNotification("Failed to upload image", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setImageFile(null);
    setFormData((prev) => ({
      ...prev,
      image: "",
      imageUrl: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.title || !formData.price || !formData.category) {
      showNotification("Please fill in all required fields", "error");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingProduct) {
        // Update existing product
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id
              ? {
                  ...formData,
                  id: editingProduct.id,
                  price: parseFloat(formData.price),
                  stock: parseInt(formData.stock),
                  createdAt: editingProduct.createdAt,
                }
              : p
          )
        );
        showNotification("Product updated successfully!", "success");
      } else {
        // Add new product
        const newProduct = {
          id: Date.now(),
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          createdAt: new Date().toISOString().split("T")[0],
        };
        setProducts([newProduct, ...products]);
        showNotification("Product added successfully!", "success");
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        imageUrl: "",
        stock: "",
      });
      setImagePreview("");
      setImageFile(null);
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      showNotification("Error saving product. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      imageUrl: product.image,
      stock: product.stock.toString(),
    });
    setImagePreview(product.image);
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProducts(products.filter((p) => p.id !== id));
        showNotification("Product deleted successfully!", "success");
      } catch (error) {
        showNotification("Error deleting product. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingProduct(null);
    setImagePreview("");
    setImageFile(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
      imageUrl: "",
      stock: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your products and sales</p>
        </div>

        {/* Notification */}
        {message && (
          <div
            className={`mb-6 rounded-lg p-4 flex items-center gap-3 ${
              messageType === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-2 px-1 font-medium border-b-2 transition-colors ${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              My Products
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`py-2 px-1 font-medium border-b-2 transition-colors ${
                activeTab === "payment"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Payment Settings
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-2 px-1 font-medium border-b-2 transition-colors ${
                activeTab === "analytics"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            {/* Add Product Button */}
            {!showForm && (
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingProduct(null);
                }}
                className="mb-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add New Product
              </button>
            )}

            {/* Add/Edit Product Form */}
            {showForm && (
              <div className="mb-8 rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter product title"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home & Garden">Home & Garden</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Sports">Sports</option>
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter product description..."
                      rows="3"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  {/* Image Upload - Cloudinary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image (Upload to Cloudinary)
                    </label>
                    
                    {/* File Input */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-input"
                        disabled={uploadingImage}
                      />
                      <label
                        htmlFor="image-input"
                        className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <Upload size={20} className="text-gray-400" />
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">
                            {imageFile ? imageFile.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            PNG, JPG, GIF, WebP up to 5MB
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Upload Button */}
                    {imageFile && !formData.imageUrl && (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={uploadingImage}
                        className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploadingImage && <Loader size={16} className="animate-spin" />}
                        {uploadingImage ? "Uploading..." : "Upload Image to Cloudinary"}
                      </button>
                    )}

                    {/* Preview Section */}
                    {(imagePreview || formData.imageUrl) && (
                      <div className="mt-3">
                        <div className="relative inline-block">
                          <img
                            src={imagePreview || formData.imageUrl}
                            alt="Preview"
                            className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        {formData.imageUrl && (
                          <div className="mt-2">
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle size={14} />
                              Image uploaded to Cloudinary
                            </p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              URL: {formData.imageUrl}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading && <Loader size={16} className="animate-spin" />}
                      {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1620484378408-342f4bffc0e5?w=400";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Price</p>
                        <p className="text-lg font-semibold text-blue-600">
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Stock</p>
                        <p className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                          {product.stock} units
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 text-xs">
                      <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {product.category}
                      </span>
                      <span className="text-gray-500 ml-2">
                        Added: {product.createdAt}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-50 text-blue-600 px-3 py-2 hover:bg-blue-100 transition-colors"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-50 text-red-600 px-3 py-2 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && !showForm && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No products yet. Add your first product!</p>
              </div>
            )}
          </div>
        )}

        {/* Payment Settings Tab */}
        {activeTab === "payment" && (
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Payment Settings</h2>

            <div className="space-y-6">
              {/* Razorpay */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Razorpay Payment Gateway
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enable online payments via credit/debit cards, net banking, and UPI
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Razorpay Key ID
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your Razorpay Key ID"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      defaultValue="rzp_test_****"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Razorpay Secret Key
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your Razorpay Secret Key"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      defaultValue="****"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Direct Bank Transfer
                    </h3>
                    <p className="text-sm text-gray-600">
                      Accept payments directly to your bank account
                    </p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account holder name"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter IFSC code"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter bank name"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors">
                Save Payment Settings
              </button>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Sales Analytics</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Stats Cards */}
              <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <p className="text-sm text-gray-700 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-blue-600">{products.length}</p>
                <p className="text-xs text-gray-600 mt-2">Active listings</p>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
                <p className="text-sm text-gray-700 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                </p>
                <p className="text-xs text-gray-600 mt-2">From all products</p>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                <p className="text-sm text-gray-700 mb-1">Total Stock</p>
                <p className="text-3xl font-bold text-purple-600">
                  {products.reduce((sum, p) => sum + p.stock, 0)}
                </p>
                <p className="text-xs text-gray-600 mt-2">Units available</p>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-4">
                <p className="text-sm text-gray-700 mb-1">Avg. Price</p>
                <p className="text-3xl font-bold text-orange-600">
                  ₹{(products.reduce((sum, p) => sum + p.price, 0) / (products.length || 1)).toFixed(2)}
                </p>
                <p className="text-xs text-gray-600 mt-2">Per product</p>
              </div>
            </div>

            {/* Sales Chart Placeholder */}
            <div className="mt-8 rounded-lg bg-gray-50 p-6 border border-gray-200">
              <h3 className="mb-4 font-semibold text-gray-900">Sales Over Time</h3>
              <div className="flex items-end justify-around gap-2 h-40">
                {[45, 60, 40, 75, 90, 55, 70, 65, 80, 95, 70, 85].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${height}%` }}
                    title={`Day ${i + 1}: ${height} sales`}
                  ></div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Last 12 days performance
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
