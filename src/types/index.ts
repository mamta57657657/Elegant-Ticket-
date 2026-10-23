export type EventCategory =
  | 'all'
  | 'music'
  | 'soccer'
  | 'outdoor'
  | 'schools'
  | 'lifestyle';

export interface DisplayDate {
  day: string;
  month: string;
  year: string;
  time: string;
  rawDate: string; // e.g. "2026-11-06"
}

export interface TicketTier {
  id: string;
  name: string;
  price: number; // in ZAR (Rands)
  description: string;
  available: number;
  maxPerOrder: number;
  color?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: EventCategory;
  categoryLabel: string;
  date: DisplayDate;
  venue: string;
  city: string;
  province: string;
  priceFrom: number;
  bannerImage: string;
  heroBannerImage?: string;
  isFeatured?: boolean;
  status: 'on-sale' | 'almost-full' | 'sold-out';
  tags: string[];
  description: string;
  organizer: {
    name: string;
    verified: boolean;
    contact?: string;
  };
  gatesOpen: string;
  duration?: string;
  ticketTiers: TicketTier[];
  hasSeatingMap?: boolean;
}

export interface CartItem {
  cartId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  tierId: string;
  tierName: string;
  unitPrice: number;
  quantity: number;
  selectedSeats?: string[]; // e.g. ["Row B - Seat 14", "Row B - Seat 15"]
}

export interface FAQItem {
  id: string;
  category: 'tickets' | 'payments' | 'venues' | 'organizers';
  question: string;
  answer: string;
}

export interface Seat {
  id: string;
  block: string;
  row: string;
  seatNumber: number;
  tier: string;
  price: number;
  status: 'available' | 'reserved' | 'selected';
}
