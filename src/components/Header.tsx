import React from 'react';
import { School, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <School className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">MKU Hostels</h1>
              <p className="text-sm text-blue-200">Mount Kenya University</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <User className="h-5 w-5" />
              <span>Student Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}