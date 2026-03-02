import React from "react";
import { useApiGet } from "../hook/Apis hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react";

interface Alert {
  id: string;
  device_name: string;
  time: string;
  resolved: boolean;
  details: string;
}

const SOSPage: React.FC = () => {

  const { data, isLoading, isError, error } =useApiGet("/sos/history", {}, ["sosHistory"]);

  const alertsList = data?.history ?? [];

  if (isLoading)
    return <LoadingScreen message="جاري تحميل تنبيهات الطوارئ..." />;

  if (isError)
    return <ErrorScreen statusCode={(error as any)?.status} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-all duration-500 p-4 sm:p-10">

      <div className="max-w-7xl mx-auto space-y-14">

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 px-5 py-2 rounded-full">
            <Activity className="text-emerald-600 w-5 h-5" />

            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              نظام الطوارئ الطبي الذكي
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
            سجل تنبيهات الطوارئ
          </h1>

          <p className="max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            عرض ومراقبة جميع تنبيهات الأجهزة الطبية المرتبطة بالنظام مع تحليل حالة كل تنبيه
            وتحديد حالته الصحية في الوقت الحقيقي.
          </p>
        </div>

        <AnimatePresence>
          {alertsList.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 space-y-5"
            >
              <AlertTriangle className="w-16 h-16 text-amber-500 animate-pulse" />

              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                لا توجد تنبيهات طوارئ مسجلة حاليًا في النظام الطبي
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alerts Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          <AnimatePresence>

            {alertsList.map((item: Alert, index: number) => (

              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: index * 0.05
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02
                }}
                className={`
                  relative rounded-3xl border backdrop-blur-2xl
                  p-7 shadow-xl transition-all duration-300 overflow-hidden group

                  ${item.resolved
                    ? "bg-green-50/60 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-red-50/60 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  }
                `}
              >

                <span className={`
                  absolute top-5 right-5 w-3 h-3 rounded-full animate-pulse

                  ${item.resolved ? "bg-green-500" : "bg-red-500"}
                `} />

                <div className="flex items-start gap-4 mb-5">

                  {item.resolved ? (
                    <CheckCircle className="text-green-600 w-7 h-7 flex-shrink-0" />
                  ) : (
                    <Clock className="text-red-600 w-7 h-7 flex-shrink-0" />
                  )}

                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.device_name}
                    </h3>

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.time}
                    </span>
                  </div>

                </div>

                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {item.details}
                </p>

                <div className="mt-6">
                  <span className={`
                    inline-block text-xs font-semibold px-5 py-2 rounded-full transition

                    ${item.resolved
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200"
                    }
                  `}>
                    {item.resolved ? "تم الحل" : "قيد المتابعة"}
                  </span>
                </div>

              </motion.div>
            ))}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
};

export default SOSPage;