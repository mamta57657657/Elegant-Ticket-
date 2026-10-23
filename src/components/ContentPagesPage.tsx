import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  MapPin, 
  HelpCircle, 
  Compass, 
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const ContentPagesPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [selectedDoc, setSelectedDoc] = useState<'privacy' | 'terms' | 'turnstile' | 'boardwalk'>('privacy');

  const pages = [
    { id: 'privacy', title: 'Privacy Policy', category: 'Legal', icon: ShieldCheck },
    { id: 'terms', title: 'Terms and Conditions', category: 'Legal', icon: FileText },
    { id: 'turnstile', title: 'Mobile QR Gate Scanning Guide', category: 'Buyer Guides', icon: Compass },
    { id: 'boardwalk', title: 'Boardwalk Hotel & Casino Event Guide', category: 'Venue Guides', icon: MapPin },
  ];

  return (
    <div className="pb-16 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 mb-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Open Tickets Knowledge & Policies
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
          Pages & Event Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Official policies, venue attendee guides, terms of sale, and mobile ticketing instructions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Menu (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 block">
            Documents & Guides
          </span>
          {pages.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedDoc === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedDoc(p.id as any)}
                className={`w-full p-3 rounded-xl text-left flex items-center justify-between gap-3 transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="text-xs truncate">{p.title}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Right Article Body (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          {selectedDoc === 'privacy' && (
            <article className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Privacy Policy & POPIA Compliance
              </h2>
              <p>
                Open Tickets (opentickets.co.za) strictly adheres to the Protection of Personal Information Act (POPIA) of South Africa. We respect your privacy and process all buyer information with bank-grade encryption.
              </p>
              <h3 className="text-base font-bold text-slate-900 font-display mt-4">1. Data We Collect</h3>
              <p>
                When purchasing tickets, we collect your full name, email address, and South African mobile number solely for issuing your barcode passes and dispatching SMS entry notifications. Payment data is processed directly via tokenized PCI-DSS compliant gateways (Ozow, Capitec Pay, PayFast).
              </p>
              <h3 className="text-base font-bold text-slate-900 font-display mt-4">2. Sharing with Event Organizers</h3>
              <p>
                Organizers only receive attendance registration lists necessary for safe crowd management and turnstile verification at the event gates. We never sell your personal data to third-party marketing brokers.
              </p>
            </article>
          )}

          {selectedDoc === 'terms' && (
            <article className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Terms and Conditions of Ticket Sale
              </h2>
              <p>
                By purchasing or holding a ticket issued through Open Tickets, you agree to these terms:
              </p>
              <h3 className="text-base font-bold text-slate-900 font-display mt-4">1. Ticket Authenticity & Resale</h3>
              <p>
                Tickets purchased via opentickets.co.za are uniquely cryptographically encrypted. Unauthorised duplication, scalping, or altering of barcodes voids the ticket automatically.
              </p>
              <h3 className="text-base font-bold text-slate-900 font-display mt-4">2. Event Postponements & Cancellations</h3>
              <p>
                If an event is rescheduled, tickets automatically remain valid for the new date. In the event of full cancellation by the organizer, refunds are issued within 5 to 7 business days directly to the original account.
              </p>
            </article>
          )}

          {selectedDoc === 'turnstile' && (
            <article className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Mobile QR Gate Scanning Guide
              </h2>
              <p>
                Our high-speed laser and optical turnstile scanners read directly from your phone screen. Follow these tips for effortless entry:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Screen Brightness:</strong> Set your phone brightness to maximum when reaching the front of the queue.</li>
                <li><strong>Offline Backup:</strong> Save your PDF pass to Apple Wallet, Google Wallet, or take a screenshot in case cellular coverage is congested.</li>
                <li><strong>Individual Tickets:</strong> If you purchased multiple tickets for a group, transfer individual tickets via your Open Tickets account or have everyone arrive together.</li>
              </ul>
            </article>
          )}

          {selectedDoc === 'boardwalk' && (
            <article className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Boardwalk Hotel & Casino Event Guide (PE)
              </h2>
              <p>
                Attending &ldquo;Appel in PE – Soos Net Hy Kan&rdquo; at the Boardwalk Hotel & Casino in Gqeberha:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Parking:</strong> Undercover and open bay secure parking is available within the Boardwalk precinct. Follow venue parking marshal signs.</li>
                <li><strong>Food & Beverages:</strong> Multiple artisan food stalls and licensed cash/card bars are operational inside the arena area from 18:00.</li>
                <li><strong>Disabled Access:</strong> Wheelchair ramps and dedicated accessible viewing areas are located adjacent to Block A.</li>
              </ul>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};
