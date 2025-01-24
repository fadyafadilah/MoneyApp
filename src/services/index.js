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
  const userId = payload.userId; // Ambil userId dari payload
  try {
    const response = await API.post('/debtList', payload); // Endpoint untuk menambah data
    return response.data;
  } catch (error) {
    console.error('Error adding debt:', error);
    throw error;
  }
};

// Fungsi untuk menghapus data hutang
export const deleteDebt = async (id, userId) => {
  try {
    const response = await API.delete(`/debtList/${id}?userId=${userId}`); // Pastikan userId sesuai
    return response.data;
  } catch (error) {
    console.error('Error deleting debt:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui data hutang
export const updateDebt = async (id, updatedData, userId) => {
  try {
    // Cek apakah userId sesuai dengan data yang ingin diubah
    const response = await API.put(`/debtList/${id}?userId=${userId}`, updatedData); // Pastikan userId sesuai
    return response.data;
  } catch (error) {
    console.error('Error updating debt:', error);
    throw error;
  }
};

export default API;
