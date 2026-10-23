import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  QrCode, 
  Barcode, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Send, 
  Check, 
  Ticket as TicketIcon 
} from 'lucide-react';
import { CartItem } from '../types';
import { formatZAR } from '../utils/filterLogic';

export interface PurchasedTicket {
  ticketId: string;
  bookingRef: string;
  eventId: string;
  eventTitle: string;
  venue: string;
  date: string;
  time: string;
  tierName: string;
  seatLabel?: string;
  buyerName: string;
  price: number;
  qrData: string;
  status: 'valid' | 'used' | 'transferred';
}

interface TicketBarcodeModalProps {
  ticket: PurchasedTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onTransferSuccess?: (ticketId: string, recipientEmail: string) => void;
}

export const TicketBarcodeModal: React.FC<TicketBarcodeModalProps> = ({
  ticket,
  isOpen,
  onClose,
  onTransferSuccess,
}) => {
  const [transferMode, setTransferMode] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !ticket) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientName) return;
    setTransferConfirmed(true);
    setTimeout(() => {
      onTransferSuccess?.(ticket.ticketId, recipientEmail);
      setTransferMode(false);
      setTransferConfirmed(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
    >
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scaleUp flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TicketIcon className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Official Digital Event Pass
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
            aria-label="Close ticket view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Body: Authentic pass design */}
        <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center">
          {transferMode ? (
            /* Transfer Flow */
            <div className="w-full space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-bold font-display text-white">
                  Transfer Ticket to a Friend
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Once transferred, your barcode is invalidated and a fresh barcode is issued to the recipient.
                </p>
              </div>

              {transferConfirmed ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Transfer Successful!</h4>
                  <p className="text-xs text-slate-400">
                    Sent to {recipientEmail}. Updating your wallet...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTransfer} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johan van der Merwe"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Recipient Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. johan@example.co.za"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTransferMode(false)}
                      className="flex-1 py-2 text-xs rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                    >
                      Confirm Transfer
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Barcode Pass Display */
            <div className="w-full flex flex-col items-center">
              {/* Event Name */}
              <h3 className="text-xl font-extrabold text-white font-display text-center leading-tight">
                {ticket.eventTitle}
              </h3>
              <span className="text-xs font-bold text-amber-400 mt-1 uppercase tracking-wider">
                {ticket.tierName}
              </span>

              {ticket.seatLabel && (
                <div className="mt-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                  Seat: {ticket.seatLabel}
                </div>
              )}

              {/* QR Code Container */}
              <div className="my-6 p-4 rounded-3xl bg-white shadow-2xl flex flex-col items-center justify-center">
                {/* Authentic Simulated QR Code graphic with ticket logo */}
                <div className="w-48 h-48 bg-slate-950 p-2 rounded-2xl flex flex-col items-center justify-center relative">
                  <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-white rounded-xl">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35
                            ? 'bg-slate-950'
                            : (i * 7) % 5 === 0
                            ? 'bg-amber-600'
                            : 'bg-slate-900'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-xs shadow-md border-2 border-white">
                      OT
                    </div>
                  </div>
                </div>

                {/* Barcode Lines Below */}
                <div className="mt-3 w-48 flex items-center justify-between text-slate-950 font-mono text-[9px] tracking-widest pt-2 border-t border-slate-200">
                  <span>{ticket.bookingRef}</span>
                  <span className="text-slate-400 font-bold">SECURE SCAN</span>
                </div>
              </div>

              {/* Event Info Grid */}
              <div className="w-full bg-slate-800/60 rounded-2xl p-4 border border-slate-700/80 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    Date:
                  </span>
                  <strong className="text-white">{ticket.date}</strong>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    Time:
                  </span>
                  <strong className="text-white">{ticket.time}</strong>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    Venue:
                  </span>
                  <strong className="text-white truncate max-w-[180px]">{ticket.venue}</strong>
                </div>

                <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Attendee: <strong className="text-slate-200">{ticket.buyerName}</strong></span>
                  <span className="text-amber-400 font-bold">{formatZAR(ticket.price)}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Valid for turnstile optical scanners. Brightness set to 100%.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!transferMode && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'PDF Downloaded!' : 'Download PDF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setTransferMode(true)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transfer Ticket</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
