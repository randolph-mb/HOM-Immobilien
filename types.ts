export enum EmailCategory {
  Beschwerden = 'Beschwerden',
  Rechnungen = 'Rechnungen',
  Termine = 'Termine',
  Vertraege = 'Verträge',
  Sonstiges = 'Sonstiges',
  Bank = 'Bank',
  Mahnwesen = 'Mahnwesen',
}

export enum InvoiceStatus {
    Pending = 'In Prüfung',
    Approved = 'Freigegeben',
    Paid = 'Bezahlt',
    Rejected = 'Abgelehnt',
}

export enum DunningStage {
    Reminder = 'Erinnerung',
    FirstDunning = '1. Mahnung',
    SecondDunning = '2. Mahnung',
}

export interface Email {
  id: string;
  category: EmailCategory;
  senderName: string;
  senderEmail: string;
  subject: string;
  objectCode: string;
  tenantName: string;
  dateISO: string;
  confidence: number;
  summary: string;
  messageId: string;
}

export interface Complaint {
  id: string;
  tenantName: string;
  senderEmail: string;
  objectCode: string;
  unit: string;
  issue: string;
  severity: 'Niedrig' | 'Mittel' | 'Hoch';
  receivedAtISO: string;
  summary: string[];
  draft: string;
  messageId: string;
  confidence: number;
}

export interface Invoice {
  id: string;
  supplier: string;
  amount: number;
  dueDateISO: string;
  status: InvoiceStatus;
  iban: string;
  invoiceNo: string;
  objectCode: string;
  tenantName: string;
  summary: string;
  plausibility: string;
  paymentSuggestion: string;
  messageId: string;
}

export interface RentStatus {
  id: string;
  tenantName: string;
  unit: string;
  month: string;
  dueAmount: number;
  paidAmount: number;
  lastPaymentISO: string;
  note: string;
  reminderDraft: string;
}

export interface DunningCase {
  id: string;
  tenantName: string;
  unit: string;
  stage: DunningStage;
  amount: number;
  dueDateISO: string;
  history: { dateISO: string; note: string }[];
  drafts: { [key in DunningStage]: string };
}

export interface OutletContextType {
    searchTerm: string;
    filters: { [key: string]: string };
}