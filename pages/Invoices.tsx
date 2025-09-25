import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { invoices } from '../mock/data';
import { Invoice, InvoiceStatus, OutletContextType } from '../types';
import DetailDrawer from '../components/ui/DetailDrawer';
import EmptyState from '../components/ui/EmptyState';
import PostfachLinkModal from '../components/ui/PostfachLinkModal';

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

const Invoices: React.FC = () => {
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { searchTerm, filters } = useOutletContext<OutletContextType>();

    const getStatusColor = (status: InvoiceStatus) => {
        switch (status) {
            case InvoiceStatus.Pending: return 'bg-yellow-100 text-yellow-800';
            case InvoiceStatus.Paid: return 'bg-green-100 text-green-800';
            case InvoiceStatus.Rejected: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const filteredInvoices = invoices.filter(invoice => {
        const searchMatch = 
            invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.objectCode.toLowerCase().includes(searchTerm.toLowerCase());

        const dateMatch = dateMatchesFilter(invoice.dueDateISO, filters.zeitraum);
        const objektMatch = filters.objekt === 'Alle Objekte' || invoice.objectCode === filters.objekt;
        const statusMatch = filters.status === 'Alle Status' ||
            (filters.status === 'In Prüfung' && invoice.status === InvoiceStatus.Pending) ||
            (filters.status === 'Neu' && invoice.status === InvoiceStatus.Pending) || // Assuming Neu is also Pending
            (filters.status === 'Erledigt' && invoice.status === InvoiceStatus.Paid);

        return searchMatch && dateMatch && objektMatch && statusMatch;
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Rechnungen</h1>

            <div className="mt-8 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {filteredInvoices.length > 0 ? (
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieferant</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Betrag</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fälligkeit</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zuordnung</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Details</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredInvoices.map((invoice) => (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.supplier}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(invoice.dueDateISO).toLocaleDateString('de-DE')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.objectCode}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => setSelectedInvoice(invoice)} className="text-primary-600 hover:text-primary-900">Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <EmptyState message="Keine Rechnungen gefunden, die den Kriterien entsprechen." />
                        )}
                    </div>
                </div>
            </div>

            <DetailDrawer isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title={`Rechnung: ${selectedInvoice?.invoiceNo || ''}`}>
                {selectedInvoice && (
                    <div className="space-y-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                            Nur Entwurf – keine Buchung/kein Versand
                        </span>
                        <div>
                            <h3 className="font-medium text-gray-900">Erkannte Felder</h3>
                            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">Betrag</dt>
                                    <dd className="text-gray-900">{selectedInvoice.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</dd>
                                </div>
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">IBAN</dt>
                                    <dd className="text-gray-900">{selectedInvoice.iban}</dd>
                                </div>
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">Rechnungs-Nr.</dt>
                                    <dd className="text-gray-900">{selectedInvoice.invoiceNo}</dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Plausibilitäts-Hinweis (KI)</h3>
                            <p className="mt-2 text-sm text-gray-700">{selectedInvoice.plausibility}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Zahlungsvorschlag (KI)</h3>
                            <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-800">
                                {selectedInvoice.paymentSuggestion}
                            </div>
                        </div>
                         <div className="border-t pt-4">
                             <button onClick={() => setIsModalOpen(true)} className="text-sm text-primary-600 hover:text-primary-800">
                                Im Postfach öffnen
                            </button>
                        </div>
                    </div>
                )}
            </DetailDrawer>
            
            {selectedInvoice && (
              <PostfachLinkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} messageId={selectedInvoice.messageId} />
            )}
        </div>
    );
};

export default Invoices;