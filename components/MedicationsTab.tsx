import React from 'react';
import type { Medication } from '../types';

interface MedicationsTabProps {
  medications: Medication[];
}

const MedicationsTab: React.FC<MedicationsTabProps> = ({ medications }) => {

  return (
    <div className="animate-fadeIn space-y-6">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">

        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          الأدوية الحالية
        </h3>

        <button className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-md">
          إضافة دواء
        </button>

      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[600px] divide-y divide-gray-200 dark:divide-gray-700">

            <thead className="bg-gray-50 dark:bg-gray-800/60">
              <tr className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">

                <th className="px-7 py-5 text-right">
                  الاسم
                </th>

                <th className="px-7 py-5 text-right">
                  الجرعة
                </th>

                <th className="px-7 py-5 text-right">
                  التكرار
                </th>

                <th className="px-7 py-5 text-right">
                  الطبيب الواصف
                </th>

              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">

              {medications.map((med) => (
                <tr
                  key={med.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition duration-200"
                >

                  <td className="px-7 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {med.name}
                  </td>

                  <td className="px-7 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {med.dosage}
                  </td>

                  <td className="px-7 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {med.frequency}
                  </td>

                  <td className="px-7 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {med.prescribedBy}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default MedicationsTab;