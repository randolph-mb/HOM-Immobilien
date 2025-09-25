
import { Email, Complaint, Invoice, RentStatus, DunningCase, EmailCategory, InvoiceStatus, DunningStage } from '../types';

export const emails: Email[] = [
  { id: 'e1', category: EmailCategory.Beschwerden, senderName: 'Max Mustermann', senderEmail: 'max.mustermann@email.de', subject: 'Heizung ausgefallen in Whg 12', objectCode: 'OBJ-001', tenantName: 'Max Mustermann', dateISO: '2023-10-27T10:00:00Z', confidence: 98, summary: 'Mieter meldet kompletten Heizungsausfall in seiner Wohnung.', messageId: '<msg-1@email.com>' },
  { id: 'e2', category: EmailCategory.Rechnungen, senderName: 'Handwerker Schmidt', senderEmail: 'rechnung@schmidt-hls.de', subject: 'Rechnung 2023-456 für Reparatur OBJ-002', objectCode: 'OBJ-002', tenantName: 'N/A', dateISO: '2023-10-27T09:30:00Z', confidence: 99, summary: 'Eingang der Rechnung von Handwerker Schmidt über 450,00 €.', messageId: '<msg-2@email.com>' },
  { id: 'e3', category: EmailCategory.Termine, senderName: 'Schornsteinfeger Meier', senderEmail: 'info@meier-kehr.de', subject: 'Termin für die jährliche Abgaswegeüberprüfung', objectCode: 'OBJ-001', tenantName: 'Alle', dateISO: '2023-10-26T15:12:00Z', confidence: 95, summary: 'Ankündigung des Schornsteinfegers für den 15.11.2023.', messageId: '<msg-3@email.com>' },
  { id: 'e4', category: EmailCategory.Vertraege, senderName: 'Anwaltskanzlei Legal', senderEmail: 'kontakt@legal.de', subject: 'Entwurf des neuen Mietvertrags - Whg 5', objectCode: 'OBJ-003', tenantName: 'Interessent Bauer', dateISO: '2023-10-26T11:05:00Z', confidence: 97, summary: 'Zusendung des Mietvertragsentwurfs für die Neuvermietung.', messageId: '<msg-4@email.com>' },
  { id: 'e5', category: EmailCategory.Sonstiges, senderName: 'Sabine Schulze', senderEmail: 's.schulze@email.de', subject: 'Frage zur Hausordnung', objectCode: 'OBJ-002', tenantName: 'Sabine Schulze', dateISO: '2023-10-25T14:00:00Z', confidence: 88, summary: 'Mieterin hat eine Frage bezüglich der Ruhezeiten.', messageId: '<msg-5@email.com>' },
  { id: 'e6', category: EmailCategory.Bank, senderName: 'Kreissparkasse', senderEmail: 'noreply@kspk.de', subject: 'Geldeingang Miete P. Pan', objectCode: 'OBJ-001', tenantName: 'Peter Pan', dateISO: '2023-10-27T08:00:00Z', confidence: 99, summary: 'Mietzahlung für Peter Pan verbucht.', messageId: '<msg-6@email.com>' },
];

export const complaints: Complaint[] = [
  { id: 'c1', tenantName: 'Max Mustermann', senderEmail: 'max.mustermann@email.de', objectCode: 'OBJ-001', unit: 'Whg 12', issue: 'Heizung ausgefallen', severity: 'Hoch', receivedAtISO: '2023-10-27T10:00:00Z', summary: ['Heizkörper in allen Räumen kalt', 'Außentemperatur unter 10 Grad', 'Bitte um dringende Reparatur'], draft: 'Sehr geehrter Herr Mustermann,\n\nvielen Dank für Ihre Nachricht. Wir haben Ihre Meldung zum Heizungsausfall erhalten und umgehend einen Techniker beauftragt. Dieser wird sich zwecks Terminvereinbarung mit Ihnen in Verbindung setzen.\n\nMit freundlichen Grüßen,\nIhre Hausverwaltung', messageId: '<msg-1@email.com>', confidence: 98 },
  { id: 'c2', tenantName: 'Erika Schmidt', senderEmail: 'erika.s@email.de', objectCode: 'OBJ-003', unit: 'Whg 04', issue: 'Wasserhahn tropft', severity: 'Niedrig', receivedAtISO: '2023-10-26T09:15:00Z', summary: ['Wasserhahn im Bad tropft konstant', 'Verursacht Geräusche in der Nacht'], draft: 'Sehr geehrte Frau Schmidt,\n\nvielen Dank für den Hinweis. Wir werden einen Handwerker mit der Reparatur des Wasserhahns beauftragen und uns bald bei Ihnen melden.\n\nMit freundlichen Grüßen,\nIhre Hausverwaltung', messageId: '<msg-7@email.com>', confidence: 96 },
];

export const invoices: Invoice[] = [
  { id: 'i1', supplier: 'Handwerker Schmidt', amount: 450.00, dueDateISO: '2023-11-10T00:00:00Z', status: InvoiceStatus.Pending, iban: 'DE89370400440532013000', invoiceNo: '2023-456', objectCode: 'OBJ-002', tenantName: 'N/A', summary: 'Reparatur Rohrleckage Keller', plausibility: 'Betrag im Rahmen für die durchgeführte Arbeit. Auftrag wurde erteilt.', paymentSuggestion: 'Zahlung freigeben und bis zum 10.11.2023 überweisen.', messageId: '<msg-2@email.com>' },
  { id: 'i2', supplier: 'Gartenbau Grün', amount: 1250.50, dueDateISO: '2023-11-15T00:00:00Z', status: InvoiceStatus.Pending, iban: 'DE12500105170648757261', invoiceNo: 'G-2023-10-01', objectCode: 'OBJ-001', tenantName: 'N/A', summary: 'Pflege der Außenanlagen Oktober', plausibility: 'Vertraglich vereinbarter Betrag. Leistung plausibel.', paymentSuggestion: 'Zahlung zur planmäßigen Überweisung freigeben.', messageId: '<msg-8@email.com>' },
];

export const rentStatus: RentStatus[] = [
  { id: 'r1', tenantName: 'Peter Pan', unit: 'Whg 01', month: 'Oktober 2023', dueAmount: 850.00, paidAmount: 850.00, lastPaymentISO: '2023-10-27T08:00:00Z', note: 'Vollständig bezahlt', reminderDraft: '' },
  { id: 'r2', tenantName: 'Lisa L.', unit: 'Whg 02', month: 'Oktober 2023', dueAmount: 920.00, paidAmount: 920.00, lastPaymentISO: '2023-10-26T11:00:00Z', note: 'Vollständig bezahlt', reminderDraft: '' },
  { id: 'r3', tenantName: 'Familie Meier', unit: 'Whg 03', month: 'Oktober 2023', dueAmount: 1200.00, paidAmount: 600.00, lastPaymentISO: '2023-10-25T16:30:00Z', note: 'Teilzahlung', reminderDraft: 'Sehr geehrte Familie Meier,\n\nwir möchten Sie freundlich daran erinnern, dass für den Monat Oktober noch ein Restbetrag von 600,00 € Ihrer Miete offen ist. Bitte überweisen Sie diesen Betrag zeitnah.\n\nMit freundlichen Grüßen,\nIhre Hausverwaltung' },
  { id: 'r4', tenantName: 'Tom T.', unit: 'Whg 04', month: 'Oktober 2023', dueAmount: 750.00, paidAmount: 0, lastPaymentISO: '', note: 'Zahlung ausstehend', reminderDraft: 'Sehr geehrter Herr T.,\n\nwir möchten Sie freundlich daran erinnern, dass die Miete für Oktober in Höhe von 750,00 € noch ausstehend ist. Bitte begleichen Sie den Betrag umgehend.\n\nMit freundlichen Grüßen,\nIhre Hausverwaltung' },
];

export const dunningCases: DunningCase[] = [
  { 
    id: 'd1', 
    tenantName: 'Anna Alt', 
    unit: 'Whg 15',
    stage: DunningStage.FirstDunning, 
    amount: 550.00, 
    dueDateISO: '2023-10-20T00:00:00Z', 
    history: [
      { dateISO: '2023-10-10T00:00:00Z', note: 'Zahlungserinnerung versendet' }
    ], 
    drafts: {
      [DunningStage.Reminder]: 'Entwurf für Zahlungserinnerung...',
      [DunningStage.FirstDunning]: 'Sehr geehrte Frau Alt,\n\nleider konnten wir zu unserer Zahlungserinnerung vom 10.10. noch keinen Zahlungseingang für die Miete September feststellen. Wir müssen Sie daher bitten, den offenen Betrag von 550,00 € bis zum 30.10.2023 zu überweisen. Bitte beachten Sie, dass Mahngebühren anfallen können.\n\nMit freundlichen Grüßen,\nIhre Hausverwaltung',
      [DunningStage.SecondDunning]: 'Entwurf für 2. Mahnung...'
    }
  },
];

export const allData = [...emails, ...complaints, ...invoices, ...rentStatus, ...dunningCases];
