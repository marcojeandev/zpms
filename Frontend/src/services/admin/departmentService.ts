// services/admin/departmentSevices.ts
import axios from '@/lib/axios';  // use the same instance
import { DepartmentFormData } from '@/types/admin/department';

// No need for '/api' prefix if axios baseURL includes it
const API_URL = '/admin/departments';

export const departmentService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  create: async (data: DepartmentFormData) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },
  update: async (id: number, data: DepartmentFormData) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};