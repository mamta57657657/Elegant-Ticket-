import React from 'react';
import { MapPin, Clock, Ticket, Sparkles, ChevronRight } from 'lucide-react';
import { EventItem } from '../types';
import { formatZAR } from '../utils/filterLogic';

interface EventCardProps {
  event: EventItem;
  onSelectEvent: (event: EventItem) => void;
  onQuickBook?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelectEvent,
  onQuickBook,
}) => {
  return (
    <div
      onClick={() => onSelectEvent(event)}
      className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 hover:border-amber-500/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectEvent(event);
        }
      }}
      aria-label={`View details for ${event.title}`}
    >
      {/* 16:9 Event Thumbnail Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <img
          src={event.bannerImage}
          alt={event.title}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill Overlay */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-slate-900/80 backdrop-blur-xs text-white border border-white/20">
            {event.categoryLabel}
          </span>
        </div>

        {/* Status / Urgency pill */}
        {event.status === 'almost-full' && (
          <div className="absolute top-2.5 right-2.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-500 text-slate-950 shadow-sm animate-pulse">
              Selling Fast
            </span>
          </div>
        )}

        {/* Quick price tag floating */}
        <div className="absolute bottom-2 right-2">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-900/90 text-amber-400 backdrop-blur-xs border border-slate-800">
            {formatZAR(event.priceFrom)}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex gap-3.5 flex-1 items-start bg-white">
        {/* Left Date Column matching OpenTickets screenshot */}
        <div className="flex flex-col items-center justify-center min-w-[48px] py-1 px-1.5 rounded-lg bg-orange-50/70 border border-orange-100/80">
          <span className="text-xl font-extrabold text-[#ea580c] leading-none font-display">
            {event.date.day}
          </span>
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-600 mt-0.5">
            {event.date.month}
          </span>
        </div>

        {/* Right Details Column */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors font-display">
              {event.title}
            </h3>

            {/* Venue with Location Pin */}
            <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>

            {/* Date & Time */}
            <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {event.date.rawDate}, {event.date.time}
              </span>
            </div>
          </div>

          {/* Bottom Card Action */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">
              From <strong className="text-slate-900 font-bold">{formatZAR(event.priceFrom)}</strong>
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:text-amber-700">
              <span>Book</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
