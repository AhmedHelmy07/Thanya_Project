import React, { useState, useMemo } from 'react';
import type { Patient } from '../types';
import { mockPatients } from '../constants';
import PatientCard from './PatientCard';
import { SearchIcon } from './icons';

interface PatientDashboardProps {
  onSelectPatient: (patient: Patient) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onSelectPatient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('الكل');

  const filteredPatients = useMemo(() => {
    return mockPatients.filter(patient => {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = patient.name.toLowerCase().includes(searchLower);
      const idMatch = patient.id.toLowerCase().includes(searchLower);

      const genderMatch = genderFilter === 'الكل' || patient.gender === genderFilter;

      return (nameMatch || idMatch) && genderMatch;
    });
  }, [searchQuery, genderFilter]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المرضى</h1>
        <p className="mt-1 text-md text-gray-600">بحث، تصفية، وإدارة سجلات المرضى.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
             <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="البحث بالاسم أو المعرف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-10"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-10"
          >
            <option>الكل</option>
            <option>أنثى</option>
            <option>ذكر</option>
          </select>
        </div>
      </div>
      
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map(patient => (
            <PatientCard 
              key={patient.id} 
              patient={patient} 
              onSelectPatient={onSelectPatient} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">لم يتم العثور على مرضى</h3>
            <p className="mt-1 text-gray-500">حاول تعديل معايير البحث أو التصفية.</p>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
