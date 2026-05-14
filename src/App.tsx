import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/molecules/Layout';
import ProtectedLayout from './components/molecules/ProtectedLayout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import DevicesPage from './pages/DevicesPage';
import SOSPage from './pages/SOSPage';
import StorePage from './pages/StorePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
           <Route path="/store" element={<StorePage />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/sos" element={<SOSPage />} />
           
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
