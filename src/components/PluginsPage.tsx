import React, { useState } from 'react';
import { 
  Plug, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Monitor, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';

export const PluginsPage: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState(EVENTS_DATA[0].id);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const selectedEvent = EVENTS_DATA.find((e) => e.id === selectedEventId) || EVENTS_DATA[0];

  const iframeSnippet = `<!-- Open Tickets South Africa Embed Widget -->
<iframe
  src="https://opentickets.co.za/embed/${selectedEvent.slug}?theme=${themeMode}"
  width="100%"
  height="480"
  frameborder="0"
  style="border-radius: 16px; border: 1px solid #334155;"
  allow="payment"
></iframe>`;

  const shortcodeSnippet = `[opentickets event="${selectedEvent.slug}" theme="${themeMode}" button="Book Now"]`;

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="pb-16 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 mb-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
          <Plug className="w-3.5 h-3.5 text-amber-400" />
          CMS Plugins & Website Embeds
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
          Embed Ticket Booking on Any Website
        </h1>
        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
          Sell tickets directly on your WordPress, Wix, Squarespace, or custom website with responsive embeds and zero redirect friction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings & Code Generator (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Code2 className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-slate-900 text-base font-display">
              Widget Code Generator
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Select Event
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
              >
                {EVENTS_DATA.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.title} ({evt.date.day} {evt.date.month})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Widget Color Scheme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setThemeMode('dark')}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    themeMode === 'dark'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Dark Navy (Default)
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode('light')}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    themeMode === 'light'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Clean Light
                </button>
              </div>
            </div>
          </div>

          {/* HTML Embed Code */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                HTML Embed Code (Any Website)
              </span>
              <button
                type="button"
                onClick={() => handleCopy(iframeSnippet, 'iframe')}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                {copiedCode === 'iframe' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === 'iframe' ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-950 text-amber-300 text-[11px] rounded-xl overflow-x-auto font-mono">
              {iframeSnippet}
            </pre>
          </div>

          {/* WordPress Shortcode */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                WordPress Plugin Shortcode
              </span>
              <button
                type="button"
                onClick={() => handleCopy(shortcodeSnippet, 'shortcode')}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                {copiedCode === 'shortcode' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === 'shortcode' ? 'Copied!' : 'Copy Shortcode'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-950 text-amber-300 text-[11px] rounded-xl overflow-x-auto font-mono">
              {shortcodeSnippet}
            </pre>
          </div>
        </div>

        {/* Live Widget Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Live Preview on Your Website
          </span>

          <div
            className={`rounded-3xl p-6 border shadow-xl transition-all ${
              themeMode === 'dark'
                ? 'bg-[#101622] text-white border-slate-800'
                : 'bg-white text-slate-900 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  OT
                </div>
                <span className="font-bold text-xs uppercase tracking-wider font-display">
                  Open Tickets Booking Widget
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">LIVE PREVIEW</span>
            </div>

            <div className="flex gap-4 items-center">
              <img
                src={selectedEvent.bannerImage}
                alt={selectedEvent.title}
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase block">
                  {selectedEvent.date.day} {selectedEvent.date.month} {selectedEvent.date.year}
                </span>
                <h3 className="font-bold text-base font-display mt-0.5 leading-snug">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{selectedEvent.venue}</p>
                <div className="mt-2 text-xs font-bold text-amber-400">
                  Tickets from R{selectedEvent.priceFrom}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <span>Get Tickets on {selectedEvent.venue}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
