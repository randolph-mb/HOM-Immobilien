import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// FIX: Encapsulate object keys with hyphens in quotes to make them valid identifiers.
const data = [
  { name: 'Mo', 'E-Mails': Math.floor(Math.random() * 30) + 10 },
  { name: 'Di', 'E-Mails': Math.floor(Math.random() * 30) + 15 },
  { name: 'Mi', 'E-Mails': Math.floor(Math.random() * 30) + 20 },
  { name: 'Do', 'E-Mails': Math.floor(Math.random() * 30) + 25 },
  { name: 'Fr', 'E-Mails': Math.floor(Math.random() * 30) + 18 },
  { name: 'Sa', 'E-Mails': Math.floor(Math.random() * 15) + 5 },
  { name: 'So', 'E-Mails': Math.floor(Math.random() * 10) + 2 },
];

const EmailVolumeChart: React.FC = () => {
  return (
    <div className="bg-white p-4 shadow rounded-lg h-80">
        <h3 className="text-lg font-medium text-gray-900 mb-4">E-Mail-Volumen (letzte 7 Tage)</h3>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="E-Mails" fill="#1E40AF" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default EmailVolumeChart;
