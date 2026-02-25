import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SummaryIcon,
  MedicationIcon,
  VitalsIcon,
  ThanyaLogoWide,
} from "./icons";

interface HomePageProps {
  onNavigateToDashboard: () => void;
}

/* ================= Medical Loader ================= */
const MedicalLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">

      {/* Logo */}
      <div className="mb-6">
        <ThanyaLogoWide className="h-16 opacity-90" />
      </div>

      {/* Image Container Premium Style */}
      <div className="mb-8 p-5 rounded-3xl bg-emerald-50/40 backdrop-blur-md shadow-md">
        <img
          src="./images/Untitled-2.png"
          alt="loading medical"
          className="h-28 w-auto object-contain rounded-2xl transition-transform duration-500 hover:scale-105 animate-pulse"
        />
      </div>

      {/* Progress Loader */}
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-emerald-600 animate-[loading_1.5s_ease-in-out_infinite]" />
      </div>

      <p className="mt-6 text-gray-500 text-sm">
        جاري تحميل بياناتك بأمان...
      </p>
    </div>
  );
};

/* ================= Feature Card ================= */
const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
  >
    <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-6">
      <Icon className="h-7 w-7" />
    </div>

    <h3 className="text-xl font-semibold text-gray-900 mb-3">
      {title}
    </h3>

    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
  </motion.div>
);

/* ================= Experience Card ================= */
const ExperienceCard = ({ title, description, color }: any) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
    <h3 className={`text-xl font-semibold mb-4 ${color}`}>
      {title}
    </h3>

    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

/* ================= Home Page ================= */
const HomePage: React.FC<HomePageProps> = ({ onNavigateToDashboard }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) return <MedicalLoader />;

  return (
    <div className="bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_60%)] bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 space-y-28">

        {/* ================= Hero ================= */}
        <section className="text-center max-w-3xl mx-auto pt-16 space-y-8">

          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 leading-tight tracking-tight">
            لأن كل ثانية تهم
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            تطبيق ثانية يمنحك وصولاً فورياً لسجلاتك الطبية ويشاركها عند الطوارئ
            لضمان أفضل رعاية في أسرع وقت ممكن.
          </p>

          <button
            onClick={onNavigateToDashboard}
            className="px-11 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-[1.03]"
          >
            إنشاء حساب مجاني
          </button>

        </section>

        {/* ================= Features ================= */}
        <section>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
            لماذا تختار ثانية؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={SummaryIcon}
              title="سجل طبي موحد"
              description="جميع معلوماتك الصحية في مكان واحد آمن وسهل الوصول."
            />

            <FeatureCard
              icon={VitalsIcon}
              title="مراقبة مستمرة"
              description="متابعة العلامات الحيوية بشكل مستمر بسهولة."
            />

            <FeatureCard
              icon={MedicationIcon}
              title="إدارة الأدوية"
              description="تنبيهات دقيقة وسجل جرعات منظم لالتزام أفضل."
            />
          </div>

        </section>

        {/* ================= Dual Experience ================= */}
        <section className="text-center space-y-10">

          <h2 className="text-3xl font-bold text-gray-900">
            تجربة ثانية تناسبك
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            <ExperienceCard
              title="للـ مرضى"
              description="مشاركة السجلات الطبية، إدارة الأدوية، والاستجابة السريعة للطوارئ."
              color="text-emerald-700"
            />

            <ExperienceCard
              title="للأطباء"
              description="الوصول إلى بيانات المرضى بشكل منظم مع أدوات متابعة طبية احترافية."
              color="text-blue-700"
            />

          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;