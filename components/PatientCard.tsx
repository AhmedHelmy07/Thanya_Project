import React from 'react';
import type { Patient } from '../types';

interface PatientCardProps {
  patient: Patient;
  onSelectPatient: (patient: Patient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onSelectPatient }) => {
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img 
            className="h-16 w-16 rounded-full object-cover ring-4 ring-emerald-100"
            src={patient.avatarUrl}
            alt={patient.name}
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-sm text-gray-500">
              {calculateAge(patient.dateOfBirth)} عامًا &middot; {patient.gender}
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">المعرّف:</span> {patient.id}</p>
            <p><span className="font-semibold">الطبيب:</span> {patient.primaryPhysician}</p>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3">
        <button 
          onClick={() => onSelectPatient(patient)}
          className="w-full text-center px-4 py-2 text-sm font-semibold text-emerald-800 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          عرض السجل
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
