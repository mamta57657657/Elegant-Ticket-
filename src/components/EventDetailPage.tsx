import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Share2,
  Armchair,
  Ticket,
  ChevronLeft,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  AlertCircle,
  Building2,
  Heart
} from 'lucide-react';
import { EventItem, TicketTier, Seat } from '../types';
import { formatZAR } from '../utils/filterLogic';

interface EventDetailPageProps {
  event: EventItem;
  onBack: () => void;
  onOpenSeatingMap: (event: EventItem) => void;
  onAddToCart: (tier: TicketTier, quantity: number, selectedSeats?: string[]) => void;
  onSelectRelatedEvent: (event: EventItem) => void;
  relatedEvents: EventItem[];
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onBack,
  onOpenSeatingMap,
  onAddToCart,
  onSelectRelatedEvent,
  relatedEvents,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    event.ticketTiers.forEach((tier, idx) => {
      initial[tier.id] = idx === 0 ? 1 : 0;
    });
    return initial;
  });

  const [activeTab, setActiveTab] = useState<'details' | 'venue' | 'organizer'>('details');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleQuantityChange = (tierId: string, delta: number, max: number) => {
    setQuantities((prev) => {
      const current = prev[tierId] || 0;
      const next = Math.max(0, Math.min(max, current + delta));
      return { ...prev, [tierId]: next };
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Calculate subtotal
  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const subtotal = event.ticketTiers.reduce((sum, tier) => {
    const qty = quantities[tier.id] || 0;
    return sum + tier.price * qty;
  }, 0);

  const handleAddAllToCart = () => {
    if (totalTickets === 0) return;
    event.ticketTiers.forEach((tier) => {
      const qty = quantities[tier.id] || 0;
      if (qty > 0) {
        onAddToCart(tier, qty);
      }
    });
  };

  return (
    <article className="pb-16 animate-fadeIn">
      {/* Top Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Events
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className={`p-1.5 rounded-lg border shadow-xs transition-colors ${
              isSaved
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-white text-slate-600 hover:text-red-500 border-slate-200/80'
            }`}
            title="Save event"
            aria-label="Save event to favorites"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <header className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 mb-8 min-h-[340px] sm:min-h-[400px] flex flex-col justify-end p-6 sm:p-10">
        <div className="absolute inset-0">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        {/* Hero Meta & Title */}
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
              {event.categoryLabel}
            </span>
            {event.status === 'almost-full' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500 text-white animate-pulse">
                Selling Fast
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-200 border border-slate-700">
              Official Open Tickets Event
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
            {event.title}
          </h1>

          {event.subtitle && (
            <p className="mt-2 text-base sm:text-lg text-slate-300 font-medium">
              {event.subtitle}
            </p>
          )}

          {/* Quick Info Grid in Hero */}
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-800">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="font-semibold">
                {event.date.day} {event.date.month} {event.date.year}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>
                Gates: {event.gatesOpen} • Show: {event.date.time}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-800">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{event.venue}, {event.city}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Details Left (7 Cols), Ticket Selection Right (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Information Tabs */}
        <section aria-label="Event Details and Venue" className="lg:col-span-7 flex flex-col gap-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                activeTab === 'details'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Event Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('venue')}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                activeTab === 'venue'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Venue & Directions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('organizer')}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                activeTab === 'organizer'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Organizer Info
            </button>
          </div>

          {/* Tab 1: Details */}
          {activeTab === 'details' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  About This Event
                </h2>
                <div className="mt-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                  {event.description}
                </div>
              </div>

              {/* Event Highlights / Badges */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Key Event Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-[11px] text-slate-500 block">Gates Open</span>
                    <strong className="text-sm font-bold text-slate-900">{event.gatesOpen}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-[11px] text-slate-500 block">Show Starts</span>
                    <strong className="text-sm font-bold text-slate-900">{event.date.time}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-[11px] text-slate-500 block">Duration</span>
                    <strong className="text-sm font-bold text-slate-900">{event.duration || 'Approx 3 hours'}</strong>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Tags:</span>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Venue */}
          {activeTab === 'venue' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  {event.venue}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {event.city}, {event.province}, South Africa
                </p>
              </div>

              {/* Map Preview Placeholder */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[16/9] flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                <div className="relative z-10 text-center p-6 bg-white/90 backdrop-blur-xs rounded-2xl shadow-lg border border-slate-200 max-w-sm">
                  <Building2 className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">{event.venue}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Secure on-site parking available. Follow official event security marshals on arrival.
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${event.venue} ${event.city}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-amber-600 transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Organizer */}
          {activeTab === 'organizer' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg font-display">
                  {event.organizer.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-lg font-bold text-slate-900 font-display">
                      {event.organizer.name}
                    </h2>
                    {event.organizer.verified && (
                      <span title="Verified Organizer" className="inline-flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">Official Open Tickets Verified Organizer</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Tickets purchased through Open Tickets are guaranteed 100% genuine and linked directly to the organizer’s official entry turnstile management software.
              </p>

              {event.organizer.contact && (
                <div className="text-xs text-slate-500 pt-3 border-t border-slate-100">
                  Organizer inquiries: <strong className="text-slate-800">{event.organizer.contact}</strong>
                </div>
              )}
            </div>
          )}

          {/* Safety & Guarantee Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <strong className="text-white text-sm block font-semibold">
                Open Tickets Buyer Protection Guarantee
              </strong>
              <p className="text-slate-400 mt-0.5">
                Instant digital barcode delivery, 3D-Secure payment encryption, and automatic full refunds if this event is cancelled.
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Ticket Tier Selector & Booking Box (5 Cols) */}
        <aside aria-label="Ticket Selection and Booking" className="lg:col-span-5 sticky top-20">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Select Tickets
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 font-display">
                  Admission Tiers
                </h2>
              </div>
              <Ticket className="w-6 h-6 text-amber-500" />
            </div>

            {/* Interactive Seating Map Button if available */}
            {event.hasSeatingMap && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200/90">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-amber-900 block flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Reserved Seating Map Available
                    </span>
                    <span className="text-[11px] text-amber-700">
                      Pick your exact row & seat for {event.title}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenSeatingMap(event)}
                  className="mt-3 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Armchair className="w-4 h-4" />
                  Choose Seats on Interactive Map
                </button>
              </div>
            )}

            {/* Ticket Tier List */}
            <div className="mt-5 space-y-3.5">
              {event.ticketTiers.map((tier) => {
                const qty = quantities[tier.id] || 0;
                return (
                  <div
                    key={tier.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      qty > 0
                        ? 'border-amber-500 bg-amber-50/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm font-display">
                          {tier.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {tier.description}
                        </p>
                        <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
                          ✓ {tier.available} tickets left
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-extrabold text-slate-900 font-display">
                          {formatZAR(tier.price)}
                        </span>
                      </div>
                    </div>

                    {/* Counter Row */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">Quantity</span>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(tier.id, -1, tier.maxPerOrder)}
                          disabled={qty <= 0}
                          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
                          aria-label={`Decrease ${tier.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-sm text-slate-900">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(tier.id, 1, tier.maxPerOrder)}
                          disabled={qty >= tier.maxPerOrder}
                          className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-slate-950 flex items-center justify-center font-bold transition-colors"
                          aria-label={`Increase ${tier.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Summary & Order Action */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Total Tickets:</span>
                <span className="font-semibold text-slate-900">{totalTickets}</span>
              </div>
              <div className="flex items-center justify-between text-base">
                <span className="font-bold text-slate-900">Subtotal:</span>
                <span className="font-extrabold text-2xl text-amber-600 font-display">
                  {formatZAR(subtotal)}
                </span>
              </div>

              <button
                type="button"
                disabled={totalTickets === 0}
                onClick={handleAddAllToCart}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${
                  totalTickets > 0
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <Ticket className="w-4 h-4" />
                Add to Cart ({totalTickets})
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-2">
                <span>🔒 Ozow Instant EFT</span>
                <span>•</span>
                <span>💳 Visa / Mastercard</span>
                <span>•</span>
                <span>📱 Mobile Scan</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Events Section */}
      {relatedEvents && relatedEvents.length > 0 && (
        <section className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
                Recommended
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                You Might Also Like
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedEvents.slice(0, 3).map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelatedEvent(rel)}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-amber-500/40 p-4 shadow-xs hover:shadow-lg transition-all cursor-pointer flex gap-3"
              >
                <img
                  src={rel.bannerImage}
                  alt={rel.title}
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-amber-600 uppercase block">
                    {rel.date.day} {rel.date.month}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs line-clamp-2 mt-0.5">
                    {rel.title}
                  </h3>
                  <span className="text-[11px] text-slate-500 block truncate mt-1">
                    {rel.venue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
