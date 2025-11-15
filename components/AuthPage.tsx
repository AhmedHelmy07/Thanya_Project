import React, { useState } from 'react';
import { firebaseAuth, createUserProfile, createMedicalRecord } from '../firebase';
import { User } from '../types';

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
      // Create a user profile in Firestore compatible with provided structure
      await createUserProfile(uid, {
        BandID: bandId,
        name,
        email,
        dob,
        gender,
        height,
        weight,
      });
      // create an empty medical record (optional)
      await createMedicalRecord(uid, {
        allergies: [],
        bloodType: '',
        currentMedicines: [],
        pastSurgeries: [],
      });
      onLoginSuccess?.({ uid, name, email, bandId, dob, gender } as any);
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
      onLoginSuccess?.({ uid, name: '', email } as any);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">{isSignup ? 'إنشاء حساب' : 'تسجيل الدخول'}</h2>
      <form onSubmit={isSignup ? handleSignup : handleSignin}>
        <div className="grid gap-3">
          {isSignup && (
            <>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="الاسم" className="rounded-md border-gray-300 p-2" />
              <input value={bandId} onChange={e => setBandId(e.target.value)} placeholder="Band ID" className="rounded-md border-gray-300 p-2" />
              <input type="date" value={dob} onChange={e => setDob(e.target.value)} placeholder="تاريخ الميلاد" className="rounded-md border-gray-300 p-2" />
              <input value={gender} onChange={e => setGender(e.target.value)} placeholder="الجنس (Male/Female/ذكر/أنثى)" className="rounded-md border-gray-300 p-2" />
              <input value={height} onChange={e => setHeight(e.target.value)} placeholder="الطول" className="rounded-md border-gray-300 p-2" />
              <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="الوزن" className="rounded-md border-gray-300 p-2" />
            </>
          )}
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="البريد الإلكتروني" className="rounded-md border-gray-300 p-2" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور" className="rounded-md border-gray-300 p-2" required />
          <button className="bg-emerald-600 text-white rounded-md py-2 font-semibold" type="submit">
            {isSignup ? 'إنشاء الحساب' : 'تسجيل الدخول'}
          </button>
        </div>
      </form>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      <div className="mt-4 text-center">
        <button onClick={toggle} className="text-sm text-emerald-700 underline">{isSignup ? 'لديك حساب؟ تسجيل الدخول' : 'إنشاء حساب جديد'}</button>
      </div>
    </div>
  );
};

export default AuthPage;
