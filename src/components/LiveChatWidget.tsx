import React, { useState } from 'react';
import { X, Send, MessageSquare, Headphones, Check } from 'lucide-react';

interface LiveChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Good day! Welcome to Open Tickets customer support. How can we help you today with your booking or tickets?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user' as const, text: input.trim(), time: 'Now' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: 'Thanks for reaching out! A ticket support specialist is reviewing your inquiry. For urgent event access inquiries or ticket re-sends, you can also ping us directly on WhatsApp at +27 82 000 0000.',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-slideUp">
      {/* Header */}
      <div className="p-4 bg-[#101622] text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Open Tickets Support</h4>
            <span className="text-[10px] text-emerald-400">Online • Typically replies in 2m</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 h-64 overflow-y-auto space-y-3 bg-slate-50 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 rounded-br-none font-medium'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
              }`}
            >
              <p>{m.text}</p>
              <span className="text-[9px] text-slate-400 block mt-1 text-right">
                {m.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
