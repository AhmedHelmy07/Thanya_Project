import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApiPost, useApiPut } from '../hooks/Apis hooks/useApi';
import ErrorScreen from "../components/atoms/ErrorScreen";
import LoadingScreen from "../components/atoms/LoadingScreen";
import { useAuth } from '../context/AuthContext';
import { SiSession } from 'react-icons/si';
/* ─── Types ─── */
type Mode = 'login' | 'register1' | 'register2';

interface BasicForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  gender: string;
}

interface MedicalForm {
  bloodType: string;
  chronicDiseases: string;
  allergies: string;
  currentMedication: string;
  status: string;
}

/* ─── Reusable Field ─── */
const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}> = ({ label, type = 'text', value, onChange, placeholder, required }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 hover:border-emerald-300 dark:text-white"
    />
  </div>
);

/* ─── Select Field ─── */
const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}> = ({ label, value, onChange, options }) => (
  <div className="space-y-1.5 col-span-2">
    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 dark:text-white"
    >
      <option value="">اختر...</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

/* ─── Step Indicator ─── */
const StepDot: React.FC<{ active: boolean; done: boolean; label: string }> = ({
  active,
  done,
  label,
}) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${done
        ? 'bg-emerald-500 text-white'
        : active
          ? 'bg-emerald-600 text-white ring-4 ring-emerald-200'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
        }`}
    >
      {done ? '✓' : active ? '●' : '○'}
    </div>
    <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
  </div>
);

/* ═══════════════════════════════════════════
   AuthPage
═══════════════════════════════════════════ */
const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser , setIsLoggingOut} = useAuth();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const [mode, setMode] = useState<Mode>('login');
  const [error, setError] = useState<string | null>(null);

  /* Login state */
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  /* Register step 1 */
  const [basic, setBasic] = useState<BasicForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    gender: '',
  });

  /* Register step 2 */
  const [medical, setMedical] = useState<MedicalForm>({
    bloodType: '',
    chronicDiseases: '',
    allergies: '',
    currentMedication: '',
    status: '',
  });

  const setB = (k: keyof BasicForm) => (v: string) =>
    setBasic((prev) => ({ ...prev, [k]: v }));

  const setM = (k: keyof MedicalForm) => (v: string) =>
    setMedical((prev) => ({ ...prev, [k]: v }));

  /* ── API mutations ── */
  /* ── API mutations ── */
  const loginMutation = useApiPost(['auth']);
  const registerMutation = useApiPost(['auth']);
  const medicalMutation = useApiPut(['auth']);

  /* ── Handlers ── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    loginMutation.mutate(
      {
        path: '/Account/Login',
        data: {
          email: loginEmail,
          password: loginPassword,
        },
      },
      {
        onSuccess: (data: any) => {
          const id = data?.data?.user?.id
          sessionStorage.setItem('id', id);
          setUser(data?.data?.user ?? data);
          setIsLoggingOut(false); 
          navigate(from, { replace: true });
         
        },
        onError: () => {
          setError('بيانات تسجيل الدخول غير صحيحة');
        },
      }
    );
  };

  const handleRegister1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // setUser(data?.user ?? data);
    setMode('register2');
    // registerMutation.mutate(
    //   {
    //     path: '/Account/Register',
    //     data: {
    //       ...basic,
    //       bloodType: medical.bloodType,
    //       chronicDiseases: medical.chronicDiseases,
    //       allergies: medical.allergies,
    //       currentMedication: medical.currentMedication,
    //       status: medical.status,
    //     },
    //   },
    //   {
    //     onSuccess: (data: any) => {
    //       setUser(data?.user ?? data);
    //       setMode('register2'); // أو احذفي step2 لو مش محتاجاه
    //     },
    //     onError: (err: any) => {
    //       console.log("REGISTER ERROR:", err?.response?.data || err);
    //       setError(
    //         err?.response?.data?.message ||
    //         'حدث خطأ أثناء التسجيل، تحقق من البيانات'
    //       );
    //     }
    //   }
    // );
  };

  const handleRegister2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    registerMutation.mutate(
      {
        path: '/Account/Register',
        data: {
          ...basic,
          bloodType: medical.bloodType,
          chronicDiseases: medical.chronicDiseases,
          allergies: medical.allergies,
          currentMedication: medical.currentMedication,
          status: medical.status,
        },
      },
      {
        onSuccess: (data: any) => {
          const id = data?.data?.user?.id
          sessionStorage.setItem('id', id);
          setUser(data?.data?.user ?? data);
          setIsLoggingOut(false);
          navigate('/dashboard', { replace: true }); // أو احذفي step2 لو مش محتاجاه
        },
        onError: (err: any) => {
          console.log("REGISTER ERROR:", err?.response?.data || err);
          setError(
            err?.response?.data?.message ||
            'حدث خطأ أثناء التسجيل، تحقق من البيانات'
          );
        }
      }
    );
    // medicalMutation.mutate(
    //   {
    //     path: '/Account/medical/update',
    //     data: medical,
    //   },
    //   {
    //     onSuccess: () => {
    //       navigate('/dashboard', { replace: true });
    //     },
    //     onError: () => {
    //       setError('حدث خطأ أثناء حفظ البيانات الطبية');
    //     },
    //   }
    // );
  };

  const handleSkip = () => {
    registerMutation.mutate(
      {
        path: '/Account/Register',
        data: {
          ...basic,
          bloodType: medical?.bloodType ?? null,
          chronicDiseases: medical?.chronicDiseases ?? null,
          allergies: medical?.allergies ?? null,
          currentMedication: medical?.currentMedication ?? null,
          status: medical?.status ?? null,
        },
      },
      {
        onSuccess: (data: any) => {
          const id = data?.data?.user?.id
          sessionStorage.setItem('id', id);
          setUser(data?.data?.user ?? data);
          setIsLoggingOut(false);
          navigate('/dashboard', { replace: true }); // أو احذفي step2 لو مش محتاجاه
        },
        onError: (err: any) => {
          console.log("REGISTER ERROR:", err?.response?.data || err);
          setError(
            err?.response?.data?.message ||
            'حدث خطأ أثناء التسجيل، تحقق من البيانات'
          );
        }
      }
    );
  };
  const isPending =
    loginMutation.isPending || registerMutation.isPending || medicalMutation.isPending;

  /* ── Animation variants ── */
  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl relative">

        {/* Glow bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-teal-100/30 dark:from-emerald-900/30 dark:to-gray-900 rounded-3xl blur-3xl opacity-60" />

        <div className="relative backdrop-blur-2xl bg-white/95 dark:bg-gray-800/95 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-2xl p-8 md:p-10">

          {/* Steps indicator (register only) */}
          {(mode === 'register1' || mode === 'register2') && (
            <div className="flex items-center justify-center gap-6 mb-8">
              <StepDot active={mode === 'register1'} done={mode === 'register2'} label="البيانات الأساسية" />
              <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700 rounded" />
              <StepDot active={mode === 'register2'} done={false} label="السجل الطبي" />
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight mb-8">
            {mode === 'login' && 'تسجيل الدخول'}
            {mode === 'register1' && 'إنشاء حساب – الخطوة الأولى'}
            {mode === 'register2' && 'البيانات الطبية'}
          </h2>

          <AnimatePresence mode="wait">

            {/* ─── LOGIN ─── */}
            {mode === 'login' && (
              <motion.form
                key="login"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <Field label="البريد الإلكتروني" type="email" value={loginEmail} onChange={setLoginEmail} required />
                <Field label="كلمة المرور" type="password" value={loginPassword} onChange={setLoginPassword} required />

                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-lg font-bold shadow-xl transition-all duration-300 hover:scale-[1.01]"
                >
                  {isPending ? 'جاري الدخول...' : 'تسجيل الدخول'}
                </button>

                <p className="text-center text-sm text-gray-500">
                  ليس لديك حساب؟{' '}
                  <button
                    type="button"
                    onClick={() => { setError(null); setMode('register1'); }}
                    className="text-emerald-600 font-semibold underline hover:opacity-80"
                  >
                    إنشاء حساب جديد
                  </button>
                </p>
              </motion.form>
            )}

            {/* ─── REGISTER STEP 1 ─── */}
            {mode === 'register1' && (
              <motion.form
                key="register1"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleRegister1}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="الاسم الأول" value={basic.firstName} onChange={setB('firstName')} required />
                  <Field label="الاسم الأخير" value={basic.lastName} onChange={setB('lastName')} required />
                  <Field label="البريد الإلكتروني" type="email" value={basic.email} onChange={setB('email')} required />
                  <Field label="كلمة المرور" type="password" value={basic.password} onChange={setB('password')} required />
                  <Field label="تاريخ الميلاد" type="date" value={basic.dateOfBirth} onChange={setB('dateOfBirth')} required />
                  <Field label="رقم الهاتف" type="tel" value={basic.phoneNumber} onChange={setB('phoneNumber')} placeholder="+20..." required />
                  <div className="md:col-span-2">
                    <Field label="العنوان" value={basic.address} onChange={setB('address')} placeholder="المدينة، الشارع..." required />
                  </div>
                  <SelectField
                    label="الجنس"
                    value={basic.gender}
                    onChange={setB('gender')}
                    options={[
                      { label: 'ذكر', value: 'male' },
                      { label: 'أنثى', value: 'female' },
                    ]}
                  />
                </div>

                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-lg font-bold shadow-xl transition-all duration-300 hover:scale-[1.01]"
                >
                  {isPending ? 'جاري التسجيل...' : 'التالي ←'}
                </button>

                <p className="text-center text-sm text-gray-500">
                  لديك حساب؟{' '}
                  <button
                    type="button"
                    onClick={() => { setError(null); setMode('login'); }}
                    className="text-emerald-600 font-semibold underline hover:opacity-80"
                  >
                    تسجيل الدخول
                  </button>
                </p>
              </motion.form>
            )}

            {/* ─── REGISTER STEP 2 (Medical) ─── */}
            {mode === 'register2' && (
              <motion.form
                key="register2"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleRegister2}
                className="space-y-5"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                  أضف بياناتك الطبية لتسهيل التعامل في حالات الطوارئ.
                  يمكنك تخطي هذه الخطوة وإكمالها لاحقاً من لوحة التحكم.
                </p>

                <div className="grid md:grid-cols-2 gap-5 ">

                  <SelectField
                    label="فصيلة الدم"
                    value={medical.bloodType}
                    onChange={setM('bloodType')}
                    options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((b) => ({ label: b, value: b }))}
                  />

                  {/* <SelectField
                    label="الحالة الصحية"
                    value={medical.status}
                    onChange={setM('status')}
                    options={[
                      { label: 'مستقر', value: 'stable' },
                      { label: 'يحتاج متابعة', value: 'monitoring' },
                      { label: 'حرج', value: 'critical' },
                    ]}
                  /> */}
                  <div className="md:col-span-2">
                    <Field label="الأمراض المزمنة" value={medical.chronicDiseases} onChange={setM('chronicDiseases')} placeholder="مثال: السكري، ضغط الدم..." />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="الحساسية" value={medical.allergies} onChange={setM('allergies')} placeholder="مثال: البنسلين، الفول السوداني..." />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="الأدوية الحالية" value={medical.currentMedication} onChange={setM('currentMedication')} placeholder="مثال: ميتفورمين 500mg..." />
                  </div>
                </div>

                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex-1 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    تخطي الآن
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold shadow-xl transition-all duration-300 hover:scale-[1.01]"
                  >
                    {isPending ? 'جاري الحفظ...' : 'حفظ والدخول'}
                  </button>
                </div>
              </motion.form>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;