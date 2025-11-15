import React, { useState, useEffect } from 'react';
import PatientDashboard from './components/PatientDashboard';
import PatientProfile from './components/PatientProfile';
import HomePage from './components/HomePage';
import DevicesPage from './components/DevicesPage';
import ContactPage from './components/ContactPage';
import { ThanyaLogo } from './components/icons';
import { mockPatients } from './constants';
import type { Patient } from './types';
import { db, auth, firebaseAuth } from './firebase'; // <-- Import db and auth from your firebase config
import { onAuthStateChanged } from 'firebase/auth';
import AuthPage from './components/AuthPage';
import type { User as AppUser, MedicalRecord } from './types';
import { getMedicalRecord } from './firebase';

// --- Firebase Status Note ---
// The `firebase.ts` file has been created. To connect the app:
// 1. Go to your Firebase project settings.
// 2. Find your `firebaseConfig` object.
// 3. Copy your project's keys into the placeholder values in `firebase.ts`.
// 4. In components (e.g., PatientDashboard), you can now replace
//    the usage of `mockPatients` with a Firestore query to fetch live data.
//    Example:
//    import { collection, getDocs } from "firebase/firestore";
//    const querySnapshot = await getDocs(collection(db, "patients"));
//    const patientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

type View = 'home' | 'dashboard' | 'profile' | 'devices' | 'contact' | 'auth';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [curUser, setCurUser] = useState<AppUser | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);

  const selectedPatient = selectedPatientId
    ? mockPatients.find(p => p.id === selectedPatientId)
    : null;

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatientId(patient.id);
    setCurrentView('profile');
  };

  const handleBackToDashboard = () => {
    setSelectedPatientId(null);
    setCurrentView('dashboard');
  };
  
  const navigateTo = (view: View) => {
    setCurrentView(view);
  }

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurUser({ uid: user.uid, name: user.displayName || '', email: user.email || '' });
        // fetch user doc and medical record if available
        const userDoc = await firebaseAuth.getUserDoc(user.uid);
        if (userDoc) {
          setCurUser((prev) => ({ ...(prev as AppUser), ...userDoc } as AppUser));
        }
        const mr = await getMedicalRecord(user.uid);
        if (mr) setMedicalRecord(mr as MedicalRecord);
      } else {
        setCurUser(null);
         setMedicalRecord(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAboutClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (currentView !== 'home') {
          navigateTo('home');
          // Use timeout to allow the view to render before scrolling
          setTimeout(() => {
              document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      } else {
          document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'auth':
        return <AuthPage onLoginSuccess={(u) => { setCurUser(u); navigateTo('dashboard'); }} />;
      case 'profile':
        return selectedPatient ? <PatientProfile patient={selectedPatient} onBack={handleBackToDashboard} medicalRecord={medicalRecord} /> : <PatientDashboard onSelectPatient={handleSelectPatient} />;
      case 'dashboard':
        return <PatientDashboard onSelectPatient={handleSelectPatient} />;
      case 'devices':
        return <DevicesPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage onNavigateToDashboard={() => navigateTo('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex items-center cursor-pointer">
              <ThanyaLogo className="h-8 w-auto text-emerald-600" />
              <span className="mr-3 text-2xl font-bold text-emerald-700 tracking-tight">ثانية</span>
            </a>
            <div className="hidden md:flex items-center space-x-6">
               <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard'); }} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">لوحة التحكم</a>
               <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('devices'); }} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">الأجهزة</a>
               <a href="#about-us" onClick={handleAboutClick} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">عنّا</a>
               <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">اتصل بنا</a>
               {curUser ? (
                 <button onClick={() => { firebaseAuth.signout(); setCurUser(null); navigateTo('home'); }} className="px-4 py-2 text-sm font-semibold text-emerald-700 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-all duration-200 shadow-sm">تسجيل الخروج</button>
               ) : (
                 <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('auth'); }} className="px-4 py-2 text-sm font-semibold text-emerald-700 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-all duration-200 shadow-sm">تسجيل الدخول</a>
               )}
            </div>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>

      <footer className="text-center py-6 mt-12 border-t border-gray-200">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ثانية الصحية. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default App;