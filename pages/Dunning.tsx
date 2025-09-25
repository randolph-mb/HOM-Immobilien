import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { dunningCases } from '../mock/data';
import { DunningCase, DunningStage, OutletContextType } from '../types';
import DetailDrawer from '../components/ui/DetailDrawer';
import EmptyState from '../components/ui/EmptyState';
import CopyToClipboardButton from '../components/ui/CopyToClipboardButton';

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

const Dunning: React.FC = () => {
    const [activeStage, setActiveStage] = useState<DunningStage | 'Alle'>('Alle');
    const [selectedCase, setSelectedCase] = useState<DunningCase | null>(null);
    const { searchTerm, filters } = useOutletContext<OutletContextType>();

    const filteredCases = dunningCases.filter(c => {
        const stageMatch = activeStage === 'Alle' || c.stage === activeStage;
        
        const searchMatch = 
            c.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.unit.toLowerCase().includes(searchTerm.toLowerCase());

        // Note: Object filter is not applicable here as DunningCase has no objectCode
        const dateMatch = dateMatchesFilter(c.dueDateISO, filters.zeitraum);

        return stageMatch && searchMatch && dateMatch;
    });

    const stages: (DunningStage | 'Alle')[] = ['Alle', DunningStage.Reminder, DunningStage.FirstDunning, DunningStage.SecondDunning];

    return (
        <div>
            <div className="sm:flex sm:items-baseline sm:justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Dunning (Mahnwesen)</h1>
                <div className="mt-4 sm:mt-0 sm:ml-10">
                    <nav className="-mb-px flex space-x-8">
                        {stages.map(stage => (
                            <button
                                key={stage}
                                onClick={() => setActiveStage(stage)}
                                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                                    activeStage === stage
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {stage}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="mt-8">
                {filteredCases.length > 0 ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {filteredCases.map((caseItem) => (
                                <li key={caseItem.id}>
                                    <div onClick={() => setSelectedCase(caseItem)} className="block hover:bg-gray-50 cursor-pointer px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-primary-600 truncate">{caseItem.tenantName} - {caseItem.unit}</p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                                    {caseItem.stage}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    Offener Betrag: {caseItem.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                Fällig seit: {new Date(caseItem.dueDateISO).toLocaleDateString('de-DE')}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <EmptyState message={`Keine Fälle in der Stufe "${activeStage}" gefunden, die den Kriterien entsprechen.`} />
                )}
            </div>

            <DetailDrawer isOpen={!!selectedCase} onClose={() => setSelectedCase(null)} title={`Mahnfall: ${selectedCase?.tenantName || ''}`}>
                {selectedCase && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium text-gray-900">Timeline</h3>
                            <ul className="mt-2 space-y-2">
                                {selectedCase.history.map((entry, idx) => (
                                    <li key={idx} className="text-sm text-gray-600">
                                        <span className="font-semibold">{new Date(entry.dateISO).toLocaleDateString('de-DE')}:</span> {entry.note}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Entwurf für aktuelle Stufe ({selectedCase.stage})</h3>
                             <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap">
                                {selectedCase.drafts[selectedCase.stage]}
                            </div>
                            <div className="mt-4">
                                <CopyToClipboardButton textToCopy={selectedCase.drafts[selectedCase.stage]} />
                            </div>
                        </div>
                    </div>
                )}
            </DetailDrawer>
        </div>
    );
};

export default Dunning;