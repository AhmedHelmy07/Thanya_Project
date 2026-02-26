import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, LogOut, Menu, Sun, Moon } from 'lucide-react';

import PatientDashboard from './components/PatientDashboard';
import PatientProfile from './components/PatientProfile';
import HomePage from './components/HomePage';
import DevicesPage from './components/DevicesPage';
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import SOSPage from './components/SOSPage';
import StorePage from './components/StorePage';

import { mockPatients } from './constants';
import type { Patient } from './types';
import type { User as AppUser, MedicalRecord } from './types';

import { auth, firebaseAuth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getMedicalRecord } from './firebase';

import logo from './images/logos.png';

type View =
  | 'home'
  | 'dashboard'
  | 'profile'
  | 'devices'
  | 'contact'
  | 'auth'
  | 'sos'
  | 'store';

const App: React.FC = () => {

  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [curUser, setCurUser] = useState<AppUser | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState(false);

  const selectedPatient = selectedPatientId
    ? mockPatients.find((p) => p.id === selectedPatientId)
    : null;

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setAvatarMenu(false);
  };

  /* ⭐ Dark Mode Persistence Fix */
  useEffect(() => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

  }, []);

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [darkMode]);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {

        setCurUser({
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
        });

        const userDoc = await firebaseAuth.getUserDoc(user.uid);

        if (userDoc) {
          setCurUser((prev) => ({
            ...(prev as AppUser),
            ...userDoc,
          }));
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

  const renderContent = () => {

    switch (currentView) {

      case 'auth':
        return <AuthPage onLoginSuccess={(u)=>{setCurUser(u);navigateTo('dashboard');}} />;

      case 'sos':
        return <SOSPage />;

      case 'store':
        return <StorePage />;

      case 'profile':
        return (
          <PatientProfile
            patient={selectedPatient as any}
            onBack={()=>navigateTo('dashboard')}
            medicalRecord={medicalRecord}
            currentUserId={curUser?.uid}
          />
        );

      case 'dashboard':
        return (
          <PatientDashboard
            onSelectPatient={(patient: Patient)=>{
              setSelectedPatientId(patient.id);
              navigateTo('profile');
            }}
            onOpenMyRecord={()=>navigateTo('profile')}
          />
        );

      case 'devices':
        return <DevicesPage />;

      case 'contact':
        return <ContactPage />;

      case 'home':
      default:
        return <HomePage onNavigateToDashboard={()=>navigateTo('dashboard')} />;
    }
  };

  const navButton =
    "relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-emerald-500 dark:hover:text-emerald-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-500 hover:after:w-full after:transition-all";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">

      <header className="sticky top-0 z-50">
        <div className="backdrop-blur-2xl bg-white/70 dark:bg-gray-800/70 border-b border-white/20 shadow-xl">

          <div className="container mx-auto px-6 h-20 flex items-center justify-between">

            <div
              onClick={()=>navigateTo('home')}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="w-12 h-12 rounded-2xl overflow-hidden bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center"
              >
                <img src={logo} className="w-10 h-10 object-contain" />
              </motion.div>

              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                ثانية
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-6 text-gray-600 dark:text-gray-300">

              <button onClick={()=>navigateTo('dashboard')} className={navButton}>لوحة التحكم</button>
              <button onClick={()=>navigateTo('devices')} className={navButton}>الأجهزة</button>
              <button onClick={()=>navigateTo('sos')} className={navButton}>الطوارئ</button>
              <button onClick={()=>navigateTo('store')} className={navButton}>المتجر</button>
              <button className={navButton}>عنّا</button>
              <button onClick={()=>navigateTo('contact')} className={navButton}>اتصل بنا</button>

              <button
                onClick={()=>setDarkMode(prev => !prev)}
                className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
              >
                {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
              </button>

              <Bell className="cursor-pointer hover:text-emerald-500 transition" size={20}/>

              {curUser ? (

                <div className="relative">

                  <button
                    onClick={()=>setAvatarMenu(!avatarMenu)}
                    className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                  >
                    <User size={18}/>
                  </button>

                  <AnimatePresence>
                    {avatarMenu && (
                      <motion.div
                        initial={{ opacity:0, y:10 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0, y:10 }}
                        className="absolute left-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 flex flex-col gap-2"
                      >
                        <button
                          onClick={()=>{
                            firebaseAuth.signout();
                            setCurUser(null);
                            navigateTo('home');
                          }}
                          className="flex items-center gap-2 hover:text-red-500"
                        >
                          <LogOut size={16}/> تسجيل الخروج
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              ) : (
                

                <button
                  onClick={()=>navigateTo('auth')}
                  className="px-5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-semibold shadow-md transition"
                >
                  تسجيل الدخول
                </button>
              )}

            </div>

            <button
              className="lg:hidden"
              onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={28}/>
            </button>

          </div>

          {/* <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height:0, opacity:0 }}
                animate={{ height:'auto', opacity:1 }}
                exit={{ height:0, opacity:0 }}
                className="lg:hidden px-6 pb-6 flex flex-col gap-4 text-gray-600 dark:text-gray-300 overflow-hidden"
              >
                <button onClick={()=>navigateTo('dashboard')}>لوحة التحكم</button>
                <button onClick={()=>navigateTo('devices')}>الأجهزة</button>
                <button onClick={()=>navigateTo('sos')}>الطوارئ</button>
                <button onClick={()=>navigateTo('store')}>المتجر</button>
                <button onClick={()=>navigateTo('contact')}>اتصل بنا</button>
              </motion.div>
            )}
          </AnimatePresence> */}
          <AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="lg:hidden px-6 pb-6 flex flex-col gap-4 text-gray-600 dark:text-gray-300 overflow-hidden"
    >
      <button onClick={() => navigateTo("dashboard")}>
        لوحة التحكم
      </button>

      <button onClick={() => navigateTo("devices")}>
        الأجهزة
      </button>

      <button onClick={() => navigateTo("sos")}>
        الطوارئ
      </button>

      <button onClick={() => navigateTo("store")}>
        المتجر
      </button>

      <button onClick={() => navigateTo("home")}>
        عنّا
      </button>

      <button onClick={() => navigateTo("contact")}>
        اتصل بنا
      </button>

      {/* Dark Mode */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="text-left"
      >
        {darkMode ? "الوضع الفاتح ☀️" : "الوضع الداكن 🌙"}
      </button>

      {/* Auth */}
      {curUser ? (
        <button
          onClick={() => {
            firebaseAuth.signout();
            setCurUser(null);
            navigateTo("home");
          }}
          className="text-red-500"
        >
          تسجيل الخروج
        </button>
      ) : (
        <button
          onClick={() => navigateTo("auth")}
          className="text-emerald-600 dark:text-emerald-400 font-semibold"
        >
          تسجيل الدخول
        </button>
      )}
    </motion.div>
  )}
</AnimatePresence>

        </div>
      </header>

      <main className="container mx-auto p-5 lg:p-10">
        {renderContent()}
      </main>

    </div>
  );
};

export default App;