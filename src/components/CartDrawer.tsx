import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Tag, 
  CheckCircle2,
  Calendar,
  MapPin
} from 'lucide-react';
import { CartItem } from '../types';
import { calculateCartSummary, formatZAR } from '../utils/filterLogic';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'ozow' | 'card' | 'capitec'>('ozow');

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'OPEN10' || promoCode.trim().toUpperCase() === 'APPEL') {
      setDiscountPercent(10);
      setPromoMessage('10% discount applied!');
    } else {
      setPromoMessage('Invalid voucher code. Try "OPEN10"');
    }
  };

  const summary = calculateCartSummary(cartItems, discountPercent);

  const handleCompleteCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 3500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            <h2 id="cart-title" className="font-bold text-base font-display">
              Ticket Cart ({summary.totalTickets})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutSuccess ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Order Confirmed!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your digital barcodes have been issued and sent to your email with Instant EFT confirmation.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 font-mono">
                Booking Reference: OT-2026-98421
              </div>
            </div>
          ) : cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-900 text-sm font-display">
                        {item.eventTitle}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartId)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove ticket"
                        aria-label={`Remove ${item.tierName}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 text-xs text-amber-700 font-semibold">
                      {item.tierName}
                    </div>

                    {item.selectedSeats && item.selectedSeats.length > 0 && (
                      <div className="mt-1 text-[11px] text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 inline-block font-mono">
                        Seats: {item.selectedSeats.join(', ')}
                      </div>
                    )}

                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.eventDate}
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="w-6 h-6 rounded bg-white border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-bold text-xs text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="w-6 h-6 rounded bg-amber-500 text-slate-950 flex items-center justify-center hover:bg-amber-400 font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 font-display">
                        {formatZAR(item.unitPrice * item.quantity)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        ({formatZAR(item.unitPrice)} each)
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo code box */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. OPEN10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 uppercase tracking-wider focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] mt-1.5 font-medium ${
                      discountPercent > 0 ? 'text-emerald-600' : 'text-amber-700'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </form>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Preferred Payment:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ozow')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'ozow'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-xs font-bold">⚡ Ozow EFT</span>
                    <span className="text-[9px] text-slate-500 block">Zero clearance fee</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-xs font-bold">💳 Card</span>
                    <span className="text-[9px] text-slate-500 block">3D Secure</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('capitec')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'capitec'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-xs font-bold">📱 Capitec Pay</span>
                    <span className="text-[9px] text-slate-500 block">Instant App</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-20 text-center space-y-3">
              <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base font-display">
                Your cart is currently empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our upcoming events or choose seats on the interactive map to book tickets.
              </p>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && !checkoutSuccess && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">{formatZAR(summary.subtotal)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher Discount (10%):</span>
                  <span>-{formatZAR(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Ticketing Service Fee:</span>
                <span>{formatZAR(summary.bookingFee)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-950 font-display">
                <span>Grand Total:</span>
                <span className="text-xl text-amber-600">{formatZAR(summary.finalTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompleteCheckout}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Pay with {paymentMethod === 'ozow' ? 'Ozow EFT' : paymentMethod === 'capitec' ? 'Capitec Pay' : 'Debit/Credit Card'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Official Open Tickets checkout • Encrypted SSL connection</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
