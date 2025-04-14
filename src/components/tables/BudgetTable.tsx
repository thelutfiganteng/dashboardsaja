import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { BudgetItem, BudgetItemWithoutId } from '@/types';
import { saveBudgetItem, deleteBudgetItem } from '@/utils/localStorage';

interface BudgetTableProps {
  data: BudgetItem[];
  onDataChange: () => void;
}

const BudgetTable: React.FC<BudgetTableProps> = ({ data, onDataChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<BudgetItem | null>(null);
  const [formData, setFormData] = useState<BudgetItemWithoutId>({
    pagu: 0,
    realisasi: 0,
    tanggal: new Date().toISOString().split('T')[0]
  });

  const openDialog = (item?: BudgetItem) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        pagu: item.pagu,
        realisasi: item.realisasi,
        tanggal: item.tanggal
      });
    } else {
      setCurrentItem(null);
      setFormData({
        pagu: 0,
        realisasi: 0,
        tanggal: new Date().toISOString().split('T')[0]
      });
    }
    setIsOpen(true);
  };

  const openDeleteDialog = (item: BudgetItem) => {
    setCurrentItem(item);
    setIsDeleteOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pagu' || name === 'realisasi' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = () => {
    if (formData.pagu < 0 || formData.realisasi < 0) return;

    const itemToSave: BudgetItem = {
      id: currentItem?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
      sisa: formData.pagu - formData.realisasi
    };

    saveBudgetItem(itemToSave);
    onDataChange();
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (currentItem) {
      deleteBudgetItem(currentItem.id);
      onDataChange();
      setIsDeleteOpen(false);
    }
  };

  // Format number to IDR
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="shadow-sm h-full border-t-4 border-t-dashboard-blue-dark">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Anggaran Pengawasan Inspektorat IV</CardTitle>
            <CardDescription>Manajemen pagu dan realisasi anggaran</CardDescription>
          </div>
          <Button onClick={() => openDialog()} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Tambah
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-auto max-h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-dashboard-blue-dark text-white">Tanggal</TableHead>
                <TableHead className="bg-dashboard-blue-dark text-white">Pagu</TableHead>
                <TableHead className="bg-dashboard-blue-dark text-white">Realisasi</TableHead>
                <TableHead className="bg-dashboard-blue-dark text-white">Sisa</TableHead>
                <TableHead className="w-[100px] bg-dashboard-blue-dark text-white">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Tidak ada data anggaran
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{new Date(item.tanggal).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>{formatCurrency(item.pagu)}</TableCell>
                    <TableCell>{formatCurrency(item.realisasi)}</TableCell>
                    <TableCell>{formatCurrency(item.sisa || item.pagu - item.realisasi)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="icon" variant="ghost" onClick={() => openDialog(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => openDeleteDialog(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentItem ? 'Edit Data Anggaran' : 'Tambah Data Anggaran'}</DialogTitle>
            <DialogDescription>
              {currentItem ? 'Perbarui data anggaran di bawah ini.' : 'Tambahkan data anggaran baru dengan formulir di bawah ini.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tanggal" className="text-right">Tanggal</label>
              <Input
                id="tanggal"
                name="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="pagu" className="text-right">Pagu</label>
              <Input 
                id="pagu"
                name="pagu"
                type="number"
                value={formData.pagu}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="realisasi" className="text-right">Realisasi</label>
              <Input
                id="realisasi"
                name="realisasi"
                type="number"
                value={formData.realisasi}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Sisa</label>
              <div className="col-span-3 px-3 py-2 border rounded-md bg-gray-50">
                {formatCurrency(formData.pagu - formData.realisasi)}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
            <Button onClick={handleSubmit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus item anggaran ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BudgetTable;
