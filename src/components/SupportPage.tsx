import React, { useState } from 'react';
import { 
  Headphones, 
  MessageCircle, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [ticketRef, setTicketRef] = useState('');
  const [resendContact, setResendContact] = useState('');
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Ticketing Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleResendTickets = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendContact) return;
    setResendStatus('Resending your digital tickets to ' + resendContact + ' via SMS & Email...');
    setTimeout(() => {
      setResendStatus('Tickets successfully resent! Please check your inbox and SMS.');
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactMessage('');
    }, 4000);
  };

  return (
    <div className="pb-16 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 mb-8 shadow-xl text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
          <Headphones className="w-3.5 h-3.5 text-amber-400" />
          Customer Care & Helpdesk
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
          How can we help you today?
        </h1>
        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Immediate assistance for ticket delivery, barcode scanning issues at venue gates, and refund requests.
        </p>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">WhatsApp Support</span>
              <strong className="text-sm text-white">+27 82 000 0000</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Direct Email</span>
              <strong className="text-sm text-white">support@opentickets.co.za</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Support Hours</span>
              <strong className="text-xs text-white">07:00 – 22:00 (7 Days)</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quick Instant Ticket Resend Box (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <RefreshCw className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-slate-900 text-base font-display">
              Instant Ticket Resend
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Can&apos;t find your email or SMS with your barcodes? Enter the email address or South African cell number used during purchase:
          </p>

          <form onSubmit={handleResendTickets} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Email Address or Cell Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 082 123 4567 or user@gmail.com"
                value={resendContact}
                onChange={(e) => setResendContact(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Booking Reference (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. OT-2026-98421"
                value={ticketRef}
                onChange={(e) => setTicketRef(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Resend My Tickets Now
            </button>
          </form>

          {resendStatus && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{resendStatus}</span>
            </div>
          )}
        </div>

        {/* Right: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-base font-display">
              Send our Support Team a Message
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              We usually respond within 15 minutes during event days.
            </p>
          </div>

          {contactSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-display">
                Message Received!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Ticket inquiry #9822 created. One of our support specialists has been assigned and will reply to {contactEmail}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Venter"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@example.co.za"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Topic / Issue
                </label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                >
                  <option value="Ticketing Inquiry">Ticketing / Barcode Not Received</option>
                  <option value="Refund Request">Refund / Cancellation Query</option>
                  <option value="Seating Map Question">Interactive Seating Map Help</option>
                  <option value="Organizer Listing">Host an Event / Organizer Portal</option>
                  <option value="Payment Verification">Ozow / EFT Clearance Delay</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your issue or include your booking reference..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-amber-500/20 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Support Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
