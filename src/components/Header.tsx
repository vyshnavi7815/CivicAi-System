import React from 'react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';
import { Shield, Sparkles, Building2, User, MessageSquareCode, Globe, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeView: 'report' | 'citizen-dashboard' | 'admin' | 'hotspots';
  onViewChange: (view: 'report' | 'citizen-dashboard' | 'admin' | 'hotspots') => void;
  onOpenChat: () => void;
  hasUnreadReports?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeView,
  onViewChange,
  onOpenChat,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-xl">
      {/* Top Demo & Authority Ribbon */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 px-4 py-1.5 border-b border-cyan-900/30 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-semibold text-cyan-300 tracking-wide uppercase text-[10px]">
            National Smart City Mission • Unified Municipal Grievance Redressal
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Hackathon Judge Live Demo
          </span>
          <div className="flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded text-cyan-300 text-[11px] font-mono">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Gemini Vision AI Active</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onViewChange('report')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                CivicAI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Smart City
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide hidden sm:block">
              Municipal Corporation Citizen Redressal Portal
            </p>
          </div>
        </div>

        {/* View Switcher for Live Presentation */}
        <nav className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => onViewChange('report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'report'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Report Defect</span>
          </button>

          <button
            onClick={() => onViewChange('citizen-dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'citizen-dashboard'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Citizen Dashboard</span>
          </button>

          <button
            onClick={() => onViewChange('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'admin'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="flex items-center gap-1">
              Municipal Center
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </span>
          </button>
        </nav>

        {/* Right Utility: Language Selector & Multilingual Assistant Button */}
        <div className="flex items-center gap-2">
          {/* Language dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 cursor-pointer transition-colors">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-medium">
                {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.nativeName || 'Language'}
              </span>
            </div>

            <div className="absolute right-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-50 backdrop-blur-lg">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Select Language
              </div>
              <div className="grid grid-cols-1 gap-1 max-h-60 overflow-y-auto">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-500">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Assistant Chat trigger */}
          <button
            onClick={onOpenChat}
            className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-sky-600/20 hover:from-cyan-600/30 hover:to-sky-600/30 border border-cyan-500/40 text-cyan-300 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm"
            title="Chat with CivicAI Multilingual Assistant"
          >
            <MessageSquareCode className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Ask CivicAI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
