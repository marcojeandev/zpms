export interface Department {
  id: number;
  Department_name: string;
  Department_code: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type DepartmentFormData = {
  Department_name: string;
  Department_code?: string | null;
};