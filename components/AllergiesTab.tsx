
import React from 'react';
import type { Allergy } from '../types';
import { AllergySeverity } from '../types';

interface AllergiesTabProps {
  allergies: Allergy[];
}

const AllergyCard: React.FC<{ allergy: Allergy }> = ({ allergy }) => {
  const severityStyles = {
    [AllergySeverity.Mild]: 'bg-green-100 text-green-800',
    [AllergySeverity.Moderate]: 'bg-yellow-100 text-yellow-800',
    [AllergySeverity.Severe]: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-md font-bold text-gray-800">{allergy.allergen}</p>
          <p className="text-sm text-gray-600 mt-1">رد الفعل: {allergy.reaction}</p>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${severityStyles[allergy.severity]}`}>
          {allergy.severity}
        </span>
      </div>
    </div>
  );
};

const AllergiesTab: React.FC<AllergiesTabProps> = ({ allergies }) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">الحساسية المعروفة</h3>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-all duration-200 shadow-sm">
            إضافة حساسية
          </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allergies.map((allergy) => (
          <AllergyCard key={allergy.id} allergy={allergy} />
        ))}
      </div>
    </div>
  );
};

export default AllergiesTab;
