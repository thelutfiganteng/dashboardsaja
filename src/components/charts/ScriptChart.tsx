
import React, { useMemo } from 'react';
import { ScriptItem } from '@/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface ScriptChartProps {
  data: ScriptItem[];
}

const ScriptChart: React.FC<ScriptChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const activityCounts = {
      penangananKasus: 0,
      undanganEksternal: 0,
      rapatInternal: 0,
      persuratanParaf: 0
    };
    
    data.forEach(item => {
      if (item.penangananKasus) activityCounts.penangananKasus++;
      if (item.undanganEksternal) activityCounts.undanganEksternal++;
      if (item.rapatInternal) activityCounts.rapatInternal++;
      if (item.persuratanParaf) activityCounts.persuratanParaf++;
    });
    
    return [
      { name: 'Penanganan Kasus', count: activityCounts.penangananKasus, color: '#1E40AF' },
      { name: 'Undangan Eksternal', count: activityCounts.undanganEksternal, color: '#F59E0B' },
      { name: 'Rapat Internal', count: activityCounts.rapatInternal, color: '#10B981' },
      { name: 'Persuratan Paraf', count: activityCounts.persuratanParaf, color: '#EF4444' },
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
        <Tooltip formatter={(value) => `${value} kegiatan`} />
        <Legend />
        <Bar dataKey="count" fill="#1E40AF">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScriptChart;
