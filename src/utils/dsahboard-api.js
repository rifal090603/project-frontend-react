import axios from 'axios';

//  Buat instance Axios
const api = axios.create({
  baseURL: 'https://coffee-macth.shop', 
  withCredentials: true,  
});

//  Interceptor untuk menyisipkan token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);  
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const refreshResponse = await axios.post('http://localhost:5000/auth/refresh', {
            refresh_token: refreshToken,
          });

          const newAccessToken = refreshResponse.data.access_token;
          localStorage.setItem('access_token', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest); 
        } else {
          window.location.href = '/auth/login';
        }
      } catch (err) {
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);


// ========== DASHBOARD API ==========

//  Statistik Dashboard
export const getDashboardData = async () => {
  try {
    const response = await api.get('/dashboard/');  
    return response.data;
  } catch (error) {
    handleError(error, "Gagal mengambil data dashboard");
  }
};

//  Get semua users (admin dan klien)
export const getUsers = async () => {
  try {
    const response = await api.get('/dashboard/users');  
    return response.data;
  } catch (error) {
    handleError(error, "Gagal mengambil data users");
  }
};

//  Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/dashboard/users/${userId}`);  
    return response.data;
  } catch (error) {
    handleError(error, "Gagal menghapus user");
  }
};

//  Get list menu (admin)
export const getMenus = async () => {
  try {
    const response = await api.get('/dashboard/menus');  
    return response.data.menus;
  } catch (error) {
    handleError(error, "Gagal mengambil data menu");
  }
};

//  Create menu
export const createMenu = async (formData) => {
  try {
    const response = await api.post('/dashboard/create-menu', formData);  
    return response.data;
  } catch (error) {
    handleError(error, "Gagal membuat menu");
  }
};

// Update menu
export const updateMenu = async (menuId, formData) => {
  try {
    
    const response = await api.put(`/dashboard/edit-menu/${menuId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, "Gagal mengupdate menu");
  }
};

export const getMenuById = async (menuId) => {
  try {
    const response = await api.get(`/dashboard/menu/${menuId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error("Gagal mengambil data menu");
  }
};



// Delete menu
export const deleteMenu = async (menuId) => {
  try {
    const response = await api.delete(`/dashboard/menu/${menuId}`);  
    return response.data;
  } catch (error) {
    handleError(error, "Gagal menghapus menu");
  }
};

// Get transaksi berdasarkan tanggal
export const getTransactions = async (tanggal = "") => {
  try {
    const response = await api.get(`/dashboard/transactions`, {
      params: tanggal ? { tanggal } : {}, 
    });
    console.log("RESPON API:", response.data);  
    return response.data;
  } catch (error) {
    handleError(error, "Gagal mengambil data transaksi");
  }
};

//  Tandai transaksi selesai
export const completeTransaction = async (id) => {
  try {
    const response = await api.post(`/dashboard/transactions/${id}/complete`);  
    return response.data;
  } catch (error) {
    handleError(error, "Gagal menyelesaikan transaksi");
  }
};

// Batalkan transaksi
export const cancelTransaction = async (id) => {
  try {
    const response = await api.post(`/dashboard/transactions/${id}/cancel`);  
    return response.data;
  } catch (error) {
    handleError(error, "Gagal membatalkan transaksi");
  }
};

// Function untuk menangani error dengan pesan yang lebih informatif
const handleError = (error, customMessage) => {
  if (error.response) {
    console.error(`Error ${error.response.status}: ${error.response.data.message}`);
  } else {
    console.error("Error: ", error.message);
  }
  alert(customMessage);  
  throw new Error(customMessage); 
};
