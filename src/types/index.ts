
// Schedule Types (Jadwal)
export interface ScheduleItem {
  id: string;
  tim: string;                // Team
  kegiatan: string;           // Activity
  rencanaPelaksanaan: string; // Planned Execution Date (now date-only format)
  realisasiMulai: string;     // Actual Start Date (now date-only format)
  realisasiSelesai: string;   // Actual End Date (now date-only format)
  status: 'belum-mulai' | 'sedang-berjalan' | 'selesai' | 'dibatalkan' | 'lainnya'; // Execution Status
  customStatus?: string;      // Custom status text when status is 'lainnya'
}

export type ScheduleItemWithoutId = Omit<ScheduleItem, 'id'>;

// Budget Types (Anggaran)
export interface BudgetItem {
  id: string;
  pagu: number;       // Budget allocation
  realisasi: number;  // Actual spending
  sisa: number;       // Remaining budget
  tanggal: string;    // Date of budget entry
}

export type BudgetItemWithoutId = Omit<BudgetItem, 'id' | 'sisa'>;

// Script/Report Types (Laporan Kegiatan)
export interface ScriptItem {
  id: string;
  minggu: string;            // Week number
  tanggal: string;           // Date of activity
  penangananKasus: boolean;  // Case handling
  undanganEksternal: boolean; // External invitations
  rapatInternal: boolean;    // Internal meetings
  persuratanParaf: boolean;  // Document coordination
}

export type ScriptItemWithoutId = Omit<ScriptItem, 'id'>;
