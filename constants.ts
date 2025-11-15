import type { Patient, Medication, Allergy, Vital, LabResult, Appointment, Device } from './types';
import { AllergySeverity } from './types';

// No seeded patient data — the app will show only the logged-in user's record.
export const mockPatients: Patient[] = [];


export const mockMedications: Medication[] = [];
export const mockAllergies: Allergy[] = [];
export const mockVitals: Vital[] = [];
export const mockLabResults: LabResult[] = [];
export const mockAppointments: Appointment[] = [];
export const mockDevices: Device[] = [];
