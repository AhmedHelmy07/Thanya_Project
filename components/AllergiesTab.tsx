import React from 'react';
import type { Allergy } from '../types';
import { AllergySeverity } from '../types';

interface AllergiesTabProps {
  allergies: Allergy[];
}

const severityStyles = {
  [AllergySeverity.Mild]: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  [AllergySeverity.Moderate]: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  [AllergySeverity.Severe]: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

const AllergyCard: React.FC<{ allergy: Allergy }> = ({ allergy }) => (

  <div className="group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-200 dark:hover:border-emerald-800">

    <div className="flex justify-between items-start gap-4">

      <div className="space-y-2">

        <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
          {allergy.allergen}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          رد الفعل: {allergy.reaction}
        </p>

      </div>

      <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${severityStyles[allergy.severity]}`}>
        {allergy.severity}
      </span>

    </div>

  </div>
);

const AllergiesTab: React.FC<AllergiesTabProps> = ({ allergies }) => {

  return (
    <div className="animate-fadeIn space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">

        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          الحساسية المعروفة
        </h3>

        <button className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition hover:scale-[1.02]">
          إضافة حساسية
        </button>

      </div>

      {/* Grid Container */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {allergies.map((allergy) => (
          <AllergyCard key={allergy.id} allergy={allergy} />
        ))}

      </div>

    </div>
  );
};

export default AllergiesTab;
