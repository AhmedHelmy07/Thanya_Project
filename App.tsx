import React, { useState, useEffect } from 'react';
import PatientDashboard from './components/PatientDashboard';
import PatientProfile from './components/PatientProfile';
import HomePage from './components/HomePage';
import DevicesPage from './components/DevicesPage';
import ContactPage from './components/ContactPage';
import { mockPatients } from './constants';
import type { Patient } from './types';
import { auth, firebaseAuth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AuthPage from './components/AuthPage';
import type { User as AppUser, MedicalRecord } from './types';
import SOSPage from './components/SOSPage';
import { getMedicalRecord } from './firebase';

// 📌 استيراد اللوجو PNG من المسار الصحيح
import LogoImage from './images/logos.png';

type View = 'home' | 'dashboard' | 'profile' | 'devices' | 'contact' | 'auth' | 'sos';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [curUser, setCurUser] = useState<AppUser | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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
    setIsOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurUser({ uid: user.uid, name: user.displayName || '', email: user.email || '' });
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

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('home');
    setTimeout(() => {
      document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'auth':
        return <AuthPage onLoginSuccess={(u) => { setCurUser(u); navigateTo('dashboard'); }} />;
      case 'sos':
        return <SOSPage />;
      case 'profile':
        if (selectedPatient) {
          return <PatientProfile patient={selectedPatient} onBack={handleBackToDashboard} medicalRecord={medicalRecord} />;
        }
        if (curUser) {
          return <PatientProfile patient={null as any} onBack={handleBackToDashboard} medicalRecord={medicalRecord} currentUserId={curUser.uid} />;
        }
        return <PatientDashboard onSelectPatient={handleSelectPatient} onOpenMyRecord={() => navigateTo('profile')} />;
      case 'dashboard':
        return <PatientDashboard onSelectPatient={handleSelectPatient} onOpenMyRecord={() => navigateTo('profile')} />;
      case 'devices':
        return <DevicesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigateToDashboard={() => navigateTo('dashboard')} />;
    }
  };

  const NavButton = ({ view, label }: { view: View; label: string }) => (
    <button
      onClick={() => navigateTo(view)}
      className={`relative font-medium transition-all duration-200
        ${currentView === view
          ? 'text-emerald-500 dark:text-emerald-400'
          : 'text-gray-600 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400'
        }`}
    >
      {label}
      {currentView === view && (
        <span className="absolute -bottom-1 right-0 w-full h-[2px] bg-emerald-500 dark:bg-emerald-400 rounded"></span>
      )}
    </button>
  );

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} min-h-screen transition-colors duration-500`}>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300
          ${scrollY > 20
            ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 shadow-lg'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
          }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              className="flex items-center gap-2 group"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-800 group-hover:scale-105 transition">
                <img src={LogoImage} alt="ثانية" className="h-6 w-6 object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                ثانية
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <NavButton view="dashboard" label="لوحة التحكم" />
              <NavButton view="devices" label="الأجهزة" />
              <NavButton view="sos" label="الطوارئ" />
              <button onClick={handleAboutClick} className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium">عنّا</button>
              <NavButton view="contact" label="اتصل بنا" />

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-1 rounded-lg border border-gray-400 dark:border-gray-600 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {curUser ? (
                <button
                  onClick={() => { firebaseAuth.signout(); setCurUser(null); navigateTo('home'); }}
                  className="px-5 py-2 text-sm font-semibold text-emerald-800 bg-yellow-400 rounded-xl hover:bg-yellow-500 hover:shadow-md transition-all duration-300"
                >
                  تسجيل الخروج
                </button>
              ) : (
                <button
                  onClick={() => navigateTo('auth')}
                  className="px-5 py-2 text-sm font-semibold text-emerald-800 bg-yellow-400 rounded-xl hover:bg-yellow-500 hover:shadow-md transition-all duration-300"
                >
                  تسجيل الدخول
                </button>
              )}
            </div>

            {/* Mobile Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={`bg-emerald-700 dark:bg-emerald-400 h-[2px] w-6 absolute transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-2'}`} />
              <span className={`bg-emerald-700 dark:bg-emerald-400 h-[2px] w-6 absolute transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`bg-emerald-700 dark:bg-emerald-400 h-[2px] w-6 absolute transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-2'}`} />
            </button>

          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col gap-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4">
              <NavButton view="dashboard" label="لوحة التحكم" />
              <NavButton view="devices" label="الأجهزة" />
              <NavButton view="sos" label="الطوارئ" />
              <NavButton view="contact" label="اتصل بنا" />
              <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-1 rounded-lg border border-gray-400 dark:border-gray-600 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

        </nav>
      </header>

      {/* Main */}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 mt-12 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ثانية الصحية. جميع الحقوق محفوظة.
        </p>
      </footer>

    </div>
  );
};

export default App;