
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BudgetItem } from '@/types';

interface BudgetChartProps {
  data: BudgetItem[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const BudgetChart: React.FC<BudgetChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    if (data.length === 0) return [];
    
    const totalPagu = data.reduce((sum, item) => sum + item.pagu, 0);
    const totalRealisasi = data.reduce((sum, item) => sum + item.realisasi, 0);
    const totalSisa = totalPagu - totalRealisasi;
    
    return [
      { name: 'Pagu', value: totalPagu },
      { name: 'Realisasi', value: totalRealisasi },
      { name: 'Sisa', value: totalSisa }
    ];
  }, [data]);

  // Format number to Indonesian Rupiah
  const formatToRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (data.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">Tidak ada data untuk ditampilkan</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatToRupiah(value as number)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetChart;
