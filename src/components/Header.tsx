import React from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Globe, 
  Menu, 
  X, 
  Palette,
  Sparkles,
  Ticket
} from 'lucide-react';
import { formatZAR } from '../utils/filterLogic';

interface HeaderProps {
  isScrolled: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  currentLanguage: 'en' | 'af';
  onLanguageChange: (lang: 'en' | 'af') => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenThemeCustomizer: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isScrolled,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  currentLanguage,
  onLanguageChange,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenThemeCustomizer,
  currentPage,
  onNavigate,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#101622]/95 backdrop-blur-md py-2.5 shadow-lg shadow-black/20 border-b border-slate-800'
          : 'bg-[#101622] py-3.5 border-b border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
              aria-label="Open Tickets Home"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-600/30 group-hover:scale-105 transition-transform">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-wider text-base uppercase text-white font-display flex items-center gap-1">
                  OPEN<span className="text-amber-500">TICKETS</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase font-medium -mt-1">
                  South Africa
                </span>
              </div>
            </button>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={onSearchSubmit} className="w-full relative">
              <label htmlFor="header-search" className="sr-only">
                Search events, artists, venues...
              </label>
              <input
                id="header-search"
                type="text"
                placeholder="Search events, artists, venues (e.g. Appel, Sundowns, 4x4)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-20 py-2 rounded-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-sm border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Navigation & Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Links */}
            <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-300">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentPage === 'home'
                    ? 'text-white bg-slate-800/80 font-semibold text-amber-400'
                    : 'hover:text-white hover:bg-slate-800/40'
                }`}
              >
                Events
              </button>
              <button
                type="button"
                onClick={() => onNavigate('search')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentPage === 'search'
                    ? 'text-white bg-slate-800/80 font-semibold text-amber-400'
                    : 'hover:text-white hover:bg-slate-800/40'
                }`}
              >
                Browse & Search
              </button>
              <button
                type="button"
                onClick={() => onNavigate('faqs')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentPage === 'faqs'
                    ? 'text-white bg-slate-800/80 font-semibold text-amber-400'
                    : 'hover:text-white hover:bg-slate-800/40'
                }`}
              >
                FAQs
              </button>
            </nav>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <label htmlFor="language-select" className="sr-only">
                Select language
              </label>
              <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1.5 rounded-md border border-slate-700/60">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <select
                  id="language-select"
                  value={currentLanguage}
                  onChange={(e) => onLanguageChange(e.target.value as 'en' | 'af')}
                  className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="en" className="bg-slate-900 text-white">Language: English</option>
                  <option value="af" className="bg-slate-900 text-white">Taal: Afrikaans</option>
                </select>
              </div>
            </div>

            {/* Theme Customizer Switcher */}
            <button
              type="button"
              onClick={onOpenThemeCustomizer}
              className="p-2 rounded-md text-amber-400 hover:text-amber-300 hover:bg-slate-800/80 transition-colors flex items-center gap-1 text-xs border border-amber-500/30"
              title="Theme Customizer (CSS Variables)"
              aria-label="Theme Customizer"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Themes</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-md shadow-amber-500/20"
              aria-label={`Shopping Cart with ${cartCount} tickets`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              {cartCount > 0 && (
                <span className="hidden lg:inline text-slate-900 font-bold border-l border-amber-600 pl-2">
                  {formatZAR(cartTotal)}
                </span>
              )}
            </button>

            {/* Account Icon */}
            <button
              type="button"
              onClick={() => onNavigate('account')}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="My Account"
              aria-label="User Account"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="mt-2.5 md:hidden">
          <form onSubmit={onSearchSubmit} className="relative">
            <label htmlFor="mobile-search" className="sr-only">
              Search events
            </label>
            <input
              id="mobile-search"
              type="text"
              placeholder="Search events, venues..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-16 py-2 rounded-full bg-slate-900 text-slate-100 placeholder-slate-400 text-xs border border-slate-700 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-semibold text-[11px]"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
