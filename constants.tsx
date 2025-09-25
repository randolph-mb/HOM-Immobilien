
import React from 'react';
import { EmailCategory } from './types';

const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const InboxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.12-1.588H6.88a2.25 2.25 0 00-2.12 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
  </svg>
);

const ExclamationCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>
);

const DocumentTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const CalendarDaysIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
    </svg>
);

const BuildingLibraryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

const SpeakerWaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);

const Cog6ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.95.542.057 1.007.56 1.066 1.11.06.542-.236 1.13-.772 1.41l-.66.313a11.96 11.96 0 01-1.33 6.943l.66-.313c.535-.28.98-.868 1.065-1.41.057-.542.525-1.053 1.11-.95.542.057 1.007.56 1.066 1.11.06.542-.236 1.13-.772 1.41l-.66.313a11.96 11.96 0 01-1.33 6.943l.66-.313c.535-.28.98-.868 1.065-1.41.057-.542.525-1.053 1.11-.95.542.057 1.007.56 1.066 1.11.06.542-.236 1.13-.772 1.41l-.66.313a11.96 11.96 0 01-1.33 6.943l-.003.003-.002.002-.002.002-.001.001a1.5 1.5 0 01-2.24-1.33l.003-.004.002-.004.002-.003.001-.002a11.956 11.956 0 01-6.943-1.33l-.313.66c-.28.535-.868.98-1.41 1.065-.542.057-1.053-.236-1.11-1.065-.057-.542.236-1.13.772-1.41l.313-.66a11.96 11.96 0 01-6.943-1.33l-.313.66c-.28.535-.868.98-1.41 1.065-.542.057-1.053-.236-1.11-1.065-.057-.542.236-1.13.772-1.41l.313-.66a11.96 11.96 0 01-6.943-1.33l-.003-.001-.002-.002L3.94 9.594c-.542-.09-1.007-.56-1.066-1.11-.057-.542.236-1.13.772-1.41l.66-.313a11.96 11.96 0 011.33-6.943l-.66.313c-.535.28-.98.868-1.065 1.41-.057.542-.525 1.053-1.11.95C2.11 4.542 1.645 4.04 1.586 3.5c-.06-.542.236-1.13.772-1.41l.66-.313a11.96 11.96 0 011.33-6.943z" />
    </svg>
);
const EllipsisHorizontalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);


export const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: (props: any) => <ChartBarIcon {...props} /> },
  { name: 'Inbox (Alle)', href: '/inbox', icon: (props: any) => <InboxIcon {...props} /> },
  { name: EmailCategory.Beschwerden, href: '/beschwerden', icon: (props: any) => <ExclamationCircleIcon {...props} /> },
  { name: EmailCategory.Rechnungen, href: '/rechnungen', icon: (props: any) => <DocumentTextIcon {...props} /> },
  { name: EmailCategory.Termine, href: '/termine', icon: (props: any) => <CalendarDaysIcon {...props} /> },
  { name: EmailCategory.Vertraege, href: '/vertraege', icon: (props: any) => <DocumentTextIcon {...props} /> },
  { name: EmailCategory.Sonstiges, href: '/sonstiges', icon: (props: any) => <EllipsisHorizontalIcon {...props} /> },
  { isSeparator: true },
  { name: 'Bank (Miete)', href: '/bank', icon: (props: any) => <BuildingLibraryIcon {...props} /> },
  { name: 'Dunning (Mahnwesen)', href: '/dunning', icon: (props: any) => <SpeakerWaveIcon {...props} /> },
  { isSeparator: true },
  { name: 'Einstellungen', href: '/einstellungen', icon: (props: any) => <Cog6ToothIcon {...props} /> },
];

export const CATEGORY_COLORS: { [key in EmailCategory]: string } = {
  [EmailCategory.Beschwerden]: 'bg-red-100 text-red-800',
  [EmailCategory.Rechnungen]: 'bg-yellow-100 text-yellow-800',
  [EmailCategory.Termine]: 'bg-green-100 text-green-800',
  [EmailCategory.Vertraege]: 'bg-indigo-100 text-indigo-800',
  [EmailCategory.Sonstiges]: 'bg-gray-100 text-gray-800',
  [EmailCategory.Bank]: 'bg-blue-100 text-blue-800',
  [EmailCategory.Mahnwesen]: 'bg-orange-100 text-orange-800',
};
