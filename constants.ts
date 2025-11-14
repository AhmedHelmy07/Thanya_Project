
import type { Patient, Medication, Allergy, Vital, LabResult, Appointment } from './types';
import { AllergySeverity } from './types';

export const mockPatient: Patient = {
  id: 'pat_12345',
  name: 'Eleanor Vance',
  dateOfBirth: '1985-07-22',
  gender: 'Female',
  avatarUrl: 'https://picsum.photos/seed/patient1/200/200',
  contact: {
    phone: '(555) 123-4567',
    email: 'eleanor.vance@example.com',
    address: '123 Meadow Lane, Greenfield, USA',
  },
  primaryPhysician: 'Dr. Evelyn Reed',
  insuranceProvider: 'Blue Health Shield',
};

export const mockMedications: Medication[] = [
  { id: 'med_01', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribedBy: 'Dr. Reed', startDate: '2022-01-15' },
  { id: 'med_02', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedBy: 'Dr. Reed', startDate: '2021-06-20' },
  { id: 'med_03', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', prescribedBy: 'Dr. Reed', startDate: '2022-01-15' },
];

export const mockAllergies: Allergy[] = [
  { id: 'alg_01', allergen: 'Penicillin', reaction: 'Hives, rash', severity: AllergySeverity.Moderate },
  { id: 'alg_02', allergen: 'Peanuts', reaction: 'Anaphylaxis', severity: AllergySeverity.Severe },
  { id: 'alg_03', allergen: 'Dust Mites', reaction: 'Sneezing, itchy eyes', severity: AllergySeverity.Mild },
];

export const mockVitals: Vital[] = [
  { date: '2024-07-15', bloodPressure: '120/80 mmHg', heartRate: 72, respiratoryRate: 16, temperature: 98.6 },
  { date: '2024-04-10', bloodPressure: '122/81 mmHg', heartRate: 75, respiratoryRate: 16, temperature: 98.7 },
  { date: '2024-01-05', bloodPressure: '118/79 mmHg', heartRate: 70, respiratoryRate: 15, temperature: 98.5 },
];

export const mockLabResults: LabResult[] = [
    { id: 'lab_01', testName: 'Hemoglobin A1c', value: '5.7%', referenceRange: '4.8% - 5.6%', date: '2024-06-20', status: 'Abnormal' },
    { id: 'lab_02', testName: 'Total Cholesterol', value: '180 mg/dL', referenceRange: '< 200 mg/dL', date: '2024-06-20', status: 'Normal' },
    { id: 'lab_03', testName: 'TSH', value: '2.1 mIU/L', referenceRange: '0.4 - 4.0 mIU/L', date: '2024-05-11', status: 'Normal' },
];

export const mockAppointments: Appointment[] = [
    { id: 'app_01', date: '2024-08-15', time: '10:00 AM', doctor: 'Dr. Evelyn Reed', reason: 'Annual Checkup', status: 'Scheduled' },
    { id: 'app_02', date: '2024-07-15', time: '02:30 PM', doctor: 'Dr. Alan Grant (Cardiologist)', reason: 'Follow-up', status: 'Completed' },
    { id: 'app_03', date: '2024-05-01', time: '11:00 AM', doctor: 'Dr. Evelyn Reed', reason: 'General Consultation', status: 'Completed' },
];
