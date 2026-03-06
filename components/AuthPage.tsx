import React, { useState } from 'react';
import { firebaseAuth, createUserProfile, createMedicalRecord } from '../firebase';
import { User } from '../types';
import { useApiGet } from "../hook/Apis hooks/useApi";

interface AuthPageProps {
  onLoginSuccess?: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [bandId, setBandId] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [error, setError] = useState<string | null>(null);

  // ✅ إضافة الـ API Hook
  const { data, isLoading, isError, error: apiError } = useApiGet("/auth");

  const toggle = () => {
    setError(null);
    setIsSignup(!isSignup);
  };

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault();
    setError(null);

    try {

      const result = await firebaseAuth.signup(email, password);
      const uid = result.user.uid;

      await createUserProfile(uid, {
        BandID: bandId,
        name,
        email,
        dob,
        gender,
        height,
        weight,
      });

      await createMedicalRecord(uid, {
        allergies: [],
        bloodType: '',
        currentMedicines: [],
        pastSurgeries: [],
      });

      onLoginSuccess?.({
        uid,
        name,
        email,
        bandId,
        dob,
        gender
      } as any);

    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء التسجيل');
    }
  };

  const handleSignin = async (e: React.FormEvent) => {

    e.preventDefault();
    setError(null);

    try {

      const result = await firebaseAuth.signin(email, password);
      const uid = result.user.uid;

      onLoginSuccess?.({
        uid,
        name: '',
        email
      } as any);

    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
    }
  };

  const fields = isSignup
    ? [
        { label: "الاسم", value: name, setter: setName },
        { label: "Band ID", value: bandId, setter: setBandId },
        { label: "تاريخ الميلاد", value: dob, setter: setDob, type: "date" },
        { label: "الجنس", value: gender, setter: setGender },
        { label: "الطول", value: height, setter: setHeight },
        { label: "الوزن", value: weight, setter: setWeight }
      ]
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 animate-fadeIn">

      <div className="w-full max-w-2xl relative">

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-teal-100/30 dark:from-emerald-900/30 dark:to-gray-900 rounded-3xl blur-3xl opacity-60" />

        <div className="relative backdrop-blur-2xl bg-white/95 dark:bg-gray-800/95 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-2xl p-10 transition-all duration-500 hover:shadow-3xl">

          <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight mb-10">
            {isSignup ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </h2>

          <form onSubmit={isSignup ? handleSignup : handleSignin} className="space-y-8">

            {isSignup && (
              <div className="grid md:grid-cols-2 gap-6">

                {fields.map((field, index) => (
                  <div key={index} className="space-y-2 group">

                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {field.label}
                    </label>

                    <input
                      type={(field as any).type || "text"}
                      value={field.value}
                      onChange={e => field.setter(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 hover:border-emerald-300"
                    />

                  </div>
                ))}

              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 hover:border-emerald-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                كلمة المرور
              </label>

              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 hover:border-emerald-300"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold shadow-xl hover:shadow-emerald-400/30 transition-all duration-300 hover:scale-[1.01]"
            >
              {isSignup ? 'إنشاء الحساب' : 'تسجيل الدخول'}
            </button>

          </form>

          <div className="mt-8 text-center">
            <button
              onClick={toggle}
              className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 underline hover:opacity-80 transition"
            >
              {isSignup ? 'لديك حساب؟ تسجيل الدخول' : 'إنشاء حساب جديد'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;
