
import React from 'react';
import type { Medication } from '../types';

interface MedicationsTabProps {
  medications: Medication[];
}

const MedicationsTab: React.FC<MedicationsTabProps> = ({ medications }) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">الأدوية الحالية</h3>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-all duration-200 shadow-sm">
            إضافة دواء
          </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجرعة</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التكرار</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطبيب الواصف</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medications.map((med) => (
              <tr key={med.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{med.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.dosage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.prescribedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicationsTab;
