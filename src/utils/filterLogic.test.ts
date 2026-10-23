import test from 'node:test';
import assert from 'node:assert/strict';
import { filterEvents, sortEvents, formatZAR, calculateCartSummary } from './filterLogic';
import { EventItem } from '../types';

const mockEvents: EventItem[] = [
  {
    id: 'appel-pe',
    slug: 'appel-pe',
    title: 'Appel in PE - Soos Net Hy Kan',
    category: 'music',
    categoryLabel: 'Music & Concerts',
    date: { day: '06', month: 'NOV', year: '2026', time: '21:00', rawDate: '2026-11-06' },
    venue: 'Boardwalk Hotel and Casino',
    city: 'Gqeberha (Port Elizabeth)',
    province: 'Eastern Cape',
    priceFrom: 180,
    bannerImage: '/assets/events/appel.jpg',
    status: 'on-sale',
    tags: ['Appel', 'Afrikaans', 'Live Music'],
    description: 'Appel live at the Boardwalk Hotel & Casino',
    organizer: { name: 'Afrikaans Op Toer', verified: true },
    gatesOpen: '18:00',
    ticketTiers: [],
  },
  {
    id: 'sundowns-wiliete',
    slug: 'sundowns-wiliete',
    title: 'Mamelodi Sundowns vs. Wiliete Sport Club (Angola)',
    category: 'soccer',
    categoryLabel: 'Soccer & PSL',
    date: { day: '23', month: 'OCT', year: '2026', time: '20:00', rawDate: '2026-10-23' },
    venue: 'Loftus Versfeld Stadium',
    city: 'Pretoria',
    province: 'Gauteng',
    priceFrom: 60,
    bannerImage: '/assets/events/sundowns.jpg',
    status: 'on-sale',
    tags: ['PSL', 'CAF', 'Soccer', 'Sundowns'],
    description: 'Continental clash at Loftus Versfeld Stadium',
    organizer: { name: 'Mamelodi Sundowns FC', verified: true },
    gatesOpen: '17:00',
    ticketTiers: [],
  },
  {
    id: 'sa-4x4-show',
    slug: 'sa-4x4-show',
    title: 'The SA 4X4 and Outdoor Show SAT',
    category: 'outdoor',
    categoryLabel: 'Outdoor & 4x4',
    date: { day: '24', month: 'OCT', year: '2026', time: '09:00', rawDate: '2026-10-24' },
    venue: 'Sandringham Farm',
    city: 'Stellenbosch',
    province: 'Western Cape',
    priceFrom: 120,
    bannerImage: '/assets/events/4x4.jpg',
    status: 'on-sale',
    tags: ['4x4', 'Outdoor', 'Camping', 'Expo'],
    description: 'The biggest outdoor exhibition in Western Cape',
    organizer: { name: 'SA 4x4 Expo', verified: true },
    gatesOpen: '08:30',
    ticketTiers: [],
  },
];

test('filterEvents filters by category', () => {
  const musicOnly = filterEvents(mockEvents, { category: 'music' });
  assert.equal(musicOnly.length, 1);
  assert.equal(musicOnly[0].id, 'appel-pe');

  const soccerOnly = filterEvents(mockEvents, { category: 'soccer' });
  assert.equal(soccerOnly.length, 1);
  assert.equal(soccerOnly[0].id, 'sundowns-wiliete');
});

test('filterEvents filters by search query across title, venue, and tags', () => {
  const queryResult = filterEvents(mockEvents, { searchQuery: 'Loftus' });
  assert.equal(queryResult.length, 1);
  assert.equal(queryResult[0].venue, 'Loftus Versfeld Stadium');

  const tagResult = filterEvents(mockEvents, { searchQuery: 'Camping' });
  assert.equal(tagResult.length, 1);
  assert.equal(tagResult[0].id, 'sa-4x4-show');
});

test('filterEvents filters by month', () => {
  const octEvents = filterEvents(mockEvents, { month: 'OCT' });
  assert.equal(octEvents.length, 2);

  const novEvents = filterEvents(mockEvents, { month: 'NOV' });
  assert.equal(novEvents.length, 1);
  assert.equal(novEvents[0].id, 'appel-pe');
});

test('sortEvents sorts by price and date', () => {
  const priceAsc = sortEvents(mockEvents, 'price-asc');
  assert.equal(priceAsc[0].priceFrom, 60);
  assert.equal(priceAsc[2].priceFrom, 180);

  const dateAsc = sortEvents(mockEvents, 'date-asc');
  assert.equal(dateAsc[0].id, 'sundowns-wiliete'); // 23 Oct
  assert.equal(dateAsc[2].id, 'appel-pe'); // 06 Nov
});

test('formatZAR formats South African currency correctly', () => {
  assert.equal(formatZAR(150), 'R150');
  assert.equal(formatZAR(180.5), 'R180.50');
});

test('calculateCartSummary computes totals and booking fees', () => {
  const cart = [
    {
      cartId: 'c1',
      eventId: 'appel-pe',
      eventTitle: 'Appel in PE',
      eventDate: '06 Nov 2026',
      eventVenue: 'Boardwalk',
      tierId: 't1',
      tierName: 'General Admission',
      unitPrice: 180,
      quantity: 2,
    },
  ];

  const summary = calculateCartSummary(cart, 0);
  assert.equal(summary.subtotal, 360);
  assert.equal(summary.totalTickets, 2);
  assert.equal(summary.bookingFee, 10);
  assert.equal(summary.finalTotal, 370);
});
