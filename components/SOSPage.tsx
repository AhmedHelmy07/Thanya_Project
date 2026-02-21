import React from "react";
import { useApiGet } from "../hook/Apis hooks/useApi";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

interface Alert {
  id: string;
  device_name: string;
  time: string;
  resolved: boolean;
  details: string;
}

const SOSPage: React.FC = () => {
  const { data, isLoading, isError, error } = useApiGet("/sos/history", {}, ["sosHistory"]);
  const alertsList = data?.history ?? [];

  if (isLoading) return <LoadingScreen message="جاري تحميل البيانات..." />;
  if (isError) return <ErrorScreen statusCode={(error as any)?.status} />;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-emerald-700 mb-6">
          سجل تنبيهات الطوارئ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alertsList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.5,
                delay: index * 0.05,
              }}
              whileHover={{ y: -6 }}
              className={`rounded-xl border p-4 sm:p-6 shadow-md duration-300 ${item.resolved
                  ? "bg-green-50 border-green-200 hover:shadow-xl hover:shadow-green-300"
                  : "bg-red-50 border-red-200 hover:shadow-xl hover:shadow-red-300"
                }`}
            >
              <div className="flex justify-between items-start flex-wrap sm:flex-nowrap">
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{item.device_name}</p>
                  <p className="text-xs text-gray-500 mt-2">{item.time}</p>
                </div>

                <span
                  className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium mt-2 sm:mt-0 ${item.resolved
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                    }`}
                >
                  {item.resolved ? "تم الحل" : "قيد المتابعة"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-3">{item.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOSPage;