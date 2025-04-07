const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_URL || 'http://localhost:5000'  // Remove /api here
  : import.meta.env.VITE_PROD_API_URL || 'https://your-production-url.com';

const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include", // Important for cookies/sessions
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Request failed");
  }

  return response.json();
};

export const register = async (email, password, name) => {
  return await fetchWithAuth(`${API_URL}/api/auth/register`, { 
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
};

export const login = async (email, password) => {
  return fetchWithAuth('api/auth/login', {  
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const getCurrentUser = async (token) => {
  return await fetchWithAuth(`${API_URL}/api/auth/me`, { // Added /api/auth
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
