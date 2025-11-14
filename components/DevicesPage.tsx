import React from 'react';
import type { Device } from '../types';
import { mockDevices } from '../constants';
import { DeviceIcon, CheckCircleIcon, ClockIcon } from './icons';

const DeviceCard: React.FC<{ device: Device }> = ({ device }) => {
  const isConnected = device.status === 'متصل';
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start space-x-4">
          <img 
            className="h-20 w-20 rounded-lg object-cover ring-2 ring-gray-100"
            src={device.imageUrl}
            alt={device.name}
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{device.name}</h2>
            <p className="text-sm text-gray-500">{device.model}</p>
          </div>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center">
            <CheckCircleIcon className={`h-5 w-5 ml-2 ${isConnected ? 'text-emerald-500' : 'text-gray-400'}`} />
            <span className={`font-semibold ${isConnected ? 'text-emerald-600' : 'text-gray-600'}`}>
              الحالة: {device.status}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <ClockIcon className="h-5 w-5 ml-2 text-gray-400" />
            <span>آخر مزامنة: {device.lastSync}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <button 
          className="w-full text-center px-4 py-2 text-sm font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          إلغاء الربط
        </button>
      </div>
    </div>
  );
};

const DevicesPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <DeviceIcon className="h-8 w-8 ml-3 text-emerald-600" />
            الأجهزة المتصلة
          </h1>
          <p className="mt-1 text-md text-gray-600">إدارة أجهزتك الصحية المتصلة بحسابك.</p>
        </div>
        <button className="px-6 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-all duration-200 shadow-sm whitespace-nowrap">
            ربط جهاز جديد
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDevices.map(device => (
          <DeviceCard 
            key={device.id} 
            device={device} 
          />
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;
