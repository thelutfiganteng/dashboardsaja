
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BudgetTable from '@/components/tables/BudgetTable';
import ScheduleTable from '@/components/tables/ScheduleTable';
import ScriptTable from '@/components/tables/ScriptTable';
import { BudgetItem, ScheduleItem, ScriptItem } from '@/types';
import { 
  getBudgetItems, 
  getScheduleItems, 
  getScriptItems, 
  initializeLocalStorage 
} from '@/utils/localStorage';
import { toast } from '@/hooks/use-toast';
import BudgetChart from '@/components/charts/BudgetChart';
import ScheduleChart from '@/components/charts/ScheduleChart';
import ScriptChart from '@/components/charts/ScriptChart';
import { Separator } from '@/components/ui/separator';
import LinksSection from '@/components/LinksSection';

const Index = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [scriptItems, setScriptItems] = useState<ScriptItem[]>([]);

  // Initialize local storage with sample data on first load
  useEffect(() => {
    initializeLocalStorage();
    loadAllData();
    
    // Show welcome toast
    toast({
      title: "Selamat datang di Dashboard",
      description: "Semua data disimpan secara lokal di browser anda."
    });
  }, []);

  const loadAllData = () => {
    setBudgetItems(getBudgetItems());
    setScheduleItems(getScheduleItems());
    setScriptItems(getScriptItems());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BudgetTable data={budgetItems} onDataChange={loadAllData} />
          <ScheduleTable data={scheduleItems} onDataChange={loadAllData} />
        </div>
        
        <div className="my-6">
          <LinksSection />
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <ScriptTable data={scriptItems} onDataChange={loadAllData} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Grafik Anggaran</h3>
            <div className="h-[300px]">
              <BudgetChart data={budgetItems} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Grafik Jadwal</h3>
            <div className="h-[300px]">
              <ScheduleChart data={scheduleItems} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Grafik Laporan Kegiatan</h3>
            <div className="h-[300px]">
              <ScriptChart data={scriptItems} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
