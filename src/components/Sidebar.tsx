import React from 'react';
import {
  CalendarDays,
  HelpCircle,
  Headphones,
  User,
  Layers,
  Users,
  Search,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const mainNavItems = [
    {
      id: 'home',
      label: 'Events',
      icon: CalendarDays,
      badge: '24',
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
    },
    {
      id: 'faqs',
      label: 'FAQs',
      icon: HelpCircle,
    },
    {
      id: 'support',
      label: 'Support',
      icon: Headphones,
    },
    {
      id: 'account',
      label: 'My Account',
      icon: User,
    },
  ];

  const contentItems = [
    {
      id: 'pages',
      label: 'Pages',
      icon: Layers,
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
    },
  ];

  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-20 bg-[#101622] border-r border-slate-800 flex flex-col items-center py-6 select-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 w-64 items-start px-4 z-50' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top spacer below header */}
        <div className="h-14 hidden lg:block" />

        {/* Mobile Header when open */}
        {isOpen && (
          <div className="lg:hidden w-full pb-4 mb-4 border-b border-slate-800 flex items-center justify-between">
            <span className="font-display font-bold text-white text-base tracking-wide">
              MENU
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 text-sm font-semibold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Nav Items */}
        <div className="w-full flex flex-col gap-1.5 flex-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full group flex flex-col items-center justify-center p-2 rounded-xl transition-all relative ${
                  isOpen ? '!flex-row !justify-start !px-3 !py-2.5 gap-3' : ''
                } ${
                  isActive
                    ? 'bg-slate-800/90 text-amber-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                title={item.label}
              >
                {isActive && (
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-500 rounded-r ${
                      isOpen ? 'left-0' : 'left-0'
                    }`}
                  />
                )}
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-amber-400' : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-[11px] font-medium tracking-tight mt-1 transition-colors ${
                    isOpen ? '!mt-0 !text-sm' : ''
                  } ${isActive ? 'text-white font-semibold' : ''}`}
                >
                  {item.label}
                </span>

                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700 ${
                      isOpen ? 'ml-auto' : 'hidden'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Section Divider */}
          <div className="w-full my-4 px-2">
            <div className="h-px bg-slate-800 w-full" />
            <span
              className={`text-[9px] uppercase tracking-wider text-slate-500 font-semibold block text-center mt-2 ${
                isOpen ? '!text-left px-2' : ''
              }`}
            >
              Content
            </span>
          </div>

          {/* Content Submenu */}
          {contentItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full group flex flex-col items-center justify-center p-2 rounded-xl transition-all relative ${
                  isOpen ? '!flex-row !justify-start !px-3 !py-2.5 gap-3' : ''
                } ${
                  isActive
                    ? 'bg-slate-800/90 text-amber-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                title={item.label}
              >
                {isActive && (
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-500 rounded-r ${
                      isOpen ? 'left-0' : 'left-0'
                    }`}
                  />
                )}
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-amber-400' : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-[11px] font-medium tracking-tight mt-1 transition-colors ${
                    isOpen ? '!mt-0 !text-sm' : ''
                  } ${isActive ? 'text-white font-semibold' : ''}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom indicator */}
        <div className="w-full pt-4 border-t border-slate-800/80 flex flex-col items-center">
          <div
            className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"
            title="System Status: All Ticketing & Gateway Services Operational"
          />
          <span className="text-[9px] text-slate-500 mt-1 font-mono">v2.6</span>
        </div>
      </aside>
    </>
  );
};
