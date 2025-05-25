import axios from 'axios';

//  Buat instance Axios
const api = axios.create({
  baseURL: 'http://localhost:5000', 
  withCredentials: true,
});

//  Interceptor untuk sisipkan token Authorization (Bearer <token>)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// ========== MENU API ==========

//  Get semua menu
export const getMenus = async (category = null, page = 1) => {
  try {
    const validPage = Number.isInteger(page) && page > 0 ? page : 1;

    const params = {};
    if (category) params.category = category;
    params.page = validPage;

    const token = localStorage.getItem("access_token");

    const response = await api.get("/menu", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};



//  Get menu berdasarkan ID
export const getMenuById = async (menuId) => {
  try {
    const response = await api.get(`/menu/${menuId}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil menu berdasarkan ID");
  }
};

//  Search menu berdasarkan query string
export const searchMenu = async (query) => {
  try {
    const response = await api.get('/menu/search', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw new Error("Gagal melakukan pencarian menu");
  }
};


// ========== AUTH ==========

//  Register client
export const registerUser = async (formData) => {
  try {
    const response = await api.post('/auth/register', formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Terjadi kesalahan saat mendaftar");
  }
};

//  Register admin
export const registerAdmin = async (formData) => {
  try {
    const response = await api.post('/auth/register-admin', formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Terjadi kesalahan saat mendaftar sebagai admin");
  }
};

// Login user
export const loginUser = async (formData) => {
  try {
    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login gagal. Periksa username dan password");
  }
};

//  Logout user (optional jika backend support logout)
export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('access_token');
    return response.data;
  } catch (error) {
    throw new Error("Gagal logout");
  }
};


// ========== CART API ==========

export const viewCart = async () => {
  try {
    const response = await api.get('/cart/view');
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil data cart");
  }
};

export const addToCart = async (menuId, quantity) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/cart/add",
      { menuId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error details:", error.response ? error.response.data : error.message);
    throw new Error("Gagal menambahkan menu ke keranjang");
  }
};


export const removeFromCart = async (product_id) => {
  try {
    const response = await api.delete(`/cart/remove/${product_id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menghapus menu dari keranjang");
  }
};

export const checkoutCart = async (formDataObj) => {
  try {
    const response = await api.post('/cart/checkout', formDataObj, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error("Gagal melakukan checkout");
  }
};

export const getPaymentInfo = async (transaction_id) => {
  try {
    const response = await api.get(`/cart/payment/${transaction_id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil informasi pembayaran");
  }
};
