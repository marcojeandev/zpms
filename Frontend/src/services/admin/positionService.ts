// services/admin/Positions.ts
import axios from '@/lib/axios';  // use the same instance
import { PositionFormData } from '@/types/admin/position';

// No need for '/api' prefix if axios baseURL includes it
const API_URL = '/admin/positions';

export const positionService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  create: async (data: PositionFormData) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },
  update: async (id: number, data: PositionFormData) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};