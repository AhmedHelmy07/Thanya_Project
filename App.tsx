
import React from 'react';
import PatientProfile from './components/PatientProfile';
import { LogoIcon } from './components/icons';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <LogoIcon className="h-8 w-auto text-emerald-600" />
              <span className="ml-3 text-2xl font-bold text-emerald-700 tracking-tight">Thanya</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
               <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">Dashboard</a>
               <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">Patients</a>
               <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">Devices</a>
               <a href="#" className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-all duration-200 shadow-sm">
                Log In
               </a>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <PatientProfile />
      </main>

      <footer className="text-center py-6 mt-12 border-t border-gray-200">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Thanya Health. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
