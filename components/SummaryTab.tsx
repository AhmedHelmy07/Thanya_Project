
import React, { useState } from 'react';
import type { Patient, Appointment, MedicalRecord } from '../types';
import { updateMedicalRecord } from '../firebase';

interface SummaryTabProps {
  patient?: Patient | null;
  appointments?: Appointment[];
  medicalRecord?: MedicalRecord | null;
  currentUserId?: string;
}

const InfoCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-slate-50 p-4 rounded-lg">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-md font-semibold text-gray-800">{value}</p>
  </div>
);

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
        <div>
            <p className="font-semibold text-emerald-700">{appointment.reason}</p>
            <p className="text-sm text-gray-600">{appointment.doctor}</p>
        </div>
        <div className="text-left">
            <p className="text-sm font-medium text-gray-800">{new Date(appointment.date).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-sm text-gray-500">{appointment.time}</p>
        </div>
    </div>
);


const SummaryTab: React.FC<SummaryTabProps> = ({ patient, appointments = [], medicalRecord, currentUserId }) => {
  const [editing, setEditing] = useState(false);
  const [bloodType, setBloodType] = useState(medicalRecord?.bloodType || '');
  const [allergies, setAllergies] = useState((medicalRecord?.allergies || []).join(', '));
  const [currentMedicines, setCurrentMedicines] = useState((medicalRecord?.currentMedicines || []).join(', '));
  const [pastSurgeries, setPastSurgeries] = useState((medicalRecord?.pastSurgeries || []).join(', '));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!currentUserId) {
      setError('المستخدم غير معرف. الرجاء تسجيل الدخول.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await updateMedicalRecord(currentUserId, {
        bloodType,
        allergies: allergies.split(',').map(s => s.trim()).filter(Boolean),
        currentMedicines: currentMedicines.split(',').map(s => s.trim()).filter(Boolean),
        pastSurgeries: pastSurgeries.split(',').map(s => s.trim()).filter(Boolean),
      });
      setEditing(false);
    } catch (e: any) {
      setError(e.message || 'حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {patient && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات المريض</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard title="الطبيب الأساسي" value={patient.primaryPhysician} />
            <InfoCard title="شركة التأمين" value={patient.insuranceProvider} />
            <InfoCard title="معرّف المريض" value={patient.id} />
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">المواعيد القادمة</h3>
        <div className="space-y-3">
          {appointments.length > 0 ? (
            appointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
          ) : (
            <p className="text-gray-500">لا توجد مواعيد قادمة.</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">السجلات الطبية</h3>
          <div>
            {editing ? (
              <>
                <button onClick={handleSave} disabled={saving} className="ml-2 px-3 py-1 bg-emerald-600 text-white rounded">{saving ? 'جارٍ الحفظ...' : 'حفظ'}</button>
                <button onClick={() => setEditing(false)} disabled={saving} className="ml-2 px-3 py-1 bg-gray-200 rounded">إلغاء</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="px-3 py-1 bg-emerald-600 text-white rounded">تعديل</button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {editing ? (
            <>
              <div>
                <p className="text-sm text-gray-500">فصيلة الدم</p>
                <input value={bloodType} onChange={e => setBloodType(e.target.value)} className="mt-1 w-full rounded border-gray-300 p-2" />
              </div>
              <div>
                <p className="text-sm text-gray-500">الحساسيات (مفصولة بفواصل)</p>
                <input value={allergies} onChange={e => setAllergies(e.target.value)} className="mt-1 w-full rounded border-gray-300 p-2" />
              </div>
              <div>
                <p className="text-sm text-gray-500">الأدوية الحالية (مفصولة بفواصل)</p>
                <input value={currentMedicines} onChange={e => setCurrentMedicines(e.target.value)} className="mt-1 w-full rounded border-gray-300 p-2" />
              </div>
              <div>
                <p className="text-sm text-gray-500">العمليات الجراحية (مفصولة بفواصل)</p>
                <input value={pastSurgeries} onChange={e => setPastSurgeries(e.target.value)} className="mt-1 w-full rounded border-gray-300 p-2" />
              </div>
            </>
          ) : (
            <>
              <InfoCard title="فصيلة الدم" value={medicalRecord?.bloodType || 'غير محدد'} />
              <InfoCard title="الحساسيات" value={(medicalRecord?.allergies || []).join(', ') || 'لا توجد'} />
              <InfoCard title="الأدوية الحالية" value={(medicalRecord?.currentMedicines || []).join(', ') || 'لا توجد'} />
              <InfoCard title="العمليات الجراحية" value={(medicalRecord?.pastSurgeries || []).join(', ') || 'لا توجد'} />
            </>
          )}
        </div>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default SummaryTab;
