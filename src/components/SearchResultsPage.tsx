import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  X, 
  Calendar, 
  MapPin, 
  SlidersHorizontal,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { EventItem, EventCategory } from '../types';
import { filterEvents, sortEvents, SortOption, formatZAR } from '../utils/filterLogic';
import { EventCard } from './EventCard';

interface SearchResultsPageProps {
  initialQuery?: string;
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onClearToHome: () => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  initialQuery = '',
  events,
  onSelectEvent,
  onClearToHome,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<EventCategory | 'all'>('all');
  const [month, setMonth] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');

  const categories: { id: EventCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'music', label: 'Music & Concerts' },
    { id: 'soccer', label: 'Soccer & PSL' },
    { id: 'outdoor', label: 'Outdoor & 4x4' },
    { id: 'schools', label: 'Schools & Youth' },
    { id: 'lifestyle', label: 'Expo & Lifestyle' },
  ];

  const popularSearches = ['Appel', 'Sundowns', 'Kaizer Chiefs', '4x4', 'Fashion', 'Sandringham'];

  const filteredEvents = useMemo(() => {
    const res = filterEvents(events, {
      searchQuery: query,
      category,
      month,
      maxPrice: maxPrice >= 2000 ? undefined : maxPrice,
    });
    return sortEvents(res, sortBy);
  }, [events, query, category, month, maxPrice, sortBy]);

  const hasActiveFilters = query !== '' || category !== 'all' || month !== 'all' || maxPrice < 2000;

  const resetAll = () => {
    setQuery('');
    setCategory('all');
    setMonth('all');
    setMaxPrice(2000);
    setSortBy('date-asc');
  };

  return (
    <div className="pb-16 animate-fadeIn">
      {/* Top Search Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 mb-8 shadow-xl">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Search Events & Tickets
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            {query ? `Search Results for "${query}"` : 'Browse All Events'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Find concerts, soccer derbies, outdoor expos and school tournaments across South Africa.
          </p>

          {/* Search Bar */}
          <div className="mt-5 relative">
            <input
              type="text"
              placeholder="Search by event title, artist, venue or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-950 text-white placeholder-slate-400 text-sm border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px]">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Left (3 Cols), Results Right (9 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-700" />
              <h2 className="font-bold text-slate-900 text-sm font-display">Filters</h2>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="text-xs text-amber-600 hover:text-amber-800 font-semibold"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Category
            </label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    category === cat.id
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Month Filter */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Month
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['all', 'OCT', 'NOV', 'JAN', 'AUG'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonth(m)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-center transition-colors ${
                    month === m
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {m === 'all' ? 'All Months' : m}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="price-range" className="font-bold text-slate-400 uppercase tracking-wider">
                Max Price
              </label>
              <span className="font-bold text-slate-900">
                {maxPrice >= 2000 ? 'Any Price' : formatZAR(maxPrice)}
              </span>
            </div>
            <input
              id="price-range"
              type="range"
              min={50}
              max={2000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </aside>

        {/* Results Column */}
        <section aria-label="Search Results" className="lg:col-span-9">
          {/* Results Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">
                {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
              </span>
              {query && (
                <span className="text-xs text-slate-500">
                  matching &quot;<strong className="text-slate-800">{query}</strong>&quot;
                </span>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none"
              >
                <option value="date-asc">Date: Soonest First</option>
                <option value="date-desc">Date: Furthest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Title: A to Z</option>
              </select>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  onSelectEvent={onSelectEvent}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 font-display">
                No events matched your search
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try clearing active filters or searching for artists like &quot;Appel&quot;, teams like &quot;Sundowns&quot;, or &quot;4x4&quot;.
              </p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
