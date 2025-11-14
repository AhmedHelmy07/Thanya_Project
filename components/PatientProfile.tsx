
import React, { useState, useMemo } from 'react';
import type { Patient, Medication, Allergy, Vital, LabResult, Appointment } from '../types';
import { mockPatient, mockMedications, mockAllergies, mockVitals, mockLabResults, mockAppointments } from '../constants';
import PatientHeader from './PatientHeader';
import TabNavigation from './TabNavigation';
import SummaryTab from './SummaryTab';
import MedicationsTab from './MedicationsTab';
import AllergiesTab from './AllergiesTab';
import VitalsTab from './VitalsTab';
import { SummaryIcon, MedicationIcon, AllergyIcon, VitalsIcon } from './icons';

const PatientProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  
  // In a real app, this data would come from an API call
  const patientData: Patient = mockPatient;
  const medications: Medication[] = mockMedications;
  const allergies: Allergy[] = mockAllergies;
  const vitals: Vital[] = mockVitals;
  const labResults: LabResult[] = mockLabResults;
  const appointments: Appointment[] = mockAppointments;

  const tabs = useMemo(() => [
    { id: 'summary', label: 'Summary', icon: SummaryIcon },
    { id: 'medications', label: 'Medications', icon: MedicationIcon },
    { id: 'allergies', label: 'Allergies', icon: AllergyIcon },
    { id: 'vitals', label: 'Vitals', icon: VitalsIcon },
  ], []);

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <SummaryTab patient={patientData} appointments={appointments.slice(0, 2)} />;
      case 'medications':
        return <MedicationsTab medications={medications} />;
      case 'allergies':
        return <AllergiesTab allergies={allergies} />;
      case 'vitals':
        return <VitalsTab vitals={vitals} />;
      default:
        return <div className="text-center p-8">Select a tab to view details.</div>;
    }
  };

  return (
    <div className="space-y-6">
      <PatientHeader patient={patientData} />
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
