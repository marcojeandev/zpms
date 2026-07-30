// services/admin/unitSectionService.ts
import axios from 'axios';
import { UnitSection, UnitSectionFormData } from '@/types/admin/unitSection';

const API_URL = '/api/unit_sections';

export const unitSectionService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (data: UnitSectionFormData) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  update: async (id: number, data: UnitSectionFormData) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};