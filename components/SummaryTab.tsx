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
  <div className="group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-200 dark:hover:border-emerald-800">

    <p className="text-xs tracking-wider uppercase text-gray-400 font-semibold mb-3">
      {title}
    </p>

    <p className="text-base font-semibold text-gray-900 dark:text-white break-words leading-relaxed group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
      {value}
    </p>

  </div>
);

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
  <div className="flex flex-col sm:flex-row justify-between gap-5 p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">

    <div className="space-y-2">
      <p className="font-bold text-emerald-700 dark:text-emerald-400">
        {appointment.reason}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {appointment.doctor}
      </p>
    </div>

    <div className="text-sm text-left text-gray-600 dark:text-gray-300 space-y-1">
      <p className="font-medium">
        {new Date(appointment.date).toLocaleDateString('ar-EG', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>

      <p className="font-semibold">{appointment.time}</p>
    </div>

  </div>
);

const SummaryTab: React.FC<{
  patient?: any;
  appointments?: Appointment[];
  medicalRecord?: MedicalRecord | null;
  currentUserId?: string;
}> = ({
  patient,
  appointments = [],
  medicalRecord,
  currentUserId
}) => {

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
    <div className="space-y-12 animate-fadeIn">

      {/* Patient Information */}
      {patient && (
        <section className="space-y-6">

          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            معلومات المريض
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard title="الطبيب الأساسي" value={patient.primaryPhysician} />
            <InfoCard title="شركة التأمين" value={patient.insuranceProvider} />
            <InfoCard title="معرّف المريض" value={patient.id} />
          </div>

        </section>
      )}

      {/* Upcoming Appointments */}
      <section className="space-y-6">

        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          المواعيد القادمة
        </h2>

        <div className="space-y-4">

          {appointments.length > 0 ? (
            appointments.map(app => (
              <AppointmentCard key={app.id} appointment={app} />
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              لا توجد مواعيد قادمة.
            </p>
          )}

        </div>

      </section>

      {/* Medical Records */}
      <section className="space-y-6">

        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">

          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            السجلات الطبية
          </h2>

          <div className="flex flex-wrap gap-3">

            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md transition"
                >
                  {saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>

                <button
                  onClick={() => setEditing(false)}
                  disabled={saving}
                  className="px-6 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 dark:text-white text-sm font-medium transition"
                >
                  إلغاء
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md transition"
              >
                تعديل السجلات
              </button>
            )}

          </div>

        </div>

        <div className="grid sm:grid-cols-2 gap-6">

          {editing ? (
            <>
              {[
                { label: 'فصيلة الدم', value: bloodType, setter: setBloodType },
                { label: 'الحساسيات (مفصولة بفواصل)', value: allergies, setter: setAllergies },
                { label: 'الأدوية الحالية (مفصولة بفواصل)', value: currentMedicines, setter: setCurrentMedicines },
                { label: 'العمليات الجراحية (مفصولة بفواصل)', value: pastSurgeries, setter: setPastSurgeries }
              ].map((field, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {field.label}
                  </p>

                  <input
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  />
                </div>
              ))}
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

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

      </section>

    </div>
  );
};

export default SummaryTab;
