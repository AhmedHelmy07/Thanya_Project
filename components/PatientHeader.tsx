
import React from 'react';
import type { Patient } from '../types';
import { PhoneIcon, EmailIcon, LocationIcon, EditIcon } from './icons';

interface PatientHeaderProps {
  patient: Patient;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ patient }) => {
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
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all hover:shadow-xl">
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0">
          <img
            className="h-24 w-24 rounded-full object-cover ring-4 ring-yellow-300"
            src={patient.avatarUrl}
            alt={patient.name}
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-md text-gray-500 mt-1">
                تاريخ الميلاد: {new Date(patient.dateOfBirth).toLocaleDateString('ar-EG')} ({calculateAge(patient.dateOfBirth)} عامًا)
                &middot; {patient.gender}
              </p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors duration-200">
              <EditIcon className="h-4 w-4" />
              <span>تعديل الملف الشخصي</span>
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <PhoneIcon className="h-5 w-5 ml-2 text-emerald-500" />
              <span>{patient.contact.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <EmailIcon className="h-5 w-5 ml-2 text-emerald-500" />
              <a href={`mailto:${patient.contact.email}`} className="hover:underline text-emerald-600">{patient.contact.email}</a>
            </div>
            <div className="flex items-center text-gray-600">
              <LocationIcon className="h-5 w-5 ml-2 text-emerald-500" />
              <span>{patient.contact.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
