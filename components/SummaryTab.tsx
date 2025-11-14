
import React from 'react';
import type { Patient, Appointment } from '../types';

interface SummaryTabProps {
  patient: Patient;
  appointments: Appointment[];
}

const InfoCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-slate-50 p-4 rounded-lg">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-md font-semibold text-gray-800">{value}</p>
  </div>
);

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
        <div>
            <p className="font-semibold text-emerald-700">{appointment.reason}</p>
            <p className="text-sm text-gray-600">{appointment.doctor}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium text-gray-800">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-sm text-gray-500">{appointment.time}</p>
        </div>
    </div>
);


const SummaryTab: React.FC<SummaryTabProps> = ({ patient, appointments }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard title="Primary Physician" value={patient.primaryPhysician} />
          <InfoCard title="Insurance Provider" value={patient.insuranceProvider} />
          <InfoCard title="Patient ID" value={patient.id} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
        <div className="space-y-3">
          {appointments.length > 0 ? (
            appointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryTab;
