export interface User {
  id: number;
  firstname: string;
  middlename: string | null;
  lastname: string;
  suffix: string | null;
  nickname: string | null;
  employeeID: string | null;
  citizenship: string | null;
  gender: 'MALE' | 'FEMALE' | null;
  civil_status: string | null;
  religion: string | null;
  age: string | null;
  birthday: string | null;
  birthPlace: string | null;
  contact: string | null;
  status: 'Active' | 'Inactive' | 'Pending';
  username: string;
  email: string;
  user_role: 'admin' | 'head' | 'hr' | 'employee';
  employee_type: 'head' | 'regular' | 'probationary' | null;
  reason: string | null;
  profile_picture: string | null;
  biometric: any | null;
  created_at: string;
  updated_at: string;
}