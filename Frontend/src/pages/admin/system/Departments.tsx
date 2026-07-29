import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { departmentService } from '@/services/admin/departmentService';
import { Department, DepartmentFormData } from '@/types/admin/department';

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [form, setForm] = useState<DepartmentFormData>({ Department_name: '', Department_code: '' });

  const fetchDepartments = async () => {
    try {
      const res = await departmentService.getAll();
      // 🛠️ Fix: extract array even if wrapped in { data: [...] }
      const data = Array.isArray(res.data) 
        ? res.data 
        : (res.data?.data || []);
      setDepartments(data);
    } catch (err) {
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
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this department?')) return;
    try {
      await departmentService.delete(id);
      toast.success('Deleted');
      fetchDepartments();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openModal = (department?: Department) => {
    if (department) {
      setEditing(department);
      setForm({ Department_name: department.Department_name, Department_code: department.Department_code });
    } else {
      setEditing(null);
      setForm({ Department_name: '', Department_code: '' });
    }
    setModalOpen(true);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departments</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Department
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{dept.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{dept.Department_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{dept.Department_code || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button onClick={() => openModal(dept)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(dept.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr><td colSpan={4} className="text-center py-4 text-gray-500">No departments</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editing ? 'Edit' : 'Create'} Department</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  required
                  value={form.Department_name}
                  onChange={(e) => setForm({ ...form, Department_name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Code</label>
                <input
                  type="text"
                  value={form.Department_code || ''}
                  onChange={(e) => setForm({ ...form, Department_code: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}