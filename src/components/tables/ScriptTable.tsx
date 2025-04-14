
import React, { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { ScriptItem, ScriptItemWithoutId } from '@/types';
import { saveScriptItem, deleteScriptItem } from '@/utils/localStorage';
import ViewDetailsDialog from '../ui/ViewDetailsDialog';
import ScriptItemDetails from '../details/ScriptItemDetails';

interface ScriptTableProps {
  data: ScriptItem[];
  onDataChange: () => void;
}

// Create a type for the detailed information
interface ScriptItemDetails {
  [key: string]: {
    penangananKasusDetail: string;
    undanganEksternalDetail: string;
    rapatInternalDetail: string;
    persuratanParafDetail: string;
  };
}

const ScriptTable: React.FC<ScriptTableProps> = ({ data, onDataChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ScriptItem | null>(null);
  
  // Store the detailed information
  const [detailsData, setDetailsData] = useState<ScriptItemDetails>({});
  
  // Load details data from localStorage
  useEffect(() => {
    const storedDetails = localStorage.getItem('scriptItemDetails');
    if (storedDetails) {
      try {
        setDetailsData(JSON.parse(storedDetails));
      } catch (e) {
        console.error('Failed to parse scriptItemDetails from localStorage', e);
      }
    }
  }, []);

  // Save details data to localStorage
  const saveDetailsData = (newDetailsData: ScriptItemDetails) => {
    localStorage.setItem('scriptItemDetails', JSON.stringify(newDetailsData));
    setDetailsData(newDetailsData);
  };
  
  const [formData, setFormData] = useState<ScriptItemWithoutId & { 
    penangananKasusDetail: string;
    undanganEksternalDetail: string;
    rapatInternalDetail: string;
    persuratanParafDetail: string;
  }>({
    minggu: '',
    tanggal: new Date().toISOString().split('T')[0],
    penangananKasus: false,
    undanganEksternal: false,
    rapatInternal: false,
    persuratanParaf: false,
    penangananKasusDetail: '',
    undanganEksternalDetail: '',
    rapatInternalDetail: '',
    persuratanParafDetail: ''
  });

  const openDialog = (item?: ScriptItem) => {
    if (item) {
      setCurrentItem(item);
      // Retrieve existing details for this item if available
      const existingDetails = detailsData[item.id] || {
        penangananKasusDetail: '',
        undanganEksternalDetail: '',
        rapatInternalDetail: '',
        persuratanParafDetail: ''
      };
      
      setFormData({
        minggu: item.minggu,
        tanggal: item.tanggal,
        penangananKasus: item.penangananKasus || false,
        undanganEksternal: item.undanganEksternal || false,
        rapatInternal: item.rapatInternal || false,
        persuratanParaf: item.persuratanParaf || false,
        ...existingDetails
      });
    } else {
      setCurrentItem(null);
      setFormData({
        minggu: '',
        tanggal: new Date().toISOString().split('T')[0],
        penangananKasus: false,
        undanganEksternal: false,
        rapatInternal: false,
        persuratanParaf: false,
        penangananKasusDetail: '',
        undanganEksternalDetail: '',
        rapatInternalDetail: '',
        persuratanParafDetail: ''
      });
    }
    setIsOpen(true);
  };

  const openViewDialog = (item: ScriptItem) => {
    setCurrentItem(item);
    setIsViewOpen(true);
  };

  const openDeleteDialog = (item: ScriptItem) => {
    setCurrentItem(item);
    setIsDeleteOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.minggu || !formData.tanggal) return;

    // Set boolean flags based on whether text details are provided
    const penangananKasus = !!formData.penangananKasusDetail.trim();
    const undanganEksternal = !!formData.undanganEksternalDetail.trim();
    const rapatInternal = !!formData.rapatInternalDetail.trim();
    const persuratanParaf = !!formData.persuratanParafDetail.trim();

    const itemToSave: ScriptItem = {
      id: currentItem?.id || Math.random().toString(36).substr(2, 9),
      minggu: formData.minggu,
      tanggal: formData.tanggal,
      penangananKasus,
      undanganEksternal,
      rapatInternal,
      persuratanParaf
    };

    // Save the item 
    saveScriptItem(itemToSave);
    
    // Save the detailed information
    const newDetailsData = {
      ...detailsData,
      [itemToSave.id]: {
        penangananKasusDetail: formData.penangananKasusDetail || '',
        undanganEksternalDetail: formData.undanganEksternalDetail || '',
        rapatInternalDetail: formData.rapatInternalDetail || '',
        persuratanParafDetail: formData.persuratanParafDetail || ''
      }
    };
    saveDetailsData(newDetailsData);
    
    // Refresh data
    onDataChange();
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (currentItem) {
      deleteScriptItem(currentItem.id);
      
      // Also remove the details for this item
      const newDetailsData = { ...detailsData };
      delete newDetailsData[currentItem.id];
      saveDetailsData(newDetailsData);
      
      onDataChange();
      setIsDeleteOpen(false);
    }
  };

  // Get current item details
  const getCurrentItemDetails = () => {
    if (!currentItem) return null;
    return detailsData[currentItem.id] || null;
  };

  // Helper function for truncating text
  const truncateText = (text: string, maxLength: number = 30) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  // Render text cell with tooltip for long content
  const renderTextCell = (text: string | undefined) => {
    if (!text) return <span className="text-gray-400 italic">Tidak ada</span>;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help text-left">
              {truncateText(text)}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="whitespace-pre-wrap text-sm">{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card className="shadow-sm h-full border-t-4 border-t-dashboard-blue-dark">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Laporan Kegiatan</CardTitle>
            <CardDescription>Manajemen Kegiatan Inspektorat IV</CardDescription>
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
                <TableHead>Minggu ke-</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead colSpan={4} className="text-center border-l bg-dashboard-blue-dark text-white">
                  Kegiatan Inspektorat IV
                </TableHead>
                <TableHead className="w-[120px]">Aksi</TableHead>
              </TableRow>
              <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead className="text-center border-l">Penanganan Kasus</TableHead>
                <TableHead className="text-center">Undangan Eksternal / Arahan Pimpinan</TableHead>
                <TableHead className="text-center">Rapat Internal</TableHead>
                <TableHead className="text-center">Persuratan Paraf Koordinasi</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Tidak ada data laporan kegiatan
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.minggu}</TableCell>
                    <TableCell>{new Date(item.tanggal).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell className="max-w-[200px] border-l">
                      {renderTextCell(detailsData[item.id]?.penangananKasusDetail)}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {renderTextCell(detailsData[item.id]?.undanganEksternalDetail)}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {renderTextCell(detailsData[item.id]?.rapatInternalDetail)}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {renderTextCell(detailsData[item.id]?.persuratanParafDetail)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="icon" variant="ghost" onClick={() => openViewDialog(item)}>
                          <Eye className="h-4 w-4" />
                        </Button>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentItem ? 'Edit Laporan Kegiatan' : 'Tambah Laporan Kegiatan'}</DialogTitle>
            <DialogDescription>
              {currentItem ? 'Perbarui laporan kegiatan di bawah ini.' : 'Tambahkan laporan kegiatan baru dengan formulir di bawah ini.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="minggu" className="text-right md:col-span-1">Minggu ke-</label>
              <div className="md:col-span-3">
                <Input 
                  id="minggu"
                  name="minggu"
                  value={formData.minggu}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="tanggal" className="text-right md:col-span-1">Tanggal</label>
              <div className="md:col-span-3">
                <Input 
                  id="tanggal"
                  name="tanggal"
                  type="date"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <label className="font-semibold border-b pb-2">Kegiatan Inspektorat IV</label>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="border p-4 rounded-md">
                <label htmlFor="penangananKasusDetail" className="font-medium block mb-2">Penanganan Kasus</label>
                <Textarea 
                  name="penangananKasusDetail"
                  id="penangananKasusDetail"
                  placeholder="Detail kegiatan penanganan kasus"
                  className="h-20 w-full"
                  value={formData.penangananKasusDetail}
                  onChange={handleTextareaChange}
                />
              </div>
              
              <div className="border p-4 rounded-md">
                <label htmlFor="undanganEksternalDetail" className="font-medium block mb-2">Undangan Eksternal / Arahan Pimpinan</label>
                <Textarea 
                  name="undanganEksternalDetail"
                  id="undanganEksternalDetail"
                  placeholder="Detail kegiatan undangan eksternal"
                  className="h-20 w-full"
                  value={formData.undanganEksternalDetail}
                  onChange={handleTextareaChange}
                />
              </div>
              
              <div className="border p-4 rounded-md">
                <label htmlFor="rapatInternalDetail" className="font-medium block mb-2">Rapat Internal</label>
                <Textarea 
                  name="rapatInternalDetail"
                  id="rapatInternalDetail"
                  placeholder="Detail kegiatan rapat internal"
                  className="h-20 w-full"
                  value={formData.rapatInternalDetail}
                  onChange={handleTextareaChange}
                />
              </div>
              
              <div className="border p-4 rounded-md">
                <label htmlFor="persuratanParafDetail" className="font-medium block mb-2">Persuratan Paraf Koordinasi</label>
                <Textarea 
                  name="persuratanParafDetail"
                  id="persuratanParafDetail"
                  placeholder="Detail kegiatan persuratan paraf"
                  className="h-20 w-full"
                  value={formData.persuratanParafDetail}
                  onChange={handleTextareaChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
            <Button onClick={handleSubmit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog using reusable component */}
      <ViewDetailsDialog 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)}
        title="Detail Laporan Kegiatan"
        maxWidth="max-w-4xl"
      >
        {currentItem && (
          <ScriptItemDetails 
            item={currentItem} 
            detailsData={getCurrentItemDetails()} 
          />
        )}
      </ViewDetailsDialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus laporan kegiatan ini? Tindakan ini tidak dapat dibatalkan.
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

export default ScriptTable;
