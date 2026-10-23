import React, { useState } from 'react';
import { 
  X, 
  Armchair, 
  Check, 
  ShoppingCart, 
  Info, 
  Sparkles,
  Volume2
} from 'lucide-react';
import { EventItem, Seat } from '../types';
import { generateAppelSeatingData, SeatingBlock } from '../data/seatingData';
import { formatZAR } from '../utils/filterLogic';

interface SeatingMapModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSeats: (selectedSeats: Seat[]) => void;
}

export const SeatingMapModal: React.FC<SeatingMapModalProps> = ({
  event,
  isOpen,
  onClose,
  onConfirmSeats,
}) => {
  const [blocks] = useState<SeatingBlock[]>(() => generateAppelSeatingData());
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);

  if (!isOpen) return null;

  // Flatten all seats
  const allSeats: Seat[] = blocks.flatMap((b) => b.seats);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'reserved') return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 8) {
        alert('You can select a maximum of 8 seats per order.');
        return;
      }
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    }
  };

  const selectedSeats = allSeats.filter((s) => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;
    onConfirmSeats(selectedSeats);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seating-modal-title"
    >
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Interactive Seating Map
              </span>
              <span className="text-xs text-slate-400">Boardwalk Hotel & Casino</span>
            </div>
            <h2 id="seating-modal-title" className="text-lg sm:text-xl font-bold font-display mt-0.5 text-white">
              {event.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close seating map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend Bar */}
        <div className="px-6 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-amber-500 border border-amber-400" />
              <span>Golden Circle ({formatZAR(290)})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-purple-600 border border-purple-400" />
              <span>VIP Block A ({formatZAR(450)})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-blue-600 border border-blue-400" />
              <span>Standard Seated ({formatZAR(180)})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-slate-700 opacity-40 cursor-not-allowed" />
              <span className="text-slate-400">Reserved / Sold</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-emerald-500 ring-2 ring-emerald-300" />
              <span className="font-semibold text-emerald-400">Selected</span>
            </div>
          </div>

          <div className="text-slate-400 text-[11px] flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            Click any open seat to select
          </div>
        </div>

        {/* Interactive Seating Canvas */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center">
          {/* Stage Element */}
          <div className="w-full max-w-2xl mb-8 flex flex-col items-center">
            <div className="w-full py-2.5 rounded-t-3xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 text-center font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-lg shadow-amber-500/20 font-display flex items-center justify-center gap-2">
              <Volume2 className="w-4 h-4" />
              STAGE / HOOF-VERHOOG — APPEL LIVE
              <Volume2 className="w-4 h-4" />
            </div>
            <div className="w-4/5 h-2 bg-gradient-to-b from-amber-500/40 to-transparent blur-xs" />
          </div>

          {/* Seating Grid */}
          <div className="w-full max-w-4xl flex flex-col gap-8 items-center">
            {/* 1. Golden Circle Pit */}
            <div className="w-full max-w-xl p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col items-center">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Golden Circle (Front of Stage) — {formatZAR(290)}
              </span>
              <div className="flex flex-col gap-2 items-center">
                {['A', 'B', 'C'].map((row) => (
                  <div key={row} className="flex items-center gap-1.5">
                    <span className="w-4 text-[10px] font-mono text-amber-400/80 font-bold">{row}</span>
                    <div className="flex gap-1.5">
                      {blocks[0].seats
                        .filter((s) => s.row === row)
                        .map((seat) => {
                          const isSelected = selectedSeatIds.includes(seat.id);
                          const isReserved = seat.status === 'reserved';
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              disabled={isReserved}
                              onClick={() => toggleSeat(seat)}
                              onMouseEnter={() => setHoveredSeat(seat)}
                              onMouseLeave={() => setHoveredSeat(null)}
                              className={`w-6 h-6 rounded-md text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                                isReserved
                                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-40'
                                  : isSelected
                                  ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 scale-110 shadow-lg'
                                  : 'bg-amber-500/80 hover:bg-amber-400 text-slate-950 hover:scale-110'
                              }`}
                              aria-label={`Golden Circle Row ${seat.row} Seat ${seat.seatNumber}`}
                            >
                              {seat.seatNumber}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Main Seated Blocks (Block B, Block A, Block C) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full items-start">
              {/* Block B: Left Wing */}
              <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex flex-col items-center">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                  Block B (Left) — {formatZAR(180)}
                </span>
                <div className="flex flex-col gap-2">
                  {['D', 'E', 'F', 'G'].map((row) => (
                    <div key={row} className="flex items-center gap-1.5">
                      <span className="w-4 text-[10px] font-mono text-slate-400">{row}</span>
                      <div className="flex gap-1">
                        {blocks[2].seats
                          .filter((s) => s.row === row)
                          .map((seat) => {
                            const isSelected = selectedSeatIds.includes(seat.id);
                            const isReserved = seat.status === 'reserved';
                            return (
                              <button
                                key={seat.id}
                                type="button"
                                disabled={isReserved}
                                onClick={() => toggleSeat(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                                className={`w-5 h-5 rounded text-[9px] font-mono font-bold flex items-center justify-center transition-all ${
                                  isReserved
                                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-40'
                                    : isSelected
                                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 scale-110'
                                    : 'bg-blue-600/70 hover:bg-blue-500 text-white hover:scale-110'
                                }`}
                              >
                                {seat.seatNumber}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block A: VIP Center */}
              <div className="lg:col-span-6 p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-col items-center shadow-lg shadow-purple-950/30">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  Block A (VIP Center) — {formatZAR(450)}
                </span>
                <div className="flex flex-col gap-2">
                  {['D', 'E', 'F', 'G'].map((row) => (
                    <div key={row} className="flex items-center gap-1.5">
                      <span className="w-4 text-[10px] font-mono text-purple-400">{row}</span>
                      <div className="flex gap-1">
                        {blocks[1].seats
                          .filter((s) => s.row === row)
                          .map((seat) => {
                            const isSelected = selectedSeatIds.includes(seat.id);
                            const isReserved = seat.status === 'reserved';
                            return (
                              <button
                                key={seat.id}
                                type="button"
                                disabled={isReserved}
                                onClick={() => toggleSeat(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                                className={`w-5 h-5 rounded text-[9px] font-mono font-bold flex items-center justify-center transition-all ${
                                  isReserved
                                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-40'
                                    : isSelected
                                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 scale-110'
                                    : 'bg-purple-600 hover:bg-purple-500 text-white hover:scale-110'
                                }`}
                              >
                                {seat.seatNumber}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block C: Right Wing */}
              <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex flex-col items-center">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                  Block C (Right) — {formatZAR(180)}
                </span>
                <div className="flex flex-col gap-2">
                  {['D', 'E', 'F', 'G'].map((row) => (
                    <div key={row} className="flex items-center gap-1.5">
                      <span className="w-4 text-[10px] font-mono text-slate-400">{row}</span>
                      <div className="flex gap-1">
                        {blocks[3].seats
                          .filter((s) => s.row === row)
                          .map((seat) => {
                            const isSelected = selectedSeatIds.includes(seat.id);
                            const isReserved = seat.status === 'reserved';
                            return (
                              <button
                                key={seat.id}
                                type="button"
                                disabled={isReserved}
                                onClick={() => toggleSeat(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                                className={`w-5 h-5 rounded text-[9px] font-mono font-bold flex items-center justify-center transition-all ${
                                  isReserved
                                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-40'
                                    : isSelected
                                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 scale-110'
                                    : 'bg-blue-600/70 hover:bg-blue-500 text-white hover:scale-110'
                                }`}
                              >
                                {seat.seatNumber}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hover seat info banner */}
          <div className="mt-6 min-h-[32px] text-xs font-mono text-slate-300 flex items-center gap-2">
            {hoveredSeat ? (
              <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300">
                Seat {hoveredSeat.block} — Row {hoveredSeat.row}, Seat #{hoveredSeat.seatNumber} • {hoveredSeat.tier} • {formatZAR(hoveredSeat.price)}
              </span>
            ) : (
              <span className="text-slate-500 italic">Hover over seats to preview view & price</span>
            )}
          </div>
        </div>

        {/* Footer Checkout Tray */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Armchair className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs text-slate-400 block">Selected Seats:</span>
                <span className="text-sm font-bold text-white">
                  {selectedSeats.length > 0
                    ? `${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} (${selectedSeats.map((s) => `${s.row}${s.seatNumber}`).join(', ')})`
                    : 'No seats selected yet'}
                </span>
              </div>
            </div>

            {selectedSeats.length > 0 && (
              <div className="sm:border-l sm:border-slate-800 sm:pl-3">
                <span className="text-xs text-slate-400 block">Total:</span>
                <span className="text-base font-extrabold text-amber-400 font-display">
                  {formatZAR(totalPrice)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 font-medium text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={selectedSeats.length === 0}
              onClick={handleCheckout}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg ${
                selectedSeats.length > 0
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Confirm Seats ({selectedSeats.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
