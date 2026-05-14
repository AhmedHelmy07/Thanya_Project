import React from "react";
import { useApiGet } from "../hooks/Apis hooks/useApi";
import { DeviceIcon, ClockIcon } from "../components/atoms/icons";
import LoadingScreen from "../components/atoms/LoadingScreen";
import ErrorScreen from "../components/atoms/ErrorScreen";

/* ===========================
   TYPE FIX (مهم جدًا)
=========================== */

type ApiDevice = {
  id: number;
  deviceId: string;
  name: string;
  battery: number;
  status: string;
  lat: number;
  long: number;
  lastUpdate: string;
  userId: number;
};

/* ===========================
   Device Card
=========================== */

const DeviceCard: React.FC<{ device: ApiDevice }> = ({ device }) => {
  const isConnected =
    device.status?.toLowerCase() === "online" ||
    device.status?.toLowerCase() === "متصل";

  return (
    <div
      className="
      relative
      bg-white/80 dark:bg-gray-900/40
      backdrop-blur-sm
      border border-gray-200 dark:border-gray-700
      rounded-3xl
      shadow-sm
      hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300
      overflow-hidden
      flex flex-col
    "
    >
      {/* Top Accent Bar */}
      <div
        className={`h-1 w-full ${
          isConnected ? "bg-emerald-500" : "bg-gray-400"
        }`}
      />

      <div className="p-7 flex flex-col gap-6 flex-grow">

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-5 sm:items-center">

          <div className="relative w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <DeviceIcon className="w-10 h-10 text-emerald-500" />

            {/* Status Dot */}
            <span
              className={`absolute -bottom-2 -right-2 h-5 w-5 rounded-full ring-2 ring-white dark:ring-gray-900
              ${isConnected ? "bg-emerald-500" : "bg-gray-400"}`}
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {device.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Device ID: {device.deviceId}
            </p>

            <div className="mt-3">
              <span
                className={`
                  inline-flex items-center px-4 py-1.5
                  text-xs font-semibold rounded-full
                  ${
                    isConnected
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }
                `}
              >
                {isConnected ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Location */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          📍 Location: {device.lat}, {device.long}
        </div>

        {/* Battery */}
        <div>
          <div className="flex justify-between text-xs mb-1 text-gray-500">
            <span>Battery</span>
            <span>{device.battery}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-2 bg-emerald-500 rounded-full"
              style={{ width: `${device.battery}%` }}
            />
          </div>
        </div>

        {/* Last Sync */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Last Update
          </div>

          <span>
            {new Date(device.lastUpdate).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   Devices Page
=========================== */

const DevicesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useApiGet(
    "/Devices/GETDevices",
    {},
    ["devices"]
  );

  const devices: ApiDevice[] = data?.data ?? [];

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorScreen
        statusCode={(error as any)?.status}
      />
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-6 md:p-10">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center gap-3">
          <DeviceIcon className="w-8 h-8 text-emerald-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Devices
          </h1>
        </div>

        {/* Grid */}
        {devices.length > 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No devices found
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesPage;
// import React from "react";
// import { DeviceIcon, ClockIcon } from "../components/atoms/icons";

// /* ===========================
//    TYPE (حل الـ ERROR)
// =========================== */

// type Device = {
//   id: number;
//   deviceId: string;
//   name: string;
//   battery: number;
//   status: string;
//   lat: number;
//   long: number;
//   lastUpdate: string;
// };

// /* ===========================
//    FAKE DATA (UI ONLY)
// =========================== */

// const fakeDevices: Device[] = [
//   {
//     id: 1,
//     deviceId: "D001",
//     name: "Thanyaband",
//     battery: 30,
//     status: "Offline",
//     lat: 0,
//     long: 0,
//     lastUpdate: "2026-03-21T04:32:24.7043389",
//   },
//   {
//     id: 2,
//     deviceId: "D002",
//     name: "Heart Monitor",
//     battery: 85,
//     status: "Online",
//     lat: 30.5,
//     long: 31.2,
//     lastUpdate: "2026-05-14T10:20:00",
//   },
// ];

// /* ===========================
//    DEVICE CARD
// =========================== */

// const DeviceCard: React.FC<{ device: Device }> = ({ device }) => {
//   const isConnected =
//     device.status?.toLowerCase() === "online" ||
//     device.status?.toLowerCase() === "متصل";

//   return (
//     <div
//       className="
//       relative
//       bg-white/80 dark:bg-gray-900/40
//       backdrop-blur-sm
//       border border-gray-200 dark:border-gray-700
//       rounded-3xl
//       shadow-sm
//       hover:shadow-2xl hover:-translate-y-1
//       transition-all duration-300
//       overflow-hidden
//       flex flex-col
//     "
//     >
//       {/* Top Accent Bar */}
//       <div
//         className={`h-1 w-full ${
//           isConnected ? "bg-emerald-500" : "bg-gray-400"
//         }`}
//       />

//       <div className="p-7 flex flex-col gap-6 flex-grow">

//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row gap-5 sm:items-center">

//           <div className="relative w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
//             <DeviceIcon className="w-10 h-10 text-emerald-500" />

//             {/* STATUS DOT */}
//             <span
//               className={`absolute -bottom-2 -right-2 h-5 w-5 rounded-full ring-2 ring-white dark:ring-gray-900
//               ${isConnected ? "bg-emerald-500" : "bg-gray-400"}`}
//             />
//           </div>

//           <div className="flex-1">
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//               {device.name}
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Device ID: {device.deviceId}
//             </p>

//             <div className="mt-3">
//               <span
//                 className={`
//                   inline-flex items-center px-4 py-1.5
//                   text-xs font-semibold rounded-full
//                   ${
//                     isConnected
//                       ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
//                       : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
//                   }
//                 `}
//               >
//                 {isConnected ? "Online" : "Offline"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div className="border-t border-gray-200 dark:border-gray-700" />

//         {/* LOCATION */}
//         <div className="text-sm text-gray-600 dark:text-gray-300">
//           📍 Location: {device.lat}, {device.long}
//         </div>

//         {/* BATTERY */}
//         <div>
//           <div className="flex justify-between text-xs mb-1 text-gray-500">
//             <span>Battery</span>
//             <span>{device.battery}%</span>
//           </div>

//           <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
//             <div
//               className="h-2 bg-emerald-500 rounded-full"
//               style={{ width: `${device.battery}%` }}
//             />
//           </div>
//         </div>

//         {/* LAST UPDATE */}
//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <div className="flex items-center gap-2">
//             <ClockIcon className="h-4 w-4" />
//             Last Update
//           </div>

//           <span>
//             {new Date(device.lastUpdate).toLocaleString()}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ===========================
//    PAGE
// =========================== */

// const DevicesPage: React.FC = () => {
//   const devices = fakeDevices;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-6 md:p-10">

//       <div className="max-w-7xl mx-auto space-y-10">

//         {/* HEADER */}
//         <div className="flex items-center gap-3">
//           <DeviceIcon className="w-8 h-8 text-emerald-500" />
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Devices Preview (Fake Data)
//           </h1>
//         </div>

//         {/* GRID */}
//         <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {devices.map((device) => (
//             <DeviceCard key={device.id} device={device} />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DevicesPage;