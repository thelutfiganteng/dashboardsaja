
import { BudgetItem, ScheduleItem, ScriptItem } from "@/types";

// Storage keys
const BUDGET_KEY = 'dashboard_anggaran_data';
const SCHEDULE_KEY = 'dashboard_jadwal_data';
const SCRIPT_KEY = 'dashboard_laporan_data';

// Budget CRUD operations
export const getBudgetItems = (): BudgetItem[] => {
  try {
    const data = localStorage.getItem(BUDGET_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting budget items:', error);
    return [];
  }
};

export const saveBudgetItem = (item: BudgetItem): void => {
  try {
    const items = getBudgetItems();
    // Calculate sisa (remaining budget)
    item.sisa = item.pagu - item.realisasi;
    
    const existingItemIndex = items.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      items[existingItemIndex] = item;
    } else {
      items.push(item);
    }
    
    localStorage.setItem(BUDGET_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving budget item:', error);
  }
};

export const deleteBudgetItem = (id: string): void => {
  try {
    const items = getBudgetItems();
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem(BUDGET_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Error deleting budget item:', error);
  }
};

// Schedule CRUD operations
export const getScheduleItems = (): ScheduleItem[] => {
  try {
    const data = localStorage.getItem(SCHEDULE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting schedule items:', error);
    return [];
  }
};

export const saveScheduleItem = (item: ScheduleItem): void => {
  try {
    const items = getScheduleItems();
    const existingItemIndex = items.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      items[existingItemIndex] = item;
    } else {
      items.push(item);
    }
    
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving schedule item:', error);
  }
};

export const deleteScheduleItem = (id: string): void => {
  try {
    const items = getScheduleItems();
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Error deleting schedule item:', error);
  }
};

// Report CRUD operations
export const getScriptItems = (): ScriptItem[] => {
  try {
    const data = localStorage.getItem(SCRIPT_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting report items:', error);
    return [];
  }
};

export const saveScriptItem = (item: ScriptItem): void => {
  try {
    const items = getScriptItems();
    const existingItemIndex = items.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      items[existingItemIndex] = item;
    } else {
      items.push(item);
    }
    
    localStorage.setItem(SCRIPT_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving report item:', error);
  }
};

export const deleteScriptItem = (id: string): void => {
  try {
    const items = getScriptItems();
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem(SCRIPT_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Error deleting report item:', error);
  }
};

// Initialize with sample data if empty
export const initializeLocalStorage = (): void => {
  // Budget sample data
  if (!localStorage.getItem(BUDGET_KEY)) {
    const sampleBudgetData: BudgetItem[] = [
      { id: '1', pagu: 50000000, realisasi: 25000000, sisa: 25000000, tanggal: '2023-01-10' },
      { id: '2', pagu: 75000000, realisasi: 35000000, sisa: 40000000, tanggal: '2023-02-15' },
      { id: '3', pagu: 30000000, realisasi: 10000000, sisa: 20000000, tanggal: '2023-03-20' },
    ];
    localStorage.setItem(BUDGET_KEY, JSON.stringify(sampleBudgetData));
  }

  // Schedule sample data
  if (!localStorage.getItem(SCHEDULE_KEY)) {
    const sampleScheduleData: ScheduleItem[] = [
      { 
        id: '1', 
        tim: 'Tim A', 
        kegiatan: 'Audit Internal', 
        rencanaPelaksanaan: '2023-01-15', 
        realisasiMulai: '2023-01-17', 
        realisasiSelesai: '2023-01-30',
        status: 'selesai'
      },
      { 
        id: '2', 
        tim: 'Tim B', 
        kegiatan: 'Evaluasi Kinerja', 
        rencanaPelaksanaan: '2023-02-10', 
        realisasiMulai: '2023-02-12', 
        realisasiSelesai: '2023-02-25',
        status: 'selesai'
      },
      { 
        id: '3', 
        tim: 'Tim C', 
        kegiatan: 'Pemeriksaan Khusus', 
        rencanaPelaksanaan: '2023-03-15', 
        realisasiMulai: '', 
        realisasiSelesai: '',
        status: 'belum-mulai'
      },
    ];
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(sampleScheduleData));
  }

  // Report sample data
  if (!localStorage.getItem(SCRIPT_KEY)) {
    const sampleScriptData: ScriptItem[] = [
      { id: '1', minggu: '1', tanggal: '2023-01-07', penangananKasus: true, undanganEksternal: true, rapatInternal: false, persuratanParaf: false },
      { id: '2', minggu: '2', tanggal: '2023-01-14', penangananKasus: false, undanganEksternal: true, rapatInternal: true, persuratanParaf: true },
      { id: '3', minggu: '3', tanggal: '2023-01-21', penangananKasus: true, undanganEksternal: false, rapatInternal: true, persuratanParaf: false },
    ];
    localStorage.setItem(SCRIPT_KEY, JSON.stringify(sampleScriptData));
  }
};
