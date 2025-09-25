
import React from 'react';

interface TopbarProps {
  setSidebarOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: { [key: string]: string };
  setFilters: (filters: { [key: string]: string }) => void;
}

const FilterChip: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm font-medium rounded-full ${
      active ? 'bg-primary-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);


const Topbar: React.FC<TopbarProps> = ({ setSidebarOpen, searchTerm, setSearchTerm, filters, setFilters }) => {

  const handleFilterChange = (key: string, value: string) => {
      setFilters({ ...filters, [key]: value });
  };
    
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Suche
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search-field"
                name="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Suche nach Betreff, Absender, Objekt..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
            <div className="flex items-center space-x-2">
                <FilterChip label="Heute" active={filters.zeitraum === 'Heute'} onClick={() => handleFilterChange('zeitraum', 'Heute')} />
                <FilterChip label="7 Tage" active={filters.zeitraum === '7 Tage'} onClick={() => handleFilterChange('zeitraum', '7 Tage')} />
                <FilterChip label="30 Tage" active={filters.zeitraum === '30 Tage'} onClick={() => handleFilterChange('zeitraum', '30 Tage')} />
            </div>
            <div className="ml-4">
                 <select 
                    id="objekt-filter" 
                    className="rounded-full border-gray-300 text-sm"
                    value={filters.objekt}
                    onChange={(e) => handleFilterChange('objekt', e.target.value)}
                 >
                    <option>Alle Objekte</option>
                    <option>OBJ-001</option>
                    <option>OBJ-002</option>
                    <option>OBJ-003</option>
                </select>
            </div>
            <div className="ml-4">
                 <select 
                    id="status-filter" 
                    className="rounded-full border-gray-300 text-sm"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                 >
                    <option>Alle Status</option>
                    <option>Neu</option>
                    <option>In Prüfung</option>
                    <option>Erledigt</option>
                </select>
            </div>
            <div className="ml-4">
                <img className="h-8 w-8 rounded-full" src="https://picsum.photos/32/32" alt="User Avatar" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
