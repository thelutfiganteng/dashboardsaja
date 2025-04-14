
import React from 'react';
import { ScriptItem } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ScriptItemDetailsProps {
  item: ScriptItem;
  detailsData?: {
    penangananKasusDetail?: string;
    undanganEksternalDetail?: string;
    rapatInternalDetail?: string;
    persuratanParafDetail?: string;
  };
}

const ScriptItemDetails: React.FC<ScriptItemDetailsProps> = ({ item, detailsData }) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-3 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">Minggu ke-</p>
          <p className="text-lg font-semibold">{item.minggu}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
          <p className="text-lg font-semibold">{new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
        </div>
      </div>
      
      <div className="border p-3 rounded-md">
        <h3 className="font-semibold mb-4 border-b pb-2">Kegiatan Inspektorat IV</h3>
        
        <div className="grid grid-cols-1 gap-6 mt-2">
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <h4 className="font-medium text-lg mb-2">Penanganan Kasus</h4>
            {detailsData?.penangananKasusDetail ? (
              <div className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md border">
                {detailsData.penangananKasusDetail}
              </div>
            ) : (
              <p className="text-gray-500 italic">Tidak ada detail</p>
            )}
          </div>
          
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <h4 className="font-medium text-lg mb-2">Undangan Eksternal / Arahan Pimpinan</h4>
            {detailsData?.undanganEksternalDetail ? (
              <div className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md border">
                {detailsData.undanganEksternalDetail}
              </div>
            ) : (
              <p className="text-gray-500 italic">Tidak ada detail</p>
            )}
          </div>
          
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <h4 className="font-medium text-lg mb-2">Rapat Internal</h4>
            {detailsData?.rapatInternalDetail ? (
              <div className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md border">
                {detailsData.rapatInternalDetail}
              </div>
            ) : (
              <p className="text-gray-500 italic">Tidak ada detail</p>
            )}
          </div>
          
          <div className="p-4 rounded-md border border-gray-200 bg-white">
            <h4 className="font-medium text-lg mb-2">Persuratan Paraf Koordinasi</h4>
            {detailsData?.persuratanParafDetail ? (
              <div className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md border">
                {detailsData.persuratanParafDetail}
              </div>
            ) : (
              <p className="text-gray-500 italic">Tidak ada detail</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptItemDetails;
