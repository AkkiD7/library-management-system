import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, BookOpen, Shield, User as UserIcon } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center text-blue-600 gap-2">
              <BookOpen className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight text-slate-900">Suntel<span className="text-blue-600">Lib</span></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="hidden md:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium text-slate-700">{user.username}</span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    {user.role === 'admin' ? <Shield className="h-3 w-3 text-blue-500" /> : <UserIcon className="h-3 w-3" />}
                    <span className="capitalize">{user.role}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-slate-500 hover:text-red-600">
                  <LogOut className="h-5 w-5 mr-2 md:mr-0" />
                  <span className="md:hidden">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};