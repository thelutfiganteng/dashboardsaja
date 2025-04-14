
import React from 'react';
import { ScheduleItem } from '@/types';

interface ScheduleItemDetailsProps {
  item: ScheduleItem;
}

const ScheduleItemDetails: React.FC<ScheduleItemDetailsProps> = ({ item }) => {
  // Helper function to format dates
  const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return '—';
    
    try {
      const date = new Date(dateTimeStr);
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateTimeStr;
    }
  };
  
  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'belum-mulai': return 'bg-yellow-100 text-yellow-800';
      case 'sedang-berjalan': return 'bg-blue-100 text-blue-800';
      case 'selesai': return 'bg-green-100 text-green-800';
      case 'dibatalkan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function to get status label
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'belum-mulai': return 'Belum Mulai';
      case 'sedang-berjalan': return 'Sedang Berjalan';
      case 'selesai': return 'Selesai';
      case 'dibatalkan': return 'Dibatalkan';
      default: return status;
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-3 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">Tim</p>
          <p className="text-lg font-semibold">{item.tim}</p>
        </div>
        
        <div className="border p-3 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <div className="mt-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
              {getStatusLabel(item.status)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="border p-3 rounded-md">
        <p className="text-sm font-medium text-muted-foreground">Kegiatan</p>
        <p className="text-lg font-semibold">{item.kegiatan}</p>
      </div>
      
      <div className="border p-3 rounded-md">
        <h3 className="font-semibold mb-2 border-b pb-1">Jadwal</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-muted-foreground">Rencana Pelaksanaan</p>
            <p className="text-base font-medium">{formatDateTime(item.rencanaPelaksanaan)}</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-muted-foreground">Realisasi Mulai</p>
            <p className="text-base font-medium">
              {item.realisasiMulai ? formatDateTime(item.realisasiMulai) : '—'}
            </p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-muted-foreground">Realisasi Selesai</p>
            <p className="text-base font-medium">
              {item.realisasiSelesai ? formatDateTime(item.realisasiSelesai) : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItemDetails;
