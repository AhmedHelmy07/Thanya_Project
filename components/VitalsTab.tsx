import React from 'react';
import type { Vital } from '../types';

interface VitalsTabProps {
  vitals: Vital[];
}

const VitalsChart: React.FC<{ vitals: Vital[] }> = ({ vitals }) => {

  const chartHeight = 200;
  const chartWidth = 700;
  const padding = 30;

  const heartRates = [...vitals.map(v => v.heartRate).reverse()];

  const maxRate = Math.max(...heartRates, 100);
  const minRate = Math.min(...heartRates, 40);
  const range = Math.max(maxRate - minRate, 1);

  const points = heartRates.map((rate, i) => {

    const x =
      (i / Math.max(heartRates.length - 1, 1)) *
      (chartWidth - padding * 2) +
      padding;

    const y =
      chartHeight -
      padding -
      ((rate - minRate) / range) *
      (chartHeight - padding * 2);

    return `${x},${y}`;

  }).join(' ');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 p-7 space-y-5">

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          معدل ضربات القلب
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          تحليل المؤشر الحيوي عبر الزمن
        </p>
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto select-none"
      >
        <polyline
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          points={points}
        />

        {points.split(' ').map((point, i) => {

          const [x, y] = point.split(',');

          return (
            <g key={i}>
              <circle
                cx={parseFloat(x)}
                cy={parseFloat(y)}
                r="5"
                fill="#10b981"
                className="hover:scale-125 transition-transform duration-300"
              />

              <text
                x={parseFloat(x)}
                y={parseFloat(y) - 14}
                fontSize="11"
                fill="#6b7280"
                textAnchor="middle"
                className="select-none"
              >
                {heartRates[i]}
              </text>
            </g>
          );

        })}
      </svg>

    </div>
  );
};

const VitalsTab: React.FC<VitalsTabProps> = ({ vitals }) => {

  return (
    <div className="animate-fadeIn space-y-10">

      <VitalsChart vitals={vitals} />

      <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px] divide-y divide-gray-200 dark:divide-gray-700">

            <thead className="bg-gray-50 dark:bg-gray-800/60">
              <tr className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">

                <th className="px-7 py-5 text-right">
                  التاريخ
                </th>

                <th className="px-7 py-5 text-right">
                  ضغط الدم
                </th>

                <th className="px-7 py-5 text-right text-emerald-600">
                  معدل ضربات القلب
                </th>

                <th className="px-7 py-5 text-right">
                  الحرارة (°م)
                </th>

              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">

              {vitals.map((vital, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition duration-200"
                >

                  <td className="px-7 py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {new Date(vital.date).toLocaleDateString('ar-EG')}
                  </td>

                  <td className="px-7 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {vital.bloodPressure}
                  </td>

                  <td className="px-7 py-4 text-sm font-semibold text-emerald-600 whitespace-nowrap">
                    {vital.heartRate} bpm
                  </td>

                  <td className="px-7 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {vital.temperature}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default VitalsTab;
