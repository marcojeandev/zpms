import api from './api';
import type { User } from '../types/user';

interface RegisterData {
  firstname: string;
  middlename?: string;
  lastname: string;
  suffix?: string;
  nickname?: string;
  employeeID?: string;
  citizenship?: string;
  gender?: 'MALE' | 'FEMALE';
  civil_status?: string;
  religion?: string;
  age?: string;
  birthday?: string;
  birthPlace?: string;
  contact?: string;
  username: string;
  email: string;
  password: string;
  employee_type?: 'head' | 'regular' | 'probationary';
}

interface LoginData {
  login: string; // email or username
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/register', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout');
  localStorage.removeItem('token');
};

export const getUser = async (): Promise<User> => {
  const response = await api.get<User>('/user');
  return response.data;
};