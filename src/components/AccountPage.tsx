import React, { useState } from 'react';
import { 
  User, 
  Ticket, 
  Receipt, 
  Bell, 
  QrCode, 
  Download, 
  Share2, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { PurchasedTicket } from './TicketBarcodeModal';
import { formatZAR } from '../utils/filterLogic';

interface AccountPageProps {
  purchasedTickets: PurchasedTicket[];
  onOpenTicketBarcode: (ticket: PurchasedTicket) => void;
  onNavigateHome: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  purchasedTickets,
  onOpenTicketBarcode,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'orders' | 'profile'>('tickets');
  const [userName, setUserName] = useState('Pieter de Villiers');
  const [userEmail, setUserEmail] = useState('pieter.devilliers@gmail.com');
  const [userPhone, setUserPhone] = useState('+27 82 456 7890');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="pb-16 max-w-5xl mx-auto animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 mb-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-bold text-2xl flex items-center justify-center font-display shadow-lg shadow-amber-500/20">
            {userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                {userName}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Buyer
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{userEmail} • {userPhone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Find More Events
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'tickets'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Ticket className="w-4 h-4 text-amber-400" />
          <span>My Tickets ({purchasedTickets.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Receipt className="w-4 h-4 text-amber-400" />
          <span>Order History</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4 text-amber-400" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Tab 1: My Tickets */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {purchasedTickets.length > 0 ? (
            purchasedTickets.map((ticket) => (
              <div
                key={ticket.ticketId}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-amber-500/50 shadow-xs hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col items-center justify-center shrink-0">
                    <QrCode className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-mono font-bold text-amber-800 mt-0.5">SCAN</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {ticket.status === 'valid' ? 'Active Pass' : 'Transferred'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{ticket.bookingRef}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base font-display mt-1">
                      {ticket.eventTitle}
                    </h3>

                    <div className="text-xs font-semibold text-amber-700 mt-0.5">
                      {ticket.tierName} {ticket.seatLabel ? `• Seat ${ticket.seatLabel}` : ''}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {ticket.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {ticket.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {ticket.venue}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:self-center shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenTicketBarcode(ticket)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>View QR Pass</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 font-display">No active tickets found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Tickets you purchase with Instant EFT or Card will automatically appear here with your digital entrance barcodes.
              </p>
              <button
                type="button"
                onClick={onNavigateHome}
                className="mt-4 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Browse Events
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm font-display">Completed Orders & Invoices</h3>
            <span className="text-xs text-slate-400">All prices include 15% South African VAT</span>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-amber-600 font-bold">#OT-2026-98421</span>
                <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                  Appel in PE - Soos Net Hy Kan (x2 Golden Circle)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Paid via Ozow Instant EFT on 23 Oct 2026 • Reference: OT-APPEL-984
                </p>
              </div>

              <div className="text-right sm:self-center shrink-0">
                <span className="text-base font-bold text-slate-900 font-display block">
                  R580.00
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Paid
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base font-display mb-1">
            Buyer Details & SMS Alerts
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Your details are used for digital ticket dispatch, turnstile verification, and refund reconciliations.
          </p>

          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                South African Mobile Number (for SMS Barcode)
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                {savedSuccess ? 'Changes Saved!' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
