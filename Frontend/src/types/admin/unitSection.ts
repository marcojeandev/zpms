// types/admin/unitSection.ts
export interface UnitSection {
  id: number;
  unit_section_name: string;
  department_id: number;
  created_at: string;
  // optional: department relation if API includes it
  department?: {
    id: number;
    Department_name: string;
  };
}

export interface UnitSectionFormData {
  unit_section_name: string;
  department_id: number;
}