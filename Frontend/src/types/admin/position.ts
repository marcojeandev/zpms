// types/admin/position.ts
export interface Position {
  id: number;
  position_name: string;
  position_code: string;
  salary: number;
  department_id: number;
  addAt: string;
  department?: {
    id: number;
    Department_name: string;
  };
}

export interface PositionFormData {
  position_name: string;
  position_code: string;
  salary: number;
  department_id: number;
}