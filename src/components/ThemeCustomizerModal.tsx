import React, { useState } from 'react';
import { X, Check, Copy, Palette, Sparkles, Code2 } from 'lucide-react';

interface ThemePreset {
  id: string;
  name: string;
  description: string;
  primary: string;
  primaryHover: string;
  headerBg: string;
  badgeBg: string;
}

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const presets: ThemePreset[] = [
    {
      id: 'default',
      name: 'Open Tickets Signature Orange & Dark Navy',
      description: 'The authentic visual style matching current brand and screenshot artwork.',
      primary: '#ea580c',
      primaryHover: '#c2410c',
      headerBg: '#101622',
      badgeBg: '#fff7ed',
    },
    {
      id: 'gold-navy',
      name: 'Heritage Gold & Sovereign Navy',
      description: 'Refined metallic gold accent for prestige VIP concerts and galas.',
      primary: '#d97706',
      primaryHover: '#b45309',
      headerBg: '#0f172a',
      badgeBg: '#fffbeb',
    },
    {
      id: 'boardwalk-blue',
      name: 'Boardwalk Coastal Sapphire',
      description: 'Ocean-inspired coastal blue inspired by Boardwalk Hotel & Casino PE.',
      primary: '#0284c7',
      primaryHover: '#0369a1',
      headerBg: '#0b1320',
      badgeBg: '#f0f9ff',
    },
    {
      id: 'emerald-stage',
      name: 'Emerald Stadium & Turf',
      description: 'Deep sporting green tailored for PSL soccer and outdoor festival derbies.',
      primary: '#059669',
      primaryHover: '#047857',
      headerBg: '#061a14',
      badgeBg: '#ecfdf5',
    },
  ];

  const currentPreset = presets.find((p) => p.id === currentTheme) || presets[0];

  const cssCode = `:root {
  /* Open Tickets Theme Variables */
  --ot-primary: ${currentPreset.primary};
  --ot-primary-hover: ${currentPreset.primaryHover};
  --ot-dark-header: ${currentPreset.headerBg};
  --ot-font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --ot-font-display: 'Space Grotesk', system-ui, sans-serif;
  --ot-radius-card: 0.75rem;
}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-modal-title"
    >
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 id="theme-modal-title" className="text-lg font-bold font-display text-white">
                Theme Variables & Color Styles
              </h2>
              <p className="text-xs text-slate-400">
                Easily retheme Open Tickets via CSS variables for developers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Select Preset Palette
            </label>
            <div className="space-y-2.5">
              {presets.map((preset) => {
                const isSelected = currentTheme === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSelectTheme(preset.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-amber-500 bg-slate-800/90 ring-2 ring-amber-500/20'
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border border-white/20 shadow-md shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: preset.primary }}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{preset.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{preset.description}</p>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 shrink-0">
                      {preset.primary}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CSS Code Snippet */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-amber-400" />
                Drop-in Theme CSS Variables
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard!' : 'Copy CSS'}
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300/90 overflow-x-auto">
              {cssCode}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
