import React from 'react';
import type { Device } from '../types';
import { mockDevices } from '../constants';
import { DeviceIcon, ClockIcon } from './icons';

/* ===========================
   Device Card - Pro Version
=========================== */

const DeviceCard: React.FC<{ device: Device }> = ({ device }) => {
  const isConnected = device.status === 'متصل';

  return (
    <div className="
      relative
      bg-white/80 backdrop-blur-sm
      border border-gray-200/60
      rounded-3xl
      shadow-sm
      hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300
      overflow-hidden
      flex flex-col
    ">

      {/* Top Accent Bar */}
      <div
        className={`h-1 w-full ${
          isConnected ? 'bg-emerald-500' : 'bg-gray-300'
        }`}
      />

      <div className="p-7 flex flex-col gap-6 flex-grow">

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
          <div className="relative">
            <img
              className="h-24 w-24 rounded-2xl object-cover ring-1 ring-gray-200"
              src={device.imageUrl}
              alt={device.name}
            />

            {/* Status Dot */}
            <span
              className={`absolute -bottom-2 -right-2 h-5 w-5 rounded-full ring-2 ring-white
              ${isConnected ? 'bg-emerald-500' : 'bg-gray-400'}`}
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {device.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {device.model}
            </p>

            {/* Status Badge */}
            <div className="mt-4">
              <span
                className={`
                  inline-flex items-center px-4 py-1.5
                  text-xs font-semibold rounded-full
                  transition-all
                  ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-gray-100 text-gray-600'
                  }
                `}
              >
                {isConnected ? 'متصل حالياً' : 'غير متصل'}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Last Sync */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <ClockIcon className="h-4 w-4 ml-2 text-gray-400" />
            آخر مزامنة
          </div>

          <span className="font-medium text-gray-700">
            {device.lastSync}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-7 pb-6">
        <button
          className="
            w-full
            py-3
            text-sm font-semibold
            rounded-xl
            bg-gradient-to-r from-red-50 to-red-100
            text-red-600
            hover:from-red-100 hover:to-red-200
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
          "
        >
          إلغاء الربط
        </button>
      </div>
    </div>
  );
};

/* ===========================
   Devices Page - Premium UI
=========================== */

const DevicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">

      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <DeviceIcon className="h-9 w-9 text-emerald-600" />
              الأجهزة المتصلة
            </h1>

            <p className="mt-3 text-gray-600 text-base max-w-xl">
              تحكم كامل في أجهزتك الصحية المتصلة ومتابعة حالة الاتصال والمزامنة في الوقت الفعلي.
            </p>
          </div>

          <button
            className="
              self-start lg:self-auto
              px-7 py-3
              text-sm font-semibold
              text-white
              bg-emerald-600
              rounded-xl
              shadow-lg shadow-emerald-600/20
              hover:bg-emerald-700 hover:shadow-xl
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
            "
          >
            ربط جهاز جديد
          </button>
        </div>

        {/* Grid */}
        {mockDevices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {mockDevices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        ) : (
          <div className="
            text-center py-20
            bg-white
            rounded-3xl
            border border-dashed border-gray-300
            shadow-sm
          ">
            <h3 className="text-xl font-semibold text-gray-800">
              لا يوجد أجهزة متصلة
            </h3>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              قم بربط جهاز جديد لبدء متابعة بياناتك الصحية بسهولة وأمان.
            </p>

            <button
              className="
                mt-8
                px-8 py-3
                text-sm font-semibold
                text-white
                bg-emerald-600
                rounded-xl
                hover:bg-emerald-700
                transition duration-200
              "
            >
              ربط جهاز جديد
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DevicesPage;
