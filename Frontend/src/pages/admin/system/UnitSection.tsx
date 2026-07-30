// pages/admin/system/UnitSection.tsx
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { unitSectionService } from '@/services/admin/unitSectionService';
import { departmentService } from '@/services/admin/departmentService';
import type { UnitSection } from '@/types/admin/unitSection';
import { UnitSectionFormData } from '@/types/admin/unitSection';
import { Department } from '@/types/admin/department';

// Helper to extract array from response (same as before)
function extractArray(response: unknown): any[] {
  if (response && typeof response === 'object') {
    const data = (response as any).data;
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object' && Array.isArray((data as any).data)) {
      return (data as any).data;
    }
  }
  return [];
}

export default function UnitSection() {
  const [items, setItems] = useState<UnitSection[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UnitSection | null>(null);
  const [form, setForm] = useState<UnitSectionFormData>({
    unit_section_name: '',
    department_id: 0,
  });

  const fetchData = async () => {
    try {
      const [resItems, resDepts] = await Promise.all([
        unitSectionService.getAll(),
        departmentService.getAll(),
      ]);
      const itemsData = extractArray(resItems);
      const deptsData = extractArray(resDepts);
      setItems(itemsData);
      setDepartments(deptsData);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.department_id) {
      toast.error('Please select a department');
      return;
    }
    try {
      if (editing) {
        await unitSectionService.update(editing.id, form);
        toast.success('Unit/Section updated');
      } else {
        await unitSectionService.create(form);
        toast.success('Unit/Section created');
      }
      setModalOpen(false);
      fetchData();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this unit/section?')) return;
    try {
      await unitSectionService.delete(id);
      toast.success('Deleted');
      fetchData();
    } catch {
      toast.error('Delete failed');
    }
  };

  const openModal = (item?: UnitSection) => {
    if (item) {
      setEditing(item);
      setForm({
        unit_section_name: item.unit_section_name,
        department_id: item.department_id,
      });
    } else {
      setEditing(null);
      setForm({ unit_section_name: '', department_id: 0 });
    }
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Unit / Section</h1>
          <p className="text-sm text-gray-500 mt-1">Manage organizational units under departments</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-sm transition flex items-center gap-2 text-sm font-medium"
        >
          <span>+</span> Add Unit
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Unit Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {items.map((item) => {
                const deptName = departments.find(d => d.id === item.department_id)?.Department_name || '—';
                return (
                  <tr key={item.id} className="hover:bg-red-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {item.unit_section_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {deptName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <button
                        onClick={() => openModal(item)}
                        className="text-red-600 hover:text-red-800 font-medium transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No units found. Click “Add Unit” to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {editing ? 'Edit Unit/Section' : 'Create Unit/Section'}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              {editing ? 'Update the unit details below.' : 'Fill in the unit information.'}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Name *</label>
                <input
                  type="text"
                  required
                  value={form.unit_section_name}
                  onChange={(e) => setForm({ ...form, unit_section_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-500 transition outline-none"
                  placeholder="e.g., IT Support"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <select
                  required
                  value={form.department_id}
                  onChange={(e) => setForm({ ...form, department_id: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-500 transition outline-none bg-white"
                >
                  <option value={0}>Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.Department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
                >
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}