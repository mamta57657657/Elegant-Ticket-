/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroCarousel } from './components/HeroCarousel';
import { IsotopeFilterBar } from './components/IsotopeFilterBar';
import { EventCard } from './components/EventCard';
import { EventDetailPage } from './components/EventDetailPage';
import { FaqPage } from './components/FaqPage';
import { SearchResultsPage } from './components/SearchResultsPage';
import { SeatingMapModal } from './components/SeatingMapModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';

// Extra Dedicated Pages for Fully Working Sections
import { AccountPage } from './components/AccountPage';
import { SupportPage } from './components/SupportPage';
import { ContentPagesPage } from './components/ContentPagesPage';
import { OrganizerPortalPage } from './components/OrganizerPortalPage';
import { PluginsPage } from './components/PluginsPage';
import { TicketBarcodeModal, PurchasedTicket } from './components/TicketBarcodeModal';

import { EVENTS_DATA } from './data/eventsData';
import { EventItem, EventCategory, TicketTier, CartItem, Seat } from './types';
import { filterEvents, sortEvents, SortOption } from './utils/filterLogic';
import { TRANSLATIONS, SupportedLanguage } from './utils/translations';

export default function App() {
  // Navigation State supporting all sidebar & footer sections
  const [currentPage, setCurrentPage] = useState<
    'home' | 'faqs' | 'detail' | 'search' | 'account' | 'support' | 'pages' | 'customers' | 'plugins'
  >('home');

  const [selectedEvent, setSelectedEvent] = useState<EventItem>(EVENTS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Isotope Filtering State
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals & Drawers
  const [seatingMapOpen, setSeatingMapOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Digital Ticket Barcode Modal
  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);
  const [selectedBarcodeTicket, setSelectedBarcodeTicket] = useState<PurchasedTicket | null>(null);

  // Theme & Language
  const [currentTheme, setCurrentTheme] = useState<string>('default');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  // Purchased Tickets in Buyer Wallet
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([
    {
      ticketId: 'tkt-appel-1',
      bookingRef: 'OT-2026-98421-A',
      eventId: 'appel-in-pe-2026',
      eventTitle: 'Appel in PE - Soos Net Hy Kan',
      venue: 'Boardwalk Hotel and Casino, Gqeberha',
      date: '06 Nov 2026',
      time: '21:00 (Gates 18:00)',
      tierName: 'Golden Circle (Reg voor die verhoog)',
      seatLabel: 'Row A - Seat 7',
      buyerName: 'Pieter de Villiers',
      price: 290,
      qrData: 'OT-SECURE-APPEL-98421-A7',
      status: 'valid',
    },
    {
      ticketId: 'tkt-appel-2',
      bookingRef: 'OT-2026-98421-B',
      eventId: 'appel-in-pe-2026',
      eventTitle: 'Appel in PE - Soos Net Hy Kan',
      venue: 'Boardwalk Hotel and Casino, Gqeberha',
      date: '06 Nov 2026',
      time: '21:00 (Gates 18:00)',
      tierName: 'Golden Circle (Reg voor die verhoog)',
      seatLabel: 'Row A - Seat 8',
      buyerName: 'Pieter de Villiers',
      price: 290,
      qrData: 'OT-SECURE-APPEL-98421-A8',
      status: 'valid',
    },
    {
      ticketId: 'tkt-sundowns-1',
      bookingRef: 'OT-2026-88124',
      eventId: 'sundowns-wiliete',
      eventTitle: 'Mamelodi Sundowns vs Wiliete Sport Club',
      venue: 'Loftus Versfeld Stadium, Pretoria',
      date: '23 Oct 2026',
      time: '20:00 (Gates 17:00)',
      tierName: 'East Grandstand',
      seatLabel: 'Block E - Row 12',
      buyerName: 'Pieter de Villiers',
      price: 120,
      qrData: 'OT-SECURE-SUN-88124',
      status: 'valid',
    },
  ]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartId: 'cart-init-1',
      eventId: 'appel-in-pe-2026',
      eventTitle: 'Appel in PE - Soos Net Hy Kan',
      eventDate: '06 Nov 2026, 21:00',
      eventVenue: 'Boardwalk Hotel & Casino',
      tierId: 'tier-golden-circle',
      tierName: 'Golden Circle (Reg voor die verhoog)',
      unitPrice: 290,
      quantity: 2,
      selectedSeats: ['Row A - Seat 7', 'Row A - Seat 8'],
    },
  ]);

  // Header shrink on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme attribute application
  useEffect(() => {
    if (currentTheme === 'default') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);

  // Filtered Events for Home Page
  const filteredEvents = useMemo(() => {
    const list = filterEvents(EVENTS_DATA, {
      category: selectedCategory,
      month: selectedMonth,
      searchQuery: '',
    });
    return sortEvents(list, sortBy);
  }, [selectedCategory, selectedMonth, sortBy]);

  // Featured Events for Hero Carousel
  const featuredEvents = useMemo(() => {
    return EVENTS_DATA.filter((e) => e.isFeatured);
  }, []);

  // Navigation handler
  const handleNavigate = (page: string) => {
    const allowed = [
      'home',
      'faqs',
      'search',
      'detail',
      'account',
      'support',
      'pages',
      'customers',
      'plugins',
    ];
    if (allowed.includes(page)) {
      setCurrentPage(page as any);
    } else {
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('search');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedMonth('all');
    setSortBy('date-asc');
  };

  // Cart operations
  const handleAddToCart = (tier: TicketTier, quantity: number, selectedSeats?: string[]) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.eventId === selectedEvent.id && item.tierId === tier.id
    );

    if (existingIndex > -1 && (!selectedSeats || selectedSeats.length === 0)) {
      setCartItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      const newItem: CartItem = {
        cartId: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventDate: `${selectedEvent.date.day} ${selectedEvent.date.month} ${selectedEvent.date.year}`,
        eventVenue: selectedEvent.venue,
        tierId: tier.id,
        tierName: tier.name,
        unitPrice: tier.price,
        quantity,
        selectedSeats,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    setCartOpen(true);
  };

  const handleConfirmSeatingMap = (seats: Seat[]) => {
    if (seats.length === 0) return;
    const tierMap: Record<string, { tierId: string; tierName: string; price: number; seats: string[] }> = {};

    seats.forEach((seat) => {
      if (!tierMap[seat.tier]) {
        tierMap[seat.tier] = {
          tierId: seat.block,
          tierName: `${seat.tier} (${seat.block})`,
          price: seat.price,
          seats: [],
        };
      }
      tierMap[seat.tier].seats.push(`${seat.row}${seat.seatNumber}`);
    });

    Object.values(tierMap).forEach((group) => {
      const newItem: CartItem = {
        cartId: `seat-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventDate: `${selectedEvent.date.day} ${selectedEvent.date.month} ${selectedEvent.date.year}`,
        eventVenue: selectedEvent.venue,
        tierId: group.tierId,
        tierName: group.tierName,
        unitPrice: group.price,
        quantity: group.seats.length,
        selectedSeats: group.seats,
      };
      setCartItems((prev) => [...prev, newItem]);
    });

    setCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Convert cart to purchased tickets on checkout
  const handleClearCartOnCheckout = () => {
    if (cartItems.length > 0) {
      const newPurchases: PurchasedTicket[] = cartItems.map((item, idx) => ({
        ticketId: `tkt-new-${Date.now()}-${idx}`,
        bookingRef: `OT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        eventId: item.eventId,
        eventTitle: item.eventTitle,
        venue: item.eventVenue,
        date: item.eventDate,
        time: 'Show: 20:00 (Gates open 2h prior)',
        tierName: item.tierName,
        seatLabel: item.selectedSeats ? item.selectedSeats.join(', ') : undefined,
        buyerName: 'Pieter de Villiers',
        price: item.unitPrice * item.quantity,
        qrData: `OT-PASS-${Date.now()}-${idx}`,
        status: 'valid',
      }));

      setPurchasedTickets((prev) => [...newPurchases, ...prev]);
    }
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Fixed Shrink-on-scroll Top Header */}
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        cartCount={totalCartCount}
        cartTotal={totalCartValue}
        onOpenCart={() => setCartOpen(true)}
        onOpenThemeCustomizer={() => setThemeModalOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main App Container with Left Sidebar */}
      <div className="flex-1 pt-18 lg:pt-20 flex">
        {/* Left Vertical Sidebar (Desktop fixed, Mobile drawer) */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Content Canvas (offset by sidebar width on lg screens) */}
        <main className="flex-1 min-w-0 lg:pl-20 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {/* View 1: Home Page */}
          {currentPage === 'home' && (
            <div className="animate-fadeIn">
              {/* Above the fold dominant hero carousel (Appel + Steve Hofmeyr) */}
              <HeroCarousel
                featuredEvents={featuredEvents}
                onSelectEvent={handleSelectEvent}
                onOpenSeatingMap={(evt) => {
                  setSelectedEvent(evt);
                  setSeatingMapOpen(true);
                }}
              />

              {/* Isotope Filter Bar */}
              <IsotopeFilterBar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
                sortBy={sortBy}
                onSortChange={setSortBy}
                totalFilteredCount={filteredEvents.length}
                totalEventsCount={EVENTS_DATA.length}
                onResetFilters={handleResetFilters}
                viewMode={viewMode}
                onToggleViewMode={setViewMode}
              />

              {/* Events Listing: 3-column grid matching reference screenshot */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 isotope-grid">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelectEvent={handleSelectEvent}
                    />
                  ))}
                </div>
              ) : (
                /* List View alternative */
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleSelectEvent(event)}
                      className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-amber-500 shadow-xs hover:shadow-lg transition-all flex flex-col sm:flex-row items-center gap-4 cursor-pointer"
                    >
                      <img
                        src={event.bannerImage}
                        alt={event.title}
                        className="w-full sm:w-48 aspect-[16/9] object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#ea580c]">
                            {event.date.day} {event.date.month} {event.date.year}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{event.date.time}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base font-display">
                          {event.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{event.venue}, {event.city}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-slate-500 block">From</span>
                        <strong className="text-lg font-bold text-slate-900 font-display">
                          R{event.priceFrom}
                        </strong>
                        <button
                          type="button"
                          className="mt-2 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase block"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* View 2: Event Detail Page */}
          {currentPage === 'detail' && (
            <EventDetailPage
              event={selectedEvent}
              onBack={() => handleNavigate('home')}
              onOpenSeatingMap={(evt) => {
                setSelectedEvent(evt);
                setSeatingMapOpen(true);
              }}
              onAddToCart={handleAddToCart}
              onSelectRelatedEvent={handleSelectEvent}
              relatedEvents={EVENTS_DATA.filter((e) => e.id !== selectedEvent.id && e.category === selectedEvent.category)}
            />
          )}

          {/* View 3: FAQs Page */}
          {currentPage === 'faqs' && <FaqPage />}

          {/* View 4: Search Results Page */}
          {currentPage === 'search' && (
            <SearchResultsPage
              initialQuery={searchQuery}
              events={EVENTS_DATA}
              onSelectEvent={handleSelectEvent}
              onClearToHome={() => handleNavigate('home')}
            />
          )}

          {/* View 5: My Account & Digital Tickets Portal */}
          {currentPage === 'account' && (
            <AccountPage
              purchasedTickets={purchasedTickets}
              onOpenTicketBarcode={(ticket) => {
                setSelectedBarcodeTicket(ticket);
                setBarcodeModalOpen(true);
              }}
              onNavigateHome={() => handleNavigate('home')}
            />
          )}

          {/* View 6: Support & Helpdesk */}
          {currentPage === 'support' && <SupportPage />}

          {/* View 7: Content Pages & Guides */}
          {currentPage === 'pages' && <ContentPagesPage onNavigate={handleNavigate} />}

          {/* View 8: Customers / Event Organizers Portal */}
          {currentPage === 'customers' && <OrganizerPortalPage />}

          {/* View 9: CMS & WordPress Plugins */}
          {currentPage === 'plugins' && <PluginsPage />}
        </main>
      </div>

      {/* Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onNavigate={handleNavigate}
        onOpenLiveChat={() => setLiveChatOpen(true)}
      />

      {/* Interactive Seating Map Modal (for Appel in PE & seated events) */}
      <SeatingMapModal
        event={selectedEvent}
        isOpen={seatingMapOpen}
        onClose={() => setSeatingMapOpen(false)}
        onConfirmSeats={handleConfirmSeatingMap}
      />

      {/* Digital Barcode Pass Modal */}
      <TicketBarcodeModal
        ticket={selectedBarcodeTicket}
        isOpen={barcodeModalOpen}
        onClose={() => setBarcodeModalOpen(false)}
        onTransferSuccess={(ticketId, recipientEmail) => {
          setPurchasedTickets((prev) =>
            prev.map((t) => (t.ticketId === ticketId ? { ...t, status: 'transferred' } : t))
          );
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCartOnCheckout}
      />

      {/* Theme Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Live Chat Support Widget */}
      <LiveChatWidget
        isOpen={liveChatOpen}
        onClose={() => setLiveChatOpen(false)}
      />
    </div>
  );
}
