import React from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Music, 
  Trophy, 
  Compass, 
  GraduationCap, 
  Sparkles, 
  RotateCcw,
  LayoutGrid,
  List
} from 'lucide-react';
import { EventCategory } from '../types';
import { SortOption } from '../utils/filterLogic';

interface IsotopeFilterBarProps {
  selectedCategory: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalFilteredCount: number;
  totalEventsCount: number;
  onResetFilters: () => void;
  viewMode: 'grid' | 'list';
  onToggleViewMode: (mode: 'grid' | 'list') => void;
}

export const IsotopeFilterBar: React.FC<IsotopeFilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedMonth,
  onMonthChange,
  sortBy,
  onSortChange,
  totalFilteredCount,
  totalEventsCount,
  onResetFilters,
  viewMode,
  onToggleViewMode,
}) => {
  const categories: { id: EventCategory | 'all'; label: string; icon?: React.ElementType }[] = [
    { id: 'all', label: 'All Events' },
    { id: 'music', label: 'Music & Concerts', icon: Music },
    { id: 'soccer', label: 'Soccer & PSL', icon: Trophy },
    { id: 'outdoor', label: 'Outdoor & 4x4', icon: Compass },
    { id: 'schools', label: 'Schools & Youth', icon: GraduationCap },
    { id: 'lifestyle', label: 'Expo & Lifestyle', icon: Sparkles },
  ];

  const months = [
    { id: 'all', label: 'All Dates' },
    { id: 'OCT', label: 'October' },
    { id: 'NOV', label: 'November' },
    { id: 'JAN', label: 'January' },
    { id: 'AUG', label: 'August' },
  ];

  const isFiltered = selectedCategory !== 'all' || selectedMonth !== 'all' || sortBy !== 'date-asc';

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 mb-8 transition-all">
      {/* Top Header: Title & Counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Events
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
              {totalFilteredCount} of {totalEventsCount}
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden md:inline">
            Official verified South African tickets
          </span>
        </div>

        {/* Right tools: Sort & View Toggle */}
        <div className="flex items-center gap-2.5">
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-amber-600 hover:text-amber-800 font-semibold flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-amber-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <label htmlFor="sort-select" className="sr-only">
              Sort events by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="date-asc">Date: Soonest First</option>
              <option value="date-desc">Date: Furthest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View (3 Columns)"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Category Isotope Filter Pills */}
      <div className="mt-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
              aria-pressed={isActive}
            >
              {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Month Fast Filter Row */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3 text-slate-400" />
          Filter by Month:
        </span>
        {months.map((m) => {
          const isMonthActive = selectedMonth === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onMonthChange(m.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isMonthActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
