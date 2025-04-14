
import React from 'react';
import { Link, FileText, ExternalLink, File, Folder } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const LinksSection = () => {
  return (
    <div className="bg-dashboard-blue-dark bg-opacity-90 rounded-lg p-4 shadow-sm text-white">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <Link className="h-5 w-5" />
          <h3 className="text-lg font-medium">Tautan Penting</h3>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-end gap-4">
          {/* <a href="#" className="flex items-center space-x-2 hover:text-dashboard-accent transition-colors">
            <FileText className="h-4 w-4" />
            <span>SOP Pengawasan</span>
          </a>
          
          <a href="#" className="flex items-center space-x-2 hover:text-dashboard-accent transition-colors">
            <File className="h-4 w-4" />
            <span>Template Laporan</span>
          </a>
          
          <a href="#" className="flex items-center space-x-2 hover:text-dashboard-accent transition-colors">
            <Folder className="h-4 w-4" />
            <span>Arsip Dokumen</span>
          </a> */}
          
          <a href="https://docs.google.com/spreadsheets/d/1sJUzB3XmJ_O58i42TbeA8p95bTAgRJ5TfD8XXu7DGEg/edit?usp=sharing" className="flex items-center space-x-2 hover:text-dashboard-accent transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>Template Naskah</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinksSection;
