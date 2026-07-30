// services/admin/positionService.ts
import axios from 'axios';
import { PositionFormData } from '@/types/admin/position';

const API_URL = '/api/positions';

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