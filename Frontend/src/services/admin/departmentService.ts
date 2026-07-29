import axios from '@/lib/axios';
import { Department, DepartmentFormData } from '@/types/admin/department';

const BASE = '/admin/departments';

export const departmentService = {
  getAll: () => axios.get<Department[]>(BASE),
  getById: (id: number) => axios.get<Department>(`${BASE}/${id}`),
  create: (data: DepartmentFormData) => axios.post<Department>(BASE, data),
  update: (id: number, data: Partial<DepartmentFormData>) =>
    axios.put<Department>(`${BASE}/${id}`, data),
  delete: (id: number) => axios.delete(`${BASE}/${id}`),
};