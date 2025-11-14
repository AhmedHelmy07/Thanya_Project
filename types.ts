
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  avatarUrl: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  primaryPhysician: string;
  insuranceProvider: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
}

export enum AllergySeverity {
  Mild = 'Mild',
  Moderate = 'Moderate',
  Severe = 'Severe'
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: AllergySeverity;
}

export interface Vital {
  date: string;
  bloodPressure: string;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
}

export interface LabResult {
    id: string;
    testName: string;
    value: string;
    referenceRange: string;
    date: string;
    status: 'Normal' | 'Abnormal' | 'Pending';
}

export interface Appointment {
    id: string;
    date: string;
    time: string;
    doctor: string;
    reason: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}
