
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  
  const navigationContent = (
     <nav className="flex-1 space-y-1 px-2 pb-4">
      {NAV_ITEMS.map((item, index) =>
        item.isSeparator ? (
          <div key={`sep-${index}`} className="pt-4 pb-2">
            <hr className="border-t border-gray-200" />
          </div>
        ) : (
          <NavLink
            key={item.name}
            to={item.href || '#'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-primary-700 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {item.icon && item.icon({className: "mr-3 flex-shrink-0 h-6 w-6"})}
            {item.name}
          </NavLink>
        )
      )}
    </nav>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 text-primary-700 font-bold text-lg">
              HOM Immobilien – Cockpit
            </div>
            {navigationContent}
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-white">
        <div className="flex items-center flex-shrink-0 px-4 text-primary-700 font-bold text-lg">
          HOM Immobilien – Cockpit
        </div>
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
          {navigationContent}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
