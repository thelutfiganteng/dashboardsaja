
import React from 'react';
import { BudgetItem } from '@/types';

interface BudgetItemDetailsProps {
  item: BudgetItem;
}

const BudgetItemDetails: React.FC<BudgetItemDetailsProps> = ({ item }) => {
  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Calculate percentage used
  const percentageUsed = ((item.realisasi / item.pagu) * 100).toFixed(2);

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-3 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
          <p className="text-lg font-semibold">{new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">ID Anggaran</p>
          <p className="text-lg font-semibold">{item.id}</p>
        </div>
      </div>
      
      <div className="border p-3 rounded-md">
        <h3 className="font-semibold mb-4 border-b pb-2">Detail Anggaran</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="text-sm font-medium text-blue-800">Pagu Anggaran</p>
            <p className="text-lg font-semibold text-blue-700">{formatCurrency(item.pagu)}</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-md">
            <p className="text-sm font-medium text-green-800">Realisasi</p>
            <p className="text-lg font-semibold text-green-700">{formatCurrency(item.realisasi)}</p>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-md">
            <p className="text-sm font-medium text-yellow-800">Sisa</p>
            <p className="text-lg font-semibold text-yellow-700">{formatCurrency(item.sisa)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-1">Presentase Penggunaan: {percentageUsed}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                parseFloat(percentageUsed) > 85 ? 'bg-red-600' : 
                parseFloat(percentageUsed) > 65 ? 'bg-yellow-500' : 'bg-green-600'
              }`} 
              style={{ width: `${Math.min(parseFloat(percentageUsed), 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetItemDetails;
