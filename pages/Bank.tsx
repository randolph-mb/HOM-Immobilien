import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { rentStatus } from '../mock/data';
import { RentStatus, OutletContextType } from '../types';
import CopyToClipboardButton from '../components/ui/CopyToClipboardButton';
import EmptyState from '../components/ui/EmptyState';

const dateMatchesFilter = (isoDate: string, zeitraum: string): boolean => {
    if (!isoDate) return false; // Don't match items with no date if a filter is active
    const now = new Date('2023-10-27T23:59:59Z'); // Mock "today" to match data
    const itemDate = new Date(isoDate);

    switch (zeitraum) {
        case 'Heute':
            return itemDate.toDateString() === now.toDateString();
        case '7 Tage': {
            const sevenDaysAgo = new Date(now);
            sevenDaysAgo.setDate(now.getDate() - 7);
            return itemDate >= sevenDaysAgo && itemDate <= now;
        }
        case '30 Tage': {
            const thirtyDaysAgo = new Date(now);
            thirtyDaysAgo.setDate(now.getDate() - 30);
            return itemDate >= thirtyDaysAgo && itemDate <= now;
        }
        default:
            return true;
    }
};

const Bank: React.FC = () => {
    const [selectedDraft, setSelectedDraft] = useState<string | null>(null);
    const { searchTerm, filters } = useOutletContext<OutletContextType>();

    const paidCount = rentStatus.filter(r => r.paidAmount >= r.dueAmount).length;
    const totalCount = rentStatus.length;
    const progress = totalCount > 0 ? (paidCount / totalCount) * 100 : 0;

    const filteredRentStatus = rentStatus.filter(rent => {
        const searchMatch = 
            rent.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rent.unit.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Note: Object filter is not applicable here as RentStatus has no objectCode
        const dateMatch = dateMatchesFilter(rent.lastPaymentISO, filters.zeitraum);

        return searchMatch && dateMatch;
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Bank (Miete)</h1>

            <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium">Eingänge {rentStatus[0]?.month || ''}</h3>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-3xl font-bold text-primary-700">{paidCount} / {totalCount}</p>
                    <p className="text-sm text-gray-500">Mieten verbucht</p>
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="mt-8 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        { filteredRentStatus.length > 0 ? (
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mieter</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wohnung</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soll</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ist</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Differenz</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letzte Zahlung</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hinweis</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Aktion</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRentStatus.map((rent) => {
                                        const difference = rent.paidAmount - rent.dueAmount;
                                        return (
                                            <tr key={rent.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rent.tenantName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.unit}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.dueAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.paidAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${difference < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                    {difference.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.lastPaymentISO ? new Date(rent.lastPaymentISO).toLocaleDateString('de-DE') : '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.note}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {difference < 0 && (
                                                        <button onClick={() => setSelectedDraft(rent.reminderDraft)} className="text-primary-600 hover:text-primary-900">
                                                            Erinnerung anzeigen
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        ) : (
                            <EmptyState message="Keine Mieteingänge gefunden, die den Kriterien entsprechen." />
                        )}
                    </div>
                </div>
            </div>
            
            {/* Draft Modal */}
            {selectedDraft && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setSelectedDraft(null)}></div>
                        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-20">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Erinnerungs-Entwurf</h3>
                                <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap">
                                    {selectedDraft}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <CopyToClipboardButton textToCopy={selectedDraft} />
                                <button type="button" onClick={() => setSelectedDraft(null)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Schließen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Bank;