import axios from 'axios';

// Konfigurasi dasar Axios
const API = axios.create({
  baseURL: 'https://67338b90a042ab85d117395d.mockapi.io/api/v1', // Base URL MockAPI
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk menambahkan data hutang
export const addDebt = async (payload) => {
  try {
    const response = await API.post('/debtList', payload); // Endpoint untuk menambah data
    return response.data;
  } catch (error) {
    console.error('Error adding debt:', error);
    throw error;
  }
};

export const deleteDebt = async (id) => {
  try {
    const response = await API.delete(`/debtList/${id}`); // Endpoint untuk menghapus data
    return response.data;
  } catch (error) {
    console.error('Error deleting debt:', error);
    throw error;
  }
};

export const updateDebt = async (id, updatedData) => {
  try {
    const response = await API.put(`/debtList/${id}`, updatedData); // Endpoint untuk update data
    return response.data;
  } catch (error) {
    console.error('Error updating debt:', error);
    throw error;
  }
};

export default API;