import React, { useState, useEffect } from "react";
import { User, ClipboardList, Activity } from "lucide-react";
import { useApiGet, useApiPut } from "../../hooks/Apis hooks/useApi";
import LoadingScreen from "../atoms/LoadingScreen";
import ErrorScreen from "../atoms/ErrorScreen";

const PatientDashboard = ({ user }: any) => {

  const { data, isLoading, isError, error, refetch } =
    useApiGet("/Dashboard/user", {}, ["dashboard"]);

  const dashboard = data?.data ?? data;

  const { mutate: updateMedicalRecord, isPending } =
    useApiPut("/Account/medical/update");

  const [dark, setDark] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editData, setEditData] = useState({
    bloodType: "",
    chronicDiseases: "",
    allergies: "",
    currentMedication: "",
  });

  /* THEME */
  useEffect(() => {
    const checkTheme = () =>
      setDark(document.documentElement.classList.contains("dark"));

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* SET DATA FROM API ONLY */
  useEffect(() => {
    if (dashboard?.medicalRecord) {
      setEditData({
        bloodType: dashboard.medicalRecord.bloodType || "",
        chronicDiseases: dashboard.medicalRecord.chronicDiseases || "",
        allergies: dashboard.medicalRecord.allergies || "",
        currentMedication: dashboard.medicalRecord.currentMedication || "",
      });
    }
  }, [dashboard]);

  const handleUpdate = () => {
    updateMedicalRecord(
      {
        bloodType: editData.bloodType,
        chronicDiseases: editData.chronicDiseases,
        allergies: editData.allergies,
        currentMedication: editData.currentMedication,
      },
      {
        onSuccess: () => {
          setShowEditModal(false);
          refetch();
        },
      }
    );
  };

  if (isLoading) return <LoadingScreen message="جاري تحميل البيانات..." />;
  if (isError) return <ErrorScreen statusCode={(error as any)?.status} />;

  return (
    <main className="relative min-h-screen py-6 px-6 overflow-hidden transition-all duration-500 bg-gradient-to-r from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950">

      <div className="relative z-10 space-y-8">

        {/* HEADER */}
        <header className="flex items-center gap-3">
          <User className={dark ? "text-emerald-300" : "text-emerald-600"} />
          <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            {user?.name || "Patient Dashboard"}
          </h1>
        </header>

        {/* STATS (FROM BACKEND ONLY) */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <Stat label="Total" value={dashboard?.totalDevices} dark={dark} />
          <Stat label="Online" value={dashboard?.onlineDevices} dark={dark} />
          <Stat label="Offline" value={dashboard?.offlineDevices} dark={dark} />
        </div>

        {/* DEVICES (RAW FROM BACKEND) */}
        <section className={`p-5 rounded-2xl border backdrop-blur
          ${dark ? "bg-gray-800/60 border-gray-700 text-white" : "bg-white/70 border-gray-200 text-gray-900"}`}>

          <h2 className="flex items-center gap-2 font-bold mb-4">
            <Activity />
            Devices
          </h2>

          <div className="space-y-4">

            {(dashboard?.devices ?? []).length > 0 ? (
              dashboard.devices.map((d: any) => (
                <div
                  key={d.deviceId}
                  className={`relative p-4 rounded-2xl border
                  ${dark ? "border-gray-600 bg-gray-900/40" : "border-gray-200 bg-gray-50"}`}
                >

                  {/* 🚨 NO LOGIC — DIRECT FROM BACKEND */}
                  {d.status && (
                    <div
                      className={`absolute top-3 right-3 w-2 h-2 rounded-full`}
                    />
                  )}

                  <p className="font-bold text-lg">{d.name}</p>

                  <p className="text-xs opacity-70 mt-1">
                    Device ID: {d.deviceId}
                  </p>

                  <p className="text-xs opacity-70 mt-1">
                    Location: {d.lat}, {d.long}
                  </p>

                  {/* STATUS AS BACKEND STRING ONLY */}
                  <p className="text-sm mt-2">
                    Status: <span>{d.status}</span>
                  </p>

                  <p className="text-sm mt-2">
                    Battery: {d.battery}%
                  </p>

                  <p className="text-xs mt-3 opacity-60">
                    Last update: {d.lastUpdate}
                  </p>

                </div>
              ))
            ) : (
              <div className="text-center py-6 opacity-60 text-sm">
                No devices connected
              </div>
            )}

          </div>
        </section>

      </div>
    </main>
  );
};

/* ================= SMALL COMPONENTS ================= */

const Stat = ({ label, value, dark }: any) => (
  <div className={`p-4 rounded-xl border text-center
    ${dark ? "border-gray-700 bg-gray-800/40 text-white" : "bg-white"}`}>

    <p className="text-xs opacity-70">{label}</p>
    <p className="text-xl font-bold">{value}</p>

  </div>
);

export default PatientDashboard;
// import React, { useState, useEffect } from "react";
// import { User, ClipboardList, Activity } from "lucide-react";

// /* ================= FAKE API DATA (MATCH REAL BACKEND) ================= */

// const fakeDashboard = {
//   totalDevices: 1,
//   onlineDevices: 0,
//   offlineDevices: 1,

//   devices: [
//     {
//       deviceId: "D001",
//       name: "Bandthanya",
//       battery: 40,
//       status: "offline",
//       lat: 0,
//       long: 0,
//       lastUpdate: "2026-05-14T12:35:07.2929409",
//     },
//   ],

//   medicalRecord: {
//     bloodType: "A+",
//     chronicDiseases: "Diabetes",
//     allergies: "Penicillin",
//     currentMedication: "Metformin",
//   },
// };

// /* ================= COMPONENT ================= */

// const PatientDashboard = ({ user }: any) => {
//   const dashboard = fakeDashboard;

//   const [dark, setDark] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);

//   const [editData, setEditData] = useState(dashboard.medicalRecord);

//   /* ================= THEME DETECTOR ================= */

//   useEffect(() => {
//     const checkTheme = () => {
//       setDark(document.documentElement.classList.contains("dark"));
//     };

//     checkTheme();

//     const observer = new MutationObserver(checkTheme);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <main
//       className="relative min-h-screen py-6 px-6 overflow-hidden transition-all duration-500
//       bg-gradient-to-r from-emerald-50 to-white
//       dark:from-gray-900 dark:to-gray-950"
//     >
//       {/* ================= GLOW ================= */}

//       <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-100/10 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2" />

//       {/* ================= CONTENT ================= */}

//       <div className="relative z-10 space-y-8">

//         {/* HEADER */}
//         <header className="flex items-center gap-3">
//           <User className={`${dark ? "text-emerald-300" : "text-emerald-600"}`} />

//           <h1 className={`text-xl font-bold ${
//             dark ? "text-white" : "text-gray-900"
//           }`}>
//             {user?.name || "Patient Dashboard"}
//           </h1>
//         </header>

//         {/* ================= STATS ================= */}

//         <div className="grid grid-cols-3 gap-4 text-center">

//           <Stat label="Total" value={dashboard.totalDevices} dark={dark} />
//           <Stat label="Online" value={dashboard.onlineDevices} dark={dark} green />
//           <Stat label="Offline" value={dashboard.offlineDevices} dark={dark} red />

//         </div>

//         {/* ================= GRID ================= */}

//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* ================= MEDICAL ================= */}

//           <section className={`p-5 rounded-2xl border backdrop-blur transition
//             ${dark ? "bg-gray-800/60 border-gray-700 text-white" : "bg-white/70 border-gray-200 text-gray-900"}
//             lg:col-span-2`}>

//             <div className="flex justify-between mb-4">
//               <h2 className="flex items-center gap-2 font-bold">
//                 <ClipboardList />
//                 Medical Record
//               </h2>

//               <button
//                 onClick={() => setShowEditModal(true)}
//                 className="bg-emerald-500 text-white px-4 py-2 rounded-xl"
//               >
//                 Edit
//               </button>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-4">

//               <Card label="Blood Type" value={dashboard.medicalRecord.bloodType} dark={dark} />
//               <Card label="Chronic Diseases" value={dashboard.medicalRecord.chronicDiseases} dark={dark} />
//               <Card label="Allergies" value={dashboard.medicalRecord.allergies} dark={dark} />
//               <Card label="Medication" value={dashboard.medicalRecord.currentMedication} dark={dark} />

//             </div>
//           </section>

//           {/* ================= DEVICES ================= */}

//           <section className={`p-5 rounded-2xl border backdrop-blur transition
//             ${dark ? "bg-gray-800/60 border-gray-700 text-white" : "bg-white/70 border-gray-200 text-gray-900"}`}>

//             <h2 className="flex items-center gap-2 font-bold mb-4">
//               <Activity />
//               Devices
//             </h2>

//             <div className="space-y-4">

//               {dashboard.devices.map((d) => (
//                 <div
//                   key={d.deviceId}
//                   className={`p-4 rounded-xl border ${
//                     dark
//                       ? "border-gray-600 bg-gray-900/40 text-white"
//                       : "border-gray-200 bg-gray-50 text-gray-900"
//                   }`}
//                 >
//                   <p className="font-bold">{d.name}</p>

//                   <p className="text-xs opacity-70">
//                     ID: {d.deviceId}
//                   </p>

//                   <p className="text-sm mt-1">
//                     Status:{" "}
//                     <span className={d.status === "online" ? "text-green-400" : "text-red-400"}>
//                       {d.status}
//                     </span>
//                   </p>

//                   <p className="text-xs opacity-70 mt-1">
//                     Lat: {d.lat} | Long: {d.long}
//                   </p>

//                   <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
//                     <div
//                       className="h-2 bg-emerald-500 rounded-full"
//                       style={{ width: `${d.battery}%` }}
//                     />
//                   </div>

//                   <p className="text-xs mt-2 opacity-60">
//                     {d.lastUpdate}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* ================= MODAL ================= */}

//         {showEditModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

//             <div className={`w-full max-w-md p-6 rounded-2xl ${
//               dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
//             }`}>

//               <h2 className="font-bold mb-4">
//                 Edit Medical Record
//               </h2>

//               {Object.keys(editData).map((key) => (
//                 <input
//                   key={key}
//                   value={(editData as any)[key]}
//                   onChange={(e) =>
//                     setEditData({
//                       ...editData,
//                       [key]: e.target.value,
//                     })
//                   }
//                   className={`w-full p-2 mb-3 border rounded-xl ${
//                     dark
//                       ? "bg-gray-900 border-gray-700 text-white"
//                       : "bg-white border-gray-300 text-black"
//                   }`}
//                   placeholder={key}
//                 />
//               ))}

//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="w-full bg-emerald-500 text-white py-2 rounded-xl"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </main>
//   );
// };

// /* ================= SMALL STATS ================= */

// const Stat = ({ label, value, dark, green, red }: any) => (
//   <div
//     className={`p-4 rounded-xl border text-center ${
//       dark ? "border-gray-700 bg-gray-800/40 text-white" : "bg-white"
//     }`}
//   >
//     <p className="text-xs opacity-70">{label}</p>
//     <p className={`text-xl font-bold ${
//       green ? "text-green-400" : red ? "text-red-400" : ""
//     }`}>
//       {value}
//     </p>
//   </div>
// );

// /* ================= CARD ================= */

// const Card = ({ label, value, dark }: any) => (
//   <div
//     className={`p-4 rounded-xl border ${
//       dark ? "border-gray-700 bg-gray-900/40 text-white" : "bg-gray-50 text-gray-900"
//     }`}
//   >
//     <p className="text-xs opacity-70">{label}</p>
//     <p className="font-bold">{value}</p>
//   </div>
// );

// export default PatientDashboard;
// import React, { useState } from "react";
// import { User, ClipboardList, Activity } from "lucide-react";
// // import { useApiGet, useApiPut } from "../../hooks/Apis hooks/useApi";
// // import LoadingScreen from "../atoms/LoadingScreen";
// // import ErrorScreen from "../atoms/ErrorScreen";

// /* ================= FAKE DATA ================= */

// const fakeDashboard = {
//   totalDevices: 1,
//   onlineDevices: 0,
//   offlineDevices: 1,

//   devices: [
//     {
//       deviceId: "D001",
//       name: "Bandthanya",
//       battery: 40,
//       status: "offline",
//       lat: 0,
//       long: 0,
//       lastUpdate: "2026-05-14T12:35:07.2929409",
//     },
//   ],

//   medicalRecord: {
//     bloodType: "A+",
//     chronicDiseases: "Diabetes",
//     allergies: "Penicillin",
//     currentMedication: "Metformin",
//   },
// };

// const PatientDashboard = ({ user }: any) => {
//   const dashboard = fakeDashboard;

//   const [dark] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);

//   const [editData, setEditData] = useState(dashboard.medicalRecord);

//   return (
//     <main
//       className="relative min-h-screen py-6 px-6 overflow-hidden transition-all duration-500
//       bg-gradient-to-r from-emerald-50 to-white
//       dark:from-gray-900 dark:to-gray-950"
//     >
//       {/* BACKGROUND GLOW */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />

//       <div className="relative z-10 space-y-8">

//         {/* HEADER */}
//         <header className="flex items-center gap-3">
//           <User className="text-emerald-600" />
//           <h1 className="text-xl font-bold text-gray-900">
//             {user?.name || "Patient Dashboard"}
//           </h1>
//         </header>

//         {/* STATS */}
//         <div className="grid grid-cols-3 gap-4 text-center">
//           <Stat label="Total" value={dashboard.totalDevices} />
//           <Stat label="Online" value={dashboard.onlineDevices} green />
//           <Stat label="Offline" value={dashboard.offlineDevices} red />
//         </div>

//         {/* GRID */}
//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* MEDICAL */}
//           <section className="p-5 rounded-2xl border backdrop-blur bg-white/70 border-gray-200 text-gray-900 lg:col-span-2">

//             <div className="flex justify-between mb-4">
//               <h2 className="flex items-center gap-2 font-bold">
//                 <ClipboardList />
//                 Medical Record
//               </h2>

//               <button
//                 onClick={() => setShowEditModal(true)}
//                 className="bg-emerald-500 text-white px-4 py-2 rounded-xl"
//               >
//                 Edit
//               </button>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-4">

//               <Card label="Blood Type" value={dashboard.medicalRecord.bloodType} />
//               <Card label="Chronic Diseases" value={dashboard.medicalRecord.chronicDiseases} />
//               <Card label="Allergies" value={dashboard.medicalRecord.allergies} />
//               <Card label="Medication" value={dashboard.medicalRecord.currentMedication} />

//             </div>
//           </section>

//           {/* DEVICES */}
//           <section className="p-5 rounded-2xl border backdrop-blur bg-white/70 border-gray-200 text-gray-900">

//             <h2 className="flex items-center gap-2 font-bold mb-4">
//               <Activity />
//               Devices
//             </h2>

//             <div className="space-y-4">

//               {dashboard.devices.length > 0 ? (
//                 dashboard.devices.map((d: any) => (
//                   <div
//                     key={d.deviceId}
//                     className="relative p-4 rounded-2xl border border-gray-200 bg-gray-50"
//                   >
//                     {/* status dot */}
//                     <div
//                       className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
//                         d.status === "online" ? "bg-green-400" : "bg-red-400"
//                       }`}
//                     />

//                     <p className="font-bold text-lg">{d.name}</p>

//                     <p className="text-xs opacity-70 mt-1">
//                       Device ID: {d.deviceId}
//                     </p>

//                     <p className="text-xs opacity-70 mt-1">
//                       Location: {d.lat}, {d.long}
//                     </p>

//                     <p className="text-sm mt-2">
//                       Status:{" "}
//                       <span
//                         className={
//                           d.status === "online"
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }
//                       >
//                         {d.status}
//                       </span>
//                     </p>

//                     <div className="mt-3">
//                       <div className="flex justify-between text-xs mb-1">
//                         <span>Battery</span>
//                         <span>{d.battery}%</span>
//                       </div>

//                       <div className="w-full h-2 bg-gray-300 rounded-full">
//                         <div
//                           className="h-2 bg-emerald-500 rounded-full"
//                           style={{ width: `${d.battery}%` }}
//                         />
//                       </div>
//                     </div>

//                     <p className="text-xs mt-3 opacity-60">
//                       Last update: {d.lastUpdate}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No devices</p>
//               )}

//             </div>
//           </section>

//         </div>

//         {/* MODAL */}
//         {showEditModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
//             <div className="w-full max-w-md p-6 rounded-2xl bg-white text-gray-900">

//               <h2 className="font-bold mb-4">Edit Medical Record</h2>

//               {Object.keys(editData).map((key) => (
//                 <input
//                   key={key}
//                   value={(editData as any)[key]}
//                   onChange={(e) =>
//                     setEditData({
//                       ...editData,
//                       [key]: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 mb-3 border rounded-xl"
//                 />
//               ))}

//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="w-full bg-emerald-500 text-white py-2 rounded-xl"
//               >
//                 Save
//               </button>

//             </div>
//           </div>
//         )}

//       </div>
//     </main>
//   );
// };

// /* ================= SMALL COMPONENTS ================= */

// const Stat = ({ label, value, green, red }: any) => (
//   <div className="p-4 rounded-xl border bg-white text-center">
//     <p className="text-xs opacity-70">{label}</p>
//     <p
//       className={`text-xl font-bold ${
//         green ? "text-green-500" : red ? "text-red-500" : ""
//       }`}
//     >
//       {value}
//     </p>
//   </div>
// );

// const Card = ({ label, value }: any) => (
//   <div className="p-4 rounded-xl border bg-gray-50">
//     <p className="text-xs opacity-70">{label}</p>
//     <p className="font-bold">{value}</p>
//   </div>
// );

// export default PatientDashboard;