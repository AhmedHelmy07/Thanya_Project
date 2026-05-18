import React, { useState, useEffect } from "react";
import { User, ClipboardList, Activity, X, } from "lucide-react";
import { useApiGet, useApiPut, } from "../../hooks/Apis hooks/useApi";
import LoadingScreen from "../atoms/LoadingScreen";
import ErrorScreen from "../atoms/ErrorScreen";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";



const PatientDashboard = () => {
  const { user:userd } = useAuth();

  /* ================= DASHBOARD ================= */
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useApiGet(
    "/Dashboard/user",
    {},
    ["dashboardUser", userd?.id],  !!userd
  );

  /* ================= USER ================= */

  const {
    data: userData,
  } = useApiGet(
    "/Account/me",
    {},
    ["me", userd?.id], !!userd
  );

  /* ================= MEDICAL ================= */

  // const {
  //   data: medicalData,
  // } = useApiGet(
  //   "/Account/Show medical",
  //   {},
  //   ["medical"]
  // );

  /* ================= UPDATE ================= */

  const {
    mutate: updateMedical,
    isPending,
  } = useApiPut(["medical"]);


  /* ================= DATA ================= */

  // IMPORTANT:
  // API returns direct object
  // NOT { data: {} }

  const dashboard = data || {};

  const user = userData || {};

  const medicalRecord =

    dashboard?.medicalRecord ||
    {};

  /* ================= STATES ================= */

  const [dark, setDark] =
    useState(false);

  const [
    showEditModal,
    setShowEditModal,
  ] = useState(false);

  const [editData, setEditData] =
    useState({
      bloodType: "",
      chronicDiseases: "",
      allergies: "",
      currentMedication: "",
    });

  /* ================= THEME ================= */

  useEffect(() => {

    const checkTheme = () => {
      setDark(
        document.documentElement.classList.contains(
          "dark"
        )
      );
    };

    checkTheme();

    const observer =
      new MutationObserver(checkTheme);

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () => observer.disconnect();

  }, []);

  /* ================= UPDATE ================= */
  const cleanValue = (val: string) =>
    val.trim() === "" ? null : val;
  const handleUpdate = () => {
    updateMedical(
      {
        path: "/Account/medical/update",
        data: {
          bloodType: cleanValue(editData.bloodType),
          chronicDiseases: cleanValue(editData.chronicDiseases),
          allergies: cleanValue(editData.allergies),
          currentMedication: cleanValue(editData.currentMedication),
        },
      },
      {
        onSuccess: (res) => {

          queryClient.invalidateQueries({ queryKey: ["dashboardUser", userd?.id] });

          setShowEditModal(false);
        },
      }
    );
  };
  /* ================= LOADING ================= */

  if (isLoading) {

    return (
      <LoadingScreen
        message="Loading Dashboard..."
      />
    );
  }

  /* ================= ERROR ================= */

  if (isError) {

    return (
      <ErrorScreen
        statusCode={(error as any)?.status}
      />
    );
  }

  return (

    <main className="relative min-h-screen overflow-hidden bg-gradient-to-r from-emerald-50 to-white px-6 py-6 dark:from-gray-900 dark:to-gray-950">

      {/* GLOW */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl animate-pulse" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl animate-pulse" />

      {/* CONTENT */}

      <div className="relative z-10 space-y-8">

        {/* HEADER */}

        <header className="flex items-center gap-4">

          <div className="rounded-2xl bg-emerald-500/10 p-3">

            <User
              className={
                dark
                  ? "text-emerald-300"
                  : "text-emerald-600"
              }
            />

          </div>

          <div>

            <h1
              className={`text-2xl font-bold ${dark
                ? "text-white"
                : "text-gray-900"
                }`}
            >
              {user?.name}
            </h1>

            <p
              className={`text-sm ${dark
                ? "text-gray-300"
                : "text-gray-600"
                }`}
            >
              {user?.email}
            </p>

          </div>

        </header>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-4">

          <Stat
            label="Total"
            value={
              dashboard?.totalDevices || 0
            }
            dark={dark}
          />

          <Stat
            label="Online"
            value={
              dashboard?.onlineDevices || 0
            }
            dark={dark}
            green
          />

          <Stat
            label="Offline"
            value={
              dashboard?.offlineDevices || 0
            }
            dark={dark}
            red
          />

        </div>

        {/* GRID */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* MEDICAL */}

          <section
            className={`rounded-2xl border p-5 backdrop-blur ${dark
              ? "border-gray-700 bg-gray-800/60 text-white"
              : "border-gray-200 bg-white/70 text-gray-900"
              } lg:col-span-2`}
          >

            <div className="mb-4 flex items-center justify-between">

              <h2 className="flex items-center gap-2 font-bold">

                <ClipboardList />

                Medical Record

              </h2>

              <button
                onClick={() => {
                  setEditData({
                    bloodType: medicalRecord?.bloodType || "",
                    chronicDiseases: medicalRecord?.chronicDiseases || "",
                    allergies: medicalRecord?.allergies || "",
                    currentMedication: medicalRecord?.currentMedication || "",
                  });

                  setShowEditModal(true);
                }}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-white"
              >
                Update
              </button>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <Card
                label="Blood Type"
                value={
                  medicalRecord?.bloodType
                }
                dark={dark}
              />

              <Card
                label="Chronic Diseases"
                value={
                  medicalRecord?.chronicDiseases
                }
                dark={dark}
              />

              <Card
                label="Allergies"
                value={
                  medicalRecord?.allergies
                }
                dark={dark}
              />

              <Card
                label="Medication"
                value={
                  medicalRecord?.currentMedication
                }
                dark={dark}
              />

            </div>

          </section>

          {/* DEVICES */}

          <section
            className={`rounded-2xl border p-5 backdrop-blur ${dark
              ? "border-gray-700 bg-gray-800/60 text-white"
              : "border-gray-200 bg-white/70 text-gray-900"
              }`}
          >

            <h2 className="mb-4 flex items-center gap-2 font-bold">

              <Activity />

              Devices

            </h2>

            <div className="space-y-4">

              {(dashboard?.devices ?? []).map(
                (d: any) => {

                  const isOnline =
                    d?.status?.toLowerCase() ===
                    "online";

                  return (

                    <div
                      key={d.deviceId}
                      className={`rounded-xl border p-4 ${dark
                        ? "border-gray-700 bg-gray-900/40"
                        : "border-gray-200 bg-gray-50"
                        }`}
                    >

                      <p className="font-bold">
                        {d.name}
                      </p>

                      <p className="text-xs opacity-70">
                        ID: {d.deviceId}
                      </p>

                      <p className="mt-1 text-sm">

                        Status:

                        <span
                          className={`ml-1 ${isOnline
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                        >
                          {d.status}
                        </span>

                      </p>

                      <p className="mt-1 text-xs opacity-70">
                        Lat: {d.lat} | Long:{" "}
                        {d.long}
                      </p>

                      {/* BATTERY */}

                      <div className="mt-3">

                        <div className="mb-1 flex justify-between text-xs">

                          <span>
                            Battery
                          </span>

                          <span>
                            {d.battery}%
                          </span>

                        </div>

                        <div className="h-2 w-full rounded-full bg-gray-300">

                          <div
                            className="h-2 rounded-full bg-emerald-500"
                            style={{
                              width: `${d.battery}%`,
                            }}
                          />

                        </div>

                      </div>

                      <p className="mt-2 text-xs opacity-60">
                        {d.lastUpdate}
                      </p>

                    </div>
                  );
                }
              )}

            </div>

          </section>

        </div>

        {/* MODAL */}

        {showEditModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div
              className={`relative w-full max-w-md rounded-2xl p-6 ${dark
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
                }`}
            >

              {/* CLOSE */}

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="absolute right-4 top-4"
              >
                <X />
              </button>

              <h2 className="mb-4 font-bold">

                Edit Medical Record

              </h2>

              {/* INPUTS */}

              <select
                value={editData.bloodType}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    bloodType: e.target.value,
                  })
                }
                className={`mb-3 w-full rounded-xl border p-3 ${dark
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-black"
                  }`}
              >
                <option value="" disabled>
                  Select Blood Type
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <input
                value={
                  editData.chronicDiseases
                }
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    chronicDiseases:
                      e.target.value,
                  })
                }
                placeholder="الأمراض المزمنة"
                className={`mb-3 w-full rounded-xl border p-3 ${dark
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-black"
                  }`}
              />

              <input
                value={editData.allergies}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    allergies:
                      e.target.value,
                  })
                }
                placeholder="الحساسية"
                className={`mb-3 w-full rounded-xl border p-3 ${dark
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-black"
                  }`}
              />

              <input
                value={
                  editData.currentMedication
                }
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    currentMedication:
                      e.target.value,
                  })
                }
                placeholder="الأدوية الحالية"
                className={`mb-4 w-full rounded-xl border p-3 ${dark
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-black"
                  }`}
              />

              {/* SAVE */}

              <button
                onClick={handleUpdate}
                disabled={isPending}
                className="w-full rounded-xl bg-emerald-500 py-3 text-white"
              >
                {isPending
                  ? "Saving..."
                  : "Save"}
              </button>

            </div>

          </div>

        )}

      </div>

    </main>
  );
};

/* ================= STAT ================= */

const Stat = ({
  label,
  value,
  dark,
  green,
  red,
}: any) => (

  <div
    className={`rounded-xl border p-4 text-center ${dark
      ? "border-gray-700 bg-gray-800/40 text-white"
      : "bg-white"
      }`}
  >

    <p className="text-xs opacity-70">
      {label}
    </p>

    <p
      className={`text-xl font-bold ${green
        ? "text-green-400"
        : red
          ? "text-red-400"
          : ""
        }`}
    >
      {value}
    </p>

  </div>
);

/* ================= CARD ================= */

const Card = ({
  label,
  value,
  dark,
}: any) => (

  <div
    className={`rounded-xl border p-4 ${dark
      ? "border-gray-700 bg-gray-900/40 text-white"
      : "bg-gray-50 text-gray-900"
      }`}
  >

    <p className="text-xs opacity-70">
      {label}
    </p>

    <p className="font-bold">
      {value || "-"}
    </p>

  </div>
);

export default PatientDashboard;