
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScheduleItem } from '@/types';

interface ScheduleChartProps {
  data: ScheduleItem[];
}

const ScheduleChart: React.FC<ScheduleChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return [
      { name: 'Belum Mulai', count: statusCounts['belum-mulai'] || 0, color: '#F59E0B' },
      { name: 'Sedang Berjalan', count: statusCounts['sedang-berjalan'] || 0, color: '#3B82F6' },
      { name: 'Selesai', count: statusCounts['selesai'] || 0, color: '#10B981' },
      { name: 'Dibatalkan', count: statusCounts['dibatalkan'] || 0, color: '#EF4444' }
    ];
  }, [data]);

  if (data.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">Tidak ada data untuk ditampilkan</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} tugas`} />
        <Bar dataKey="count" fill="#3B82F6" />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScheduleChart;
