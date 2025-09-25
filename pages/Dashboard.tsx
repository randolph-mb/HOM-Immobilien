
import React from 'react';
import StatCard from '../components/ui/StatCard';
import EmailVolumeChart from '../components/charts/EmailVolumeChart';
import { complaints, invoices, rentStatus, emails } from '../mock/data';
import { InvoiceStatus } from '../types';

const DocumentChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
const ExclamationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);
const CurrencyEuroIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536A9.004 9.004 0 0112 15c-2.435 0-4.665.956-6.364 2.536m12.728-2.536A9 9 0 103.636 6.364m12.728 9.172L15 14.5m-3 3l-1.5-1.5" />
    </svg>
);
const InboxInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 001.414 0l2.414-2.414a1 1 0 01.707-.293H19" />
    </svg>
);

const kpiData = {
    emailsToday: emails.filter(e => new Date(e.dateISO).toDateString() === new Date().toDateString()).length,
    openComplaints: complaints.length,
    invoicesPending: invoices.filter(i => i.status === InvoiceStatus.Pending).length,
    rentReceivedCount: rentStatus.filter(r => r.paidAmount >= r.dueAmount).length,
    rentTotalCount: rentStatus.length
}

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="E-Mails heute" value={kpiData.emailsToday.toString()} icon={<div className="p-3 rounded-md bg-primary-500"><InboxInIcon /></div>} />
                <StatCard title="Beschwerden offen" value={kpiData.openComplaints.toString()} icon={<div className="p-3 rounded-md bg-red-500"><ExclamationIcon/></div>} />
                <StatCard title="Rechnungen zur Prüfung" value={kpiData.invoicesPending.toString()} icon={<div className="p-3 rounded-md bg-yellow-500"><DocumentChartBarIcon/></div>} />
                <StatCard title="Miete eingegangen" value={`${kpiData.rentReceivedCount}/${kpiData.rentTotalCount}`} icon={<div className="p-3 rounded-md bg-green-500"><CurrencyEuroIcon/></div>} />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-medium text-gray-900">Aktuelle Beschwerden</h2>
                    <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {complaints.slice(0, 3).map((complaint) => (
                                <li key={complaint.id}>
                                    <a href="#" className="block hover:bg-gray-50">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-primary-600 truncate">{complaint.issue}</p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        {complaint.severity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        {complaint.tenantName} ({complaint.objectCode})
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                    <p>{new Date(complaint.receivedAtISO).toLocaleString('de-DE')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <EmailVolumeChart />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Fällige Rechnungen</h2>
                <div className="mt-4 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieferant</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Betrag</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fälligkeit</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoices.filter(i => i.status === InvoiceStatus.Pending).map((invoice) => (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.supplier}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(invoice.dueDateISO).toLocaleDateString('de-DE')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
