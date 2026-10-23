import { EventCategory, EventItem, CartItem } from '../types';

export interface FilterOptions {
  category?: EventCategory | 'all';
  searchQuery?: string;
  month?: string; // 'all' or 'OCT', 'NOV', 'JAN', etc.
  status?: string;
  maxPrice?: number;
}

export type SortOption = 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc' | 'title-asc';

/**
 * Pure filter logic for Isotope-style filtering on OpenTickets
 */
export function filterEvents(events: EventItem[], options: FilterOptions): EventItem[] {
  const { category = 'all', searchQuery = '', month = 'all', status = 'all', maxPrice } = options;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  return events.filter((event) => {
    // Category match
    if (category !== 'all' && event.category !== category) {
      return false;
    }

    // Month match
    if (month !== 'all' && event.date.month.toUpperCase() !== month.toUpperCase()) {
      return false;
    }

    // Status match
    if (status !== 'all' && event.status !== status) {
      return false;
    }

    // Price match
    if (maxPrice !== undefined && event.priceFrom > maxPrice) {
      return false;
    }

    // Search query match across title, venue, city, tags, organizer
    if (normalizedQuery) {
      const matchTitle = event.title.toLowerCase().includes(normalizedQuery);
      const matchVenue = event.venue.toLowerCase().includes(normalizedQuery);
      const matchCity = event.city.toLowerCase().includes(normalizedQuery);
      const matchTag = event.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
      const matchOrganizer = event.organizer.name.toLowerCase().includes(normalizedQuery);

      if (!matchTitle && !matchVenue && !matchCity && !matchTag && !matchOrganizer) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort events by date, price, or title
 */
export function sortEvents(events: EventItem[], sortBy: SortOption): EventItem[] {
  const cloned = [...events];

  switch (sortBy) {
    case 'date-asc':
      return cloned.sort((a, b) => {
        const timeA = new Date(`${a.date.rawDate}T${a.date.time}:00`).getTime();
        const timeB = new Date(`${b.date.rawDate}T${b.date.time}:00`).getTime();
        return timeA - timeB;
      });

    case 'date-desc':
      return cloned.sort((a, b) => {
        const timeA = new Date(`${a.date.rawDate}T${a.date.time}:00`).getTime();
        const timeB = new Date(`${b.date.rawDate}T${b.date.time}:00`).getTime();
        return timeB - timeA;
      });

    case 'price-asc':
      return cloned.sort((a, b) => a.priceFrom - b.priceFrom);

    case 'price-desc':
      return cloned.sort((a, b) => b.priceFrom - a.priceFrom);

    case 'title-asc':
      return cloned.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return cloned;
  }
}

/**
 * Format South African Rand currency
 */
export function formatZAR(amount: number): string {
  if (Number.isInteger(amount)) {
    return `R${amount}`;
  }
  return `R${amount.toFixed(2)}`;
}

/**
 * Calculate cart subtotal, booking fees, and total in ZAR
 */
export function calculateCartSummary(cartItems: CartItem[], promoDiscountPercent: number = 0) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalTickets = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Small standard service fee per ticket (e.g. R5 per ticket, max R25) or 0 if empty
  const bookingFee = totalTickets > 0 ? Math.min(totalTickets * 5, 25) : 0;
  const discount = Math.round((subtotal * promoDiscountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discount + bookingFee);

  return {
    subtotal,
    totalTickets,
    bookingFee,
    discount,
    finalTotal,
  };
}
