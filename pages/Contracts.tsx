import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { emails } from '../mock/data';
import { EmailCategory, OutletContextType } from '../types';
import EmptyState from '../components/ui/EmptyState';

const dateMatchesFilter = (isoDate: string, zeitraum: string): boolean => {
    if (!isoDate) return true;
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

const Contracts: React.FC = () => {
    const { searchTerm, filters } = useOutletContext<OutletContextType>();
    
    const contractEmails = emails.filter(e => {
        if (e.category !== EmailCategory.Vertraege) return false;

        const searchMatch =
            e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.objectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.tenantName.toLowerCase().includes(searchTerm.toLowerCase());

        const dateMatch = dateMatchesFilter(e.dateISO, filters.zeitraum);
        const objektMatch = filters.objekt === 'Alle Objekte' || e.objectCode === filters.objekt;

        return searchMatch && dateMatch && objektMatch;
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Verträge</h1>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {contractEmails.length > 0 ? (
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Betreff</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absender</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objekt/Mieter</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {contractEmails.map((email) => (
                                            <tr key={email.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{email.subject}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email.senderName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email.objectCode} / {email.tenantName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(email.dateISO).toLocaleString('de-DE')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <EmptyState message="Keine E-Mails in der Kategorie Verträge gefunden, die den Kriterien entsprechen." />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contracts;