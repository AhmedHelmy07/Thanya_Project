import type { Patient, Medication, Allergy, Vital, LabResult, Appointment, Device } from './types';
import { AllergySeverity } from './types';

export const mockPatient1: Patient = {
  id: 'pat_12345',
  name: 'إليانور فانس',
  dateOfBirth: '1985-07-22',
  gender: 'أنثى',
  avatarUrl: 'https://picsum.photos/seed/patient1/200/200',
  contact: {
    phone: '(555) 123-4567',
    email: 'eleanor.vance@example.com',
    address: '123 شارع المروج، جرينفيلد، الولايات المتحدة الأمريكية',
  },
  primaryPhysician: 'د. إيفلين ريد',
  insuranceProvider: 'بلو هيلث شيلد',
};

export const mockPatient2: Patient = {
  id: 'pat_67890',
  name: 'ماركوس ثورن',
  dateOfBirth: '1978-11-05',
  gender: 'ذكر',
  avatarUrl: 'https://picsum.photos/seed/patient2/200/200',
  contact: {
    phone: '(555) 987-6543',
    email: 'marcus.thorne@example.com',
    address: '456 شارع البلوط، سبرينغفيلد، الولايات المتحدة الأمريكية',
  },
  primaryPhysician: 'د. جيمس كارتر',
  insuranceProvider: 'يونايتد ويلنس',
};

export const mockPatient3: Patient = {
  id: 'pat_24680',
  name: 'إيزابيلا روسي',
  dateOfBirth: '1992-03-15',
  gender: 'أنثى',
  avatarUrl: 'https://picsum.photos/seed/patient3/200/200',
  contact: {
    phone: '(555) 246-8024',
    email: 'isabella.rossi@example.com',
    address: '789 شارع الصنوبر، مابلتون، الولايات المتحدة الأمريكية',
  },
  primaryPhysician: 'د. إيفلين ريد',
  insuranceProvider: 'سيجنا هيلث',
};

export const mockPatient4: Patient = {
  id: 'pat_13579',
  name: 'ليام تشين',
  dateOfBirth: '2001-09-30',
  gender: 'ذكر',
  avatarUrl: 'https://picsum.photos/seed/patient4/200/200',
  contact: {
    phone: '(555) 135-7913',
    email: 'liam.chen@example.com',
    address: '101 Maple Drive, Rivertown, USA',
  },
  primaryPhysician: 'د. بن كارتر',
  insuranceProvider: 'أetna',
};

export const mockPatients: Patient[] = [mockPatient1, mockPatient2, mockPatient3, mockPatient4];


export const mockMedications: Medication[] = [
  { id: 'med_01', name: 'ليسينوبريل', dosage: '10ملغ', frequency: 'مرة واحدة يوميًا', prescribedBy: 'د. ريد', startDate: '2022-01-15' },
  { id: 'med_02', name: 'ميتفورمين', dosage: '500ملغ', frequency: 'مرتين يوميًا', prescribedBy: 'د. ريد', startDate: '2021-06-20' },
  { id: 'med_03', name: 'أتورفاستاتين', dosage: '20ملغ', frequency: 'مرة واحدة يوميًا عند النوم', prescribedBy: 'د. ريد', startDate: '2022-01-15' },
];

export const mockAllergies: Allergy[] = [
  { id: 'alg_01', allergen: 'البنسلين', reaction: 'شرى، طفح جلدي', severity: AllergySeverity.Moderate },
  { id: 'alg_02', allergen: 'الفول السوداني', reaction: 'صدمة تحسسية', severity: AllergySeverity.Severe },
  { id: 'alg_03', allergen: 'عث الغبار', reaction: 'عطس، حكة في العينين', severity: AllergySeverity.Mild },
];

export const mockVitals: Vital[] = [
  { date: '2024-07-15', bloodPressure: '120/80 mmHg', heartRate: 72, respiratoryRate: 16, temperature: 37.0 },
  { date: '2024-04-10', bloodPressure: '122/81 mmHg', heartRate: 75, respiratoryRate: 16, temperature: 37.1 },
  { date: '2024-01-05', bloodPressure: '118/79 mmHg', heartRate: 70, respiratoryRate: 15, temperature: 36.9 },
];

export const mockLabResults: LabResult[] = [
    { id: 'lab_01', testName: 'الهيموجلوبين السكري A1c', value: '5.7%', referenceRange: '4.8% - 5.6%', date: '2024-06-20', status: 'غير طبيعي' },
    { id: 'lab_02', testName: 'الكوليسترول الكلي', value: '180 mg/dL', referenceRange: '< 200 mg/dL', date: '2024-06-20', status: 'طبيعي' },
    { id: 'lab_03', testName: 'هرمون الغدة الدرقية (TSH)', value: '2.1 mIU/L', referenceRange: '0.4 - 4.0 mIU/L', date: '2024-05-11', status: 'طبيعي' },
];

export const mockAppointments: Appointment[] = [
    { id: 'app_01', date: '2024-08-15', time: '10:00 صباحًا', doctor: 'د. إيفلين ريد', reason: 'فحص سنوي', status: 'مجدول' },
    { id: 'app_02', date: '2024-07-15', time: '02:30 مساءً', doctor: 'د. آلان جرانت (طبيب قلب)', reason: 'متابعة', status: 'مكتمل' },
    { id: 'app_03', date: '2024-05-01', time: '11:00 صباحًا', doctor: 'د. إيفلين ريد', reason: 'استشارة عامة', status: 'مكتمل' },
];

export const mockDevices: Device[] = [
    { id: 'dev_01', name: 'جهاز قياس السكر', model: 'Accu-Chek Guide', status: 'متصل', lastSync: 'قبل 5 دقائق', imageUrl: 'https://picsum.photos/seed/device1/200/200' },
    { id: 'dev_02', name: 'جهاز قياس ضغط الدم', model: 'Omron Platinum', status: 'متصل', lastSync: 'قبل ساعة', imageUrl: 'https://picsum.photos/seed/device2/200/200' },
    { id: 'dev_03', name: 'ساعة ذكية', model: 'Apple Watch Series 9', status: 'غير متصل', lastSync: 'أمس في 10:30 مساءً', imageUrl: 'https://picsum.photos/seed/device3/200/200' },
];
