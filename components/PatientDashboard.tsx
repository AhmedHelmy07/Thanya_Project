import React from "react";

interface PatientDashboardProps {
  onSelectPatient?: (patient: any) => void;
  onOpenMyRecord?: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({
  onOpenMyRecord,
}) => {
  return (
    <main className="min-h-[70vh] px-4 sm:px-8 lg:px-12 py-8 space-y-14">
      {/* ===== Dashboard Header ===== */}
      <section className="max-w-5xl mx-auto text-center space-y-4">
        <h1
          className="font-bold text-gray-900 tracking-tight"
          style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
        >
          لوحة تحكم المرضى
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          يمكنك إدارة ملفك الطبي ومتابعة بياناتك الصحية بعد تسجيل الدخول إلى النظام.
        </p>
      </section>

      {/* ===== Enterprise Empty State Card ===== */}
      <section
        className="max-w-xl mx-auto"
        role="region"
        aria-labelledby="medical-empty-state-title"
      >
        <div
          className="
            relative overflow-hidden
            bg-white rounded-2xl
            border border-gray-100
            shadow-sm
            transition-all duration-500
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          {/* Accent Medical Strip */}
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

          <div className="p-9 md:p-11 space-y-9 text-center">
            {/* Medical Illustration */}
            <div className="flex justify-center">
              <div className="w-48 md:w-56 opacity-95">
                <svg
                  viewBox="0 0 220 180"
                  aria-hidden="true"
                  className="w-full h-auto"
                >
                  <rect
                    x="35"
                    y="25"
                    width="150"
                    height="120"
                    rx="24"
                    className="stroke-emerald-500 fill-transparent"
                    strokeWidth="2"
                  />

                  <path
                    d="M110 60V110"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M85 85H135"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3">
              <h2
                id="medical-empty-state-title"
                className="font-semibold text-gray-900"
                style={{ fontSize: "clamp(1.35rem, 2vw, 1.6rem)" }}
              >
                لا توجد سجلات طبية متاحة
              </h2>

              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                النظام في وضع العرض فقط حالياً. سجّل الدخول للوصول إلى الملف الطبي وإدارة بياناتك الصحية بأمان.
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenMyRecord?.()}
                aria-label="فتح الملف الطبي"
                className="
                  w-full sm:w-auto
                  px-9 py-3.5
                  rounded-xl
                  bg-emerald-600 hover:bg-emerald-700
                  text-white font-semibold
                  transition-all duration-500
                  hover:shadow-lg
                  hover:scale-[1.04]
                  active:scale-[0.97]
                  focus:ring-4 focus:ring-emerald-200 focus:outline-none
                "
              >
                فتح ملفي الطبي
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PatientDashboard;
