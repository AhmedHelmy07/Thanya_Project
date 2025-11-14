import React, { useState, useMemo } from 'react';
import type { Patient, Medication, Allergy, Vital, LabResult, Appointment } from '../types';
import { mockMedications, mockAllergies, mockVitals, mockLabResults, mockAppointments } from '../constants';
import PatientHeader from './PatientHeader';
import TabNavigation from './TabNavigation';
import SummaryTab from './SummaryTab';
import MedicationsTab from './MedicationsTab';
import AllergiesTab from './AllergiesTab';
import VitalsTab from './VitalsTab';
import { SummaryIcon, MedicationIcon, AllergyIcon, VitalsIcon, ArrowRightIcon } from './icons';

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState('summary');
  
  const medications: Medication[] = mockMedications;
  const allergies: Allergy[] = mockAllergies;
  const vitals: Vital[] = mockVitals;
  const labResults: LabResult[] = mockLabResults;
  const appointments: Appointment[] = mockAppointments;

  const tabs = useMemo(() => [
    { id: 'summary', label: 'الملخص', icon: SummaryIcon },
    { id: 'medications', label: 'الأدوية', icon: MedicationIcon },
    { id: 'allergies', label: 'الحساسية', icon: AllergyIcon },
    { id: 'vitals', label: 'العلامات الحيوية', icon: VitalsIcon },
  ], []);

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <SummaryTab patient={patient} appointments={appointments.slice(0, 2)} />;
      case 'medications':
        return <MedicationsTab medications={medications} />;
      case 'allergies':
        return <AllergiesTab allergies={allergies} />;
      case 'vitals':
        return <VitalsTab vitals={vitals} />;
      default:
        return <div className="text-center p-8">اختر تبويبًا لعرض التفاصيل.</div>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-4">
        <button 
            onClick={onBack} 
            className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors"
        >
            <ArrowRightIcon className="h-5 w-5 ml-1" />
            العودة إلى لوحة التحكم
        </button>
      </div>
      <PatientHeader patient={patient} />
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-4 sm:p-6 transition-all duration-300">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;