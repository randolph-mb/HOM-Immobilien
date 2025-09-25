import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { complaints } from '../mock/data';
import { Complaint, OutletContextType } from '../types';
import DetailDrawer from '../components/ui/DetailDrawer';
import EmptyState from '../components/ui/EmptyState';
import CopyToClipboardButton from '../components/ui/CopyToClipboardButton';
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

const ComplaintCard: React.FC<{ complaint: Complaint; onSelect: (c: Complaint) => void; }> = ({ complaint, onSelect }) => (
    <div onClick={() => onSelect(complaint)} className="bg-white shadow overflow-hidden rounded-lg cursor-pointer hover:bg-gray-50">
        <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-md font-semibold text-gray-900 truncate">{complaint.issue}</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${complaint.severity === 'Hoch' ? 'bg-red-100 text-red-800' : complaint.severity === 'Mittel' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {complaint.severity}
                </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{complaint.objectCode} - {complaint.unit}</p>
            <p className="mt-1 text-sm text-gray-600">{complaint.tenantName}</p>
            <p className="mt-3 text-xs text-gray-400">{new Date(complaint.receivedAtISO).toLocaleString('de-DE')}</p>
        </div>
    </div>
);

const Complaints: React.FC = () => {
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { searchTerm, filters } = useOutletContext<OutletContextType>();

    const handleCloseDrawer = () => setSelectedComplaint(null);
    const handleSelectComplaint = (c: Complaint) => setSelectedComplaint(c);

    const filteredComplaints = complaints.filter(c => {
        const searchMatch = 
            c.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.objectCode.toLowerCase().includes(searchTerm.toLowerCase());
        
        const dateMatch = dateMatchesFilter(c.receivedAtISO, filters.zeitraum);
        const objektMatch = filters.objekt === 'Alle Objekte' || c.objectCode === filters.objekt;

        return searchMatch && dateMatch && objektMatch;
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Beschwerden</h1>

            <div className="mt-8">
                {filteredComplaints.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredComplaints.map(c => <ComplaintCard key={c.id} complaint={c} onSelect={handleSelectComplaint} />)}
                    </div>
                ) : (
                    <EmptyState message="Aktuell gibt es keine offenen Beschwerden, die den Kriterien entsprechen." />
                )}
            </div>

            <DetailDrawer isOpen={!!selectedComplaint} onClose={handleCloseDrawer} title={`Beschwerde: ${selectedComplaint?.issue || ''}`}>
                {selectedComplaint && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium text-gray-900">Metadaten</h3>
                            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">Absender</dt>
                                    <dd className="text-gray-900">{selectedComplaint.tenantName} ({selectedComplaint.senderEmail})</dd>
                                </div>
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">Objekt/Mieter</dt>
                                    <dd className="text-gray-900">{selectedComplaint.objectCode} / {selectedComplaint.unit}</dd>
                                </div>
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">Confidence</dt>
                                    <dd className="text-gray-900">{selectedComplaint.confidence}%</dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Zusammenfassung (KI)</h3>
                            <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                                {selectedComplaint.summary.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Antwort-Entwurf (KI)</h3>
                            <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap">
                                {selectedComplaint.draft}
                            </div>
                            <div className="mt-4">
                                <CopyToClipboardButton textToCopy={selectedComplaint.draft} />
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
            
            {selectedComplaint && (
              <PostfachLinkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} messageId={selectedComplaint.messageId} />
            )}
        </div>
    );
};

export default Complaints;