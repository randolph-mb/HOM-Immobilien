
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Complaints from './pages/Complaints';
import Invoices from './pages/Invoices';
import Bank from './pages/Bank';
import Dunning from './pages/Dunning';
import Appointments from './pages/Appointments';
import Contracts from './pages/Contracts';
import Other from './pages/Other';
import Settings from './pages/Settings';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="beschwerden" element={<Complaints />} />
          <Route path="rechnungen" element={<Invoices />} />
          <Route path="termine" element={<Appointments />} />
          <Route path="vertraege" element={<Contracts />} />
          <Route path="sonstiges" element={<Other />} />
          <Route path="bank" element={<Bank />} />
          <Route path="dunning" element={<Dunning />} />
          <Route path="einstellungen" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
