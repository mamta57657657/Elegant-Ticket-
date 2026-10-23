import React from 'react';
import { 
  Headphones, 
  HelpCircle, 
  Plug, 
  ChevronRight, 
  MessageSquare, 
  Globe, 
  Ticket,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  currentLanguage: 'en' | 'af';
  onLanguageChange: (lang: 'en' | 'af') => void;
  onNavigate: (page: string) => void;
  onOpenLiveChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onLanguageChange,
  onNavigate,
  onOpenLiveChat,
}) => {
  return (
    <footer className="bg-[#101622] text-slate-300 pt-16 pb-12 border-t border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Get In Touch */}
          <div>
            <h4 className="text-white text-base font-bold font-display tracking-tight mb-4">
              Get In Touch
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Open Tickets is South Africa’s premier event ticketing and access control partner. Connect with our team or get live event support.
            </p>
            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Open Tickets on Instagram"
              >
                <span className="text-xs font-bold font-mono">ig</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Open Tickets on LinkedIn"
              >
                <span className="text-xs font-bold font-mono">in</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Open Tickets on Facebook"
              >
                <span className="text-xs font-bold font-mono">fb</span>
              </a>
              <a
                href="https://wa.me/27820000000"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Open Tickets WhatsApp"
              >
                <span className="text-xs font-bold font-mono">wa</span>
              </a>
            </div>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="text-white text-base font-bold font-display tracking-tight mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('support')}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Headphones className="w-3.5 h-3.5 text-slate-500" />
                  <span>Support Center</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('plugins')}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Plug className="w-3.5 h-3.5 text-slate-500" />
                  <span>CMS Plugins & WordPress Embeds</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faqs')}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>FAQs & Helpdesk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-white text-base font-bold font-display tracking-tight mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pages')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pages')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Terms and Conditions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('customers')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Event Organizer Agreement</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Language */}
          <div>
            <h4 className="text-white text-base font-bold font-display tracking-tight mb-4">
              Language
            </h4>
            <div className="inline-block relative">
              <label htmlFor="footer-language" className="sr-only">
                Language
              </label>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                <Globe className="w-4 h-4 text-slate-400" />
                <select
                  id="footer-language"
                  value={currentLanguage}
                  onChange={(e) => onLanguageChange(e.target.value as 'en' | 'af')}
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-4"
                >
                  <option value="en" className="bg-slate-900">English</option>
                  <option value="af" className="bg-slate-900">Afrikaans</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Ticket className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-400">
                Official Ticketing Provider • South Africa
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024–2026 - Open Tickets - All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Payments powered by Ozow & PayFast</span>
            <span>•</span>
            <span>Verified 256-Bit SSL</span>
          </div>
        </div>
      </div>

      {/* Floating Chat Widget Button at Bottom Right (from screenshot) */}
      <button
        type="button"
        onClick={onOpenLiveChat}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400/40"
        title="Open Live Chat Support"
        aria-label="Open Live Chat Support"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    </footer>
  );
};
