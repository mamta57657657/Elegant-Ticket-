import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Ticket, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  MessageCircle,
  Mail,
  X
} from 'lucide-react';
import { FAQS_DATA } from '../data/eventsData';
import { FAQItem } from '../types';

export const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'tickets', label: 'Tickets & Gate Entry', icon: Ticket },
    { id: 'payments', label: 'Payments & Refunds', icon: CreditCard },
    { id: 'venues', label: 'Venues & Seating', icon: MapPin },
    { id: 'organizers', label: 'Organizers & Listings', icon: ShieldCheck },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchCat = selectedCategory === 'all' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pb-16 max-w-4xl mx-auto animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center py-10 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          Help & Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Everything you need to know about purchasing tickets, gate entry with mobile barcodes, refunds, and seating on Open Tickets.
        </p>

        {/* FAQ Search Bar */}
        <div className="mt-6 max-w-lg mx-auto relative">
          <input
            type="text"
            placeholder="Search questions (e.g., refund, Ozow, transfer ticket)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm border border-slate-200/90 shadow-md shadow-slate-100 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 px-4">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3 px-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-amber-600 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display">{faq.question}</span>
                  <span className="p-1.5 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-700 text-base">No matching questions found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for something else or contact our customer support team directly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-amber-600 transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>

      {/* Support Contact Callout */}
      <div className="mt-12 mx-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Still need assistance?
          </span>
          <h3 className="text-xl font-bold font-display mt-1 text-white">
            We are here to help you
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
            Our South African customer care team is available Monday to Sunday from 07:00 to 22:00.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://wa.me/27820000000"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide flex items-center gap-2 shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
          <a
            href="mailto:support@opentickets.co.za"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wide flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <Mail className="w-4 h-4 text-slate-300" />
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
};
