import { supabase } from "../lib/supabase";
const API_BASE_URL = '/api';

// ===== GENERAL PRODUCT ENDPOINTS =====
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_prices (
        id,
        platform,
        price,
        product_url,
        updated_at
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return {
    products: data || [],
  };
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to load product');
  }
  return response.json();
};

// ===== SELLER PRODUCT ENDPOINTS =====
export const fetchSellerProducts = async (token) => {
  const response = await fetch(`${API_BASE_URL}/seller/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to load seller products');
  }
  return response.json();
};

export const createSellerProduct = async (productData, token) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
};

export const updateSellerProduct = async (id, productData, token) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
};

export const deleteSellerProduct = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return response.json();
};

// ===== PAYMENT ENDPOINTS =====
export const createPaymentOrder = async (orderData, token) => {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to create payment order');
  }
  return response.json();
};

export const verifyPayment = async (paymentData, token) => {
  const response = await fetch(`${API_BASE_URL}/payments/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  });
  if (!response.ok) {
    throw new Error('Failed to verify payment');
  }
  return response.json();
};

// ===== SELLER PAYMENT SETTINGS =====
export const updatePaymentSettings = async (settings, token) => {
  const response = await fetch(`${API_BASE_URL}/seller/payment-settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });
  if (!response.ok) {
    throw new Error('Failed to update payment settings');
  }
  return response.json();
};

export const getPaymentSettings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/seller/payment-settings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch payment settings');
  }
  return response.json();
};

// ===== CLOUDINARY IMAGE UPLOAD ENDPOINTS =====
export const uploadImage = async (imageFile, token) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE_URL}/uploads/image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  return response.json();
};

export const uploadMultipleImages = async (imageFiles, token) => {
  const formData = new FormData();
  imageFiles.forEach((file) => {
    formData.append('images', file);
  });

  const response = await fetch(`${API_BASE_URL}/uploads/images`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload images');
  }
  return response.json();
};

export const deleteImage = async (imageUrl, token) => {
  const response = await fetch(`${API_BASE_URL}/uploads/image`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ imageUrl }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
  return response.json();
};

export const getCloudinaryConfig = async () => {
  const response = await fetch(`${API_BASE_URL}/uploads/demo`);
  if (!response.ok) {
    throw new Error('Failed to fetch Cloudinary config');
  }
  return response.json();
};
