import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="container mx-auto p-5 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
