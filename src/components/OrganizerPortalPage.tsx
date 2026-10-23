import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Calculator, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Check, 
  Send,
  Building2
} from 'lucide-react';
import { formatZAR } from '../utils/filterLogic';

export const OrganizerPortalPage: React.FC = () => {
  const [ticketPrice, setTicketPrice] = useState(200);
  const [ticketQuantity, setTicketQuantity] = useState(650);

  const [orgName, setOrgName] = useState('');
  const [eventName, setEventName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Revenue calculation: Open Tickets standard 4% + R5 ticketing fee paid by buyer or deducted
  const grossRevenue = ticketPrice * ticketQuantity;
  const organizerNet = Math.round(grossRevenue * 0.96);
  const platformFee = grossRevenue - organizerNet;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !eventName || !contactEmail) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setOrgName('');
      setEventName('');
      setContactEmail('');
    }, 4000);
  };

  return (
    <div className="pb-16 max-w-5xl mx-auto animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 mb-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
          <Users className="w-3.5 h-3.5 text-amber-400" />
          Event Organizers & Venues
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
          Sell Out Your Next Event with Open Tickets
        </h1>
        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
          South Africa’s most reliable ticketing platform with real-time gate scanning, 2D reserved seating maps, next-day payout reconciliation, and zero setup charges.
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <TrendingUp className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-bold text-sm text-white">Next-Day Payouts</h4>
            <p className="text-xs text-slate-400 mt-1">Receive event funds directly into your FNB, Nedbank, Standard Bank or Absa business account.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <Smartphone className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-bold text-sm text-white">Free Scanner App</h4>
            <p className="text-xs text-slate-400 mt-1">Scan up to 1,200 attendees per hour per turnstile on any iOS or Android phone, even offline.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <Building2 className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-bold text-sm text-white">Interactive Seating Maps</h4>
            <p className="text-xs text-slate-400 mt-1">Custom tiered arenas, theaters, and stadium layouts tailored for your specific venue.</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Revenue Calculator (6 cols) & Listing Application (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue Calculator */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-slate-900 text-base font-display">
              Organizer Payout Calculator
            </h2>
          </div>

          <p className="text-xs text-slate-600">
            Calculate your estimated ticket earnings and net payout with Open Tickets South Africa:
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label className="font-semibold text-slate-700">Average Ticket Price (ZAR)</label>
                <span className="font-bold text-slate-900">{formatZAR(ticketPrice)}</span>
              </div>
              <input
                type="range"
                min={30}
                max={1500}
                step={10}
                value={ticketPrice}
                onChange={(e) => setTicketPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label className="font-semibold text-slate-700">Estimated Ticket Volume</label>
                <span className="font-bold text-slate-900">{ticketQuantity.toLocaleString()} tickets</span>
              </div>
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Gross Ticket Sales:</span>
              <span className="font-semibold text-slate-900">{formatZAR(grossRevenue)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Estimated Open Tickets Fee (4%):</span>
              <span className="font-semibold text-slate-700">{formatZAR(platformFee)}</span>
            </div>
            <div className="pt-2 border-t border-amber-200 flex justify-between text-sm sm:text-base font-extrabold text-slate-950 font-display">
              <span>Estimated Net Payout:</span>
              <span className="text-xl text-amber-700">{formatZAR(organizerNet)}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            * Includes payment gateway processing (Ozow, Capitec Pay, Visa, Mastercard). No hidden monthly subscription fees.
          </div>
        </div>

        {/* Listing Application Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-base font-display">
              List Your Event on Open Tickets
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit your event specs. We configure your ticketing page and custom seating map within 24 hours.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-display">
                Application Received!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, {orgName}. Our venue onboarding specialist will contact {contactEmail} today to launch your event.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Organizer / Company / School Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pretoria Live Music Guild"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Event Name & Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jacaranda Spring Music Festival (Pretoria)"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. organizer@example.co.za"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Event Listing Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
