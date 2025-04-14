
import React from 'react';
import { Bell, Settings, Search, User } from 'lucide-react';
import { Input } from './ui/input';
import Logo from '../assets/logoitjen.png';
import Logo2 from '../assets/logokemendagri-removebg-preview.png';

const Header = () => {
  return (
    <header className="bg-dashboard-blue-dark text-white border-b border-gray-700 py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex-1 flex items-center gap-3">
        {/* Logo di samping kiri teks */}
        <img
          src={Logo}
          alt="Inspektorat IV Logo Left"
          className="h-12 w-12 object-contain"
        />
        <h1 className="text-2xl font-bold">Dashboard Inspektorat IV</h1>
      </div>
      {/* Logo di ujung kanan */}
      <div className="flex items-center">
        <img
          src={Logo2}
          alt="Inspektorat IV Logo Right"
          className="h-20 w-20 object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
