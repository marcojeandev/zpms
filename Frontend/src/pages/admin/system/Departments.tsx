import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { departmentService } from '@/services/admin/departmentService';
import { Department, DepartmentFormData } from '@/types/admin/department';

// Helper to safely extract department array from various response shapes
function extractDepartments(response: unknown): Department[] {
  if (response && typeof response === 'object') {
    const data = (response as any).data;
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object' && Array.isArray((data as any).data)) {
      return (data as any).data;
    }
  }
  return [];
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [form, setForm] = useState<DepartmentFormData>({ Department_name: '', Department_code: '' });

  const fetchDepartments = async () => {
    try {
      const res = await departmentService.getAll();
      const data = extractDepartments(res);
      setDepartments(data);
    } catch {
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await departmentService.update(editing.id, form);
        toast.success('Department updated');
      } else {
        await departmentService.create(form);
        toast.success('Department created');
      }
      setModalOpen(false);
      fetchDepartments();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this department?')) return;
    try {
      await departmentService.delete(id);
      toast.success('Deleted');
      fetchDepartments();
    } catch {
      toast.error('Delete failed');
    }
  };

  const openModal = (department?: Department) => {
    if (department) {
      setEditing(department);
      setForm({
        Department_name: department.Department_name,
        Department_code: department.Department_code,
      });
    } else {
      setEditing(null);
      setForm({ Department_name: '', Department_code: '' });
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
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your organization departments</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-sm transition flex items-center gap-2 text-sm font-medium"
        >
          <span>+</span> Add Department
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-red-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{dept.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{dept.Department_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {dept.Department_code || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <button
                      onClick={() => openModal(dept)}
                      className="text-red-600 hover:text-red-800 font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="text-gray-500 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No departments found. Click “Add Department” to create one.
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
              {editing ? 'Edit Department' : 'Create Department'}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              {editing ? 'Update the department details below.' : 'Fill in the department information.'}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  value={form.Department_name}
                  onChange={(e) => setForm({ ...form, Department_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-500 transition outline-none"
                  placeholder="e.g., Human Resources"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Code</label>
                <input
                  type="text"
                  value={form.Department_code || ''}
                  onChange={(e) => setForm({ ...form, Department_code: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-500 transition outline-none"
                  placeholder="e.g., HR"
                />
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

      {/* Fade-in animation (add to your global CSS or Tailwind config) */}
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