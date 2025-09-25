import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // FIX: Explicitly type the filters state with a string index signature
  // to match the prop type expected by the Topbar component. This resolves
  // the error about missing properties.
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    zeitraum: '30 Tage',
    objekt: 'Alle',
    status: 'Alle',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* FIX: Wrap setFilters in a lambda. This resolves the type incompatibility between
            React's state setter (which can accept a value or a function) and Topbar's
            more restrictive prop type, which only accepts a value. */}
        <Topbar setSidebarOpen={setSidebarOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filters={filters} setFilters={(f) => setFilters(f)}/>
        <main className="flex-1 pb-8">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet context={{ searchTerm, filters }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
