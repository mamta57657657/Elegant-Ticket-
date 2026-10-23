import { Seat } from '../types';

export interface SeatingBlock {
  id: string;
  name: string;
  tier: string;
  price: number;
  color: string;
  seats: Seat[];
}

export function generateAppelSeatingData(): SeatingBlock[] {
  const blocks: SeatingBlock[] = [];

  // 1. Golden Circle Pit (Standing or Premium Front Rows)
  const goldenCircleSeats: Seat[] = [];
  const gcRows = ['A', 'B', 'C'];
  gcRows.forEach((row) => {
    for (let i = 1; i <= 14; i++) {
      const isReserved = (row === 'A' && (i === 4 || i === 5 || i === 11)) || (row === 'B' && i === 7);
      goldenCircleSeats.push({
        id: `GC-${row}-${i}`,
        block: 'Golden Circle',
        row,
        seatNumber: i,
        tier: 'Golden Circle',
        price: 290,
        status: isReserved ? 'reserved' : 'available',
      });
    }
  });

  blocks.push({
    id: 'block-golden-circle',
    name: 'Golden Circle (Front Stage)',
    tier: 'Golden Circle',
    price: 290,
    color: '#f59e0b',
    seats: goldenCircleSeats,
  });

  // 2. Main Arena Block A (Center Seated)
  const blockASeats: Seat[] = [];
  const rowsA = ['D', 'E', 'F', 'G'];
  rowsA.forEach((row) => {
    for (let i = 1; i <= 16; i++) {
      const isReserved = (row === 'D' && i > 5 && i < 10) || (row === 'F' && i % 4 === 0);
      blockASeats.push({
        id: `BLKA-${row}-${i}`,
        block: 'Block A (Center)',
        row,
        seatNumber: i,
        tier: 'VIP Seated',
        price: 450,
        status: isReserved ? 'reserved' : 'available',
      });
    }
  });

  blocks.push({
    id: 'block-center',
    name: 'Block A (Center Prime)',
    tier: 'VIP Seated',
    price: 450,
    color: '#8b5cf6',
    seats: blockASeats,
  });

  // 3. Left Wing Block B
  const blockBSeats: Seat[] = [];
  const rowsB = ['D', 'E', 'F', 'G'];
  rowsB.forEach((row) => {
    for (let i = 1; i <= 10; i++) {
      const isReserved = (row === 'E' && i === 3) || (row === 'G' && i > 7);
      blockBSeats.push({
        id: `BLKB-${row}-${i}`,
        block: 'Block B (Left Wing)',
        row,
        seatNumber: i,
        tier: 'Algemene Toegang',
        price: 180,
        status: isReserved ? 'reserved' : 'available',
      });
    }
  });

  blocks.push({
    id: 'block-left',
    name: 'Block B (Left Wing)',
    tier: 'Algemene Toegang',
    price: 180,
    color: '#3b82f6',
    seats: blockBSeats,
  });

  // 4. Right Wing Block C
  const blockCSeats: Seat[] = [];
  const rowsC = ['D', 'E', 'F', 'G'];
  rowsC.forEach((row) => {
    for (let i = 1; i <= 10; i++) {
      const isReserved = (row === 'D' && i === 8) || (row === 'F' && i === 2);
      blockCSeats.push({
        id: `BLKC-${row}-${i}`,
        block: 'Block C (Right Wing)',
        row,
        seatNumber: i,
        tier: 'Algemene Toegang',
        price: 180,
        status: isReserved ? 'reserved' : 'available',
      });
    }
  });

  blocks.push({
    id: 'block-right',
    name: 'Block C (Right Wing)',
    tier: 'Algemene Toegang',
    price: 180,
    color: '#3b82f6',
    seats: blockCSeats,
  });

  return blocks;
}
