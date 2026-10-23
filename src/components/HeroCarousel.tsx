import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Ticket, 
  Sparkles, 
  Armchair,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { EventItem } from '../types';
import { formatZAR } from '../utils/filterLogic';

interface HeroCarouselProps {
  featuredEvents: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onOpenSeatingMap: (event: EventItem) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  featuredEvents,
  onSelectEvent,
  onOpenSeatingMap,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto rotate every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, featuredEvents.length));
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredEvents.length]);

  if (!featuredEvents || featuredEvents.length === 0) return null;

  const currentEvent = featuredEvents[currentIndex] || featuredEvents[0];
  const isAppel = currentEvent.id === 'appel-in-pe-2026';

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? featuredEvents.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  return (
    <section 
      className="relative mb-10 overflow-hidden" 
      aria-label="Featured Events Banner"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Massive Banner (Columns 1-9) */}
        <div className="lg:col-span-9 relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between min-h-[360px] md:min-h-[420px] group">
          {/* Background image / graphic */}
          <div className="absolute inset-0">
            {isAppel ? (
              <div className="w-full h-full relative overflow-hidden bg-[#18110b]">
                {/* Embedded authentic graphic recreation of Appel Port Elizabeth banner from screenshot */}
                <img
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80"
                  alt="Appel Live in Port Elizabeth"
                  className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                
                {/* Ambient glow matching concert lights */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
              </div>
            ) : (
              <div className="w-full h-full relative overflow-hidden bg-slate-950">
                <img
                  src={currentEvent.bannerImage}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover object-center opacity-45 scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
              </div>
            )}
          </div>

          {/* Top Row: Badges & Controls */}
          <div className="relative z-10 p-5 md:p-6 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Event
              </span>

              {isAppel && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/80 text-red-200 border border-red-800/80">
                  Afrikaans Op Toer
                </span>
              )}

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
                {currentEvent.categoryLabel}
              </span>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-white/10">
              {featuredEvents.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Center / Bottom Content: Title & Details */}
          <div className="relative z-10 p-6 md:p-8 mt-auto">
            {isAppel && (
              <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 text-xs sm:text-sm font-extrabold uppercase tracking-widest font-display">
                  SOOS NET HY KAN
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl font-display">
              {currentEvent.title}
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl line-clamp-2">
              {currentEvent.subtitle || currentEvent.description}
            </p>

            {/* Date, Venue, Price Row */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-800">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">
                  {currentEvent.date.day} {currentEvent.date.month} {currentEvent.date.year}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-800">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Show: {currentEvent.date.time}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="truncate max-w-[200px]">{currentEvent.venue}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-amber-400 font-bold">
                From {formatZAR(currentEvent.priceFrom)}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectEvent(currentEvent)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 group/btn"
              >
                <Ticket className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                Book Tickets Now
              </button>

              {currentEvent.hasSeatingMap && (
                <button
                  type="button"
                  onClick={() => onOpenSeatingMap(currentEvent)}
                  className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 hover:border-amber-500/50 transition-all flex items-center gap-2"
                >
                  <Armchair className="w-4 h-4 text-amber-400" />
                  Interactive Seating Map
                </button>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute right-4 bottom-6 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700/80 transition-all focus:outline-none"
              aria-label="Previous Featured Event"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700/80 transition-all focus:outline-none"
              aria-label="Next Featured Event"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Side Banner (Columns 10-12) - Matching Screenshot "GATES OPEN 11h00 - Steve Hofmeyr ★★★" */}
        <div className="lg:col-span-3 flex flex-col justify-between rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-950 border border-amber-900/40 p-5 relative group">
          {/* Background image & gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
              alt="Steve Hofmeyr Live"
              className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          {/* Top Stamp: "GATES OPEN 11h00" */}
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs tracking-wider uppercase">
              ⚡ GATES OPEN 11h00
            </div>
            <div className="mt-4">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                Official Headliner
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-0.5">
                Steve Hofmeyr
              </h3>
              <p className="text-xs text-amber-300/90 mt-0.5 font-medium flex items-center gap-1">
                <span>Featured Live at KempieFees</span>
              </p>
            </div>
          </div>

          {/* Artist Portrait Cutout Simulation */}
          <div className="relative z-10 my-4 flex justify-center">
            <div className="w-28 h-28 rounded-full ring-4 ring-amber-500/30 overflow-hidden shadow-xl bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80"
                alt="Steve Hofmeyr"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Side Banner CTA */}
          <div className="relative z-10 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <span>Date: 31 OCT 2026</span>
              <span className="font-bold text-amber-400">From R160</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const kempie = featuredEvents.find((e) => e.id === 'kempie-fees-2026') || featuredEvents[0];
                onSelectEvent(kempie);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              Get KempieFees Pass
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
