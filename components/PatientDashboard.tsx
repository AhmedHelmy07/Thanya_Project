import React from 'react';

interface PatientDashboardProps {
  onSelectPatient: (patient: any) => void;
  onOpenMyRecord?: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onOpenMyRecord }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المرضى</h1>
        <p className="mt-1 text-md text-gray-600">الواجهة تعرض التصميم فقط. افتح ملفك الطبي للوصول إلى بياناتك.</p>
      </div>

      <div className="grid place-items-center py-12">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900">لا توجد سجلات عامة</h3>
          <p className="mt-2 text-gray-500">الموقع يعرض التصميم فقط. لتتمكن من عرض وتعديل ملفك الطبي، سجل الدخول ثم اضغط على الزر أدناه.</p>
          <div className="mt-6">
            <button
              onClick={() => onOpenMyRecord?.()}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md font-semibold"
            >
              فتح ملفي الطبي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
