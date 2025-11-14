
import React from 'react';
import type { Vital } from '../types';

interface VitalsTabProps {
  vitals: Vital[];
}

const VitalsChart: React.FC<{ vitals: Vital[] }> = ({ vitals }) => {
  const chartHeight = 150;
  const chartWidth = 500;
  const padding = 20;

  const heartRates = vitals.map(v => v.heartRate).reverse();
  const maxRate = Math.max(...heartRates, 100);
  const minRate = Math.min(...heartRates, 40);
  const range = maxRate - minRate;
  
  const points = heartRates.map((rate, i) => {
    const x = (i / (heartRates.length - 1)) * (chartWidth - padding * 2) + padding;
    const y = chartHeight - padding - ((rate - minRate) / range) * (chartHeight - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h4 className="font-semibold text-gray-700 mb-2">Heart Rate Trend (bpm)</h4>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
        <polyline
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          points={points}
        />
        {points.split(' ').map((point, i) => {
           const [x, y] = point.split(',');
           return (
            <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#10b981" />
                <text x={parseFloat(x)} y={parseFloat(y) - 10} fontSize="10" fill="#374151" textAnchor="middle">{heartRates[i]}</text>
            </g>
           )
        })}
      </svg>
    </div>
  )
}

const VitalsTab: React.FC<VitalsTabProps> = ({ vitals }) => {
  return (
    <div className="animate-fadeIn space-y-6">
      <VitalsChart vitals={vitals} />
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Rate</th>
              <th scope="col" className="px-6 py-3 text