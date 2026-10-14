import React from 'react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { Globe, ArrowRight, CheckCircle2, Sparkles, Building, ShieldCheck } from 'lucide-react';

interface LanguageSelectionProps {
  selectedLanguage: SupportedLanguage | null;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onContinue: () => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onContinue,
}) => {
  const currentT = selectedLanguage ? TRANSLATIONS[selectedLanguage] : TRANSLATIONS.en;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero Badge & Heading */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-inner">
          <Globe className="w-3.5 h-3.5" />
          <span>Multilingual Civic Access • బహుభాషా పౌర సేవలు</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            {currentT.welcome_title}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {currentT.welcome_subtitle}
        </p>

        <p className="text-xs text-cyan-400/90 font-medium mt-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {currentT.select_language_instruction}
        </p>
      </div>

      {/* Language Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = selectedLanguage === lang.code;

          return (
            <div
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={`relative group cursor-pointer p-5 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/70 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Active glow corner */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/15 rounded-bl-full pointer-events-none"></div>
              )}

              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  {lang.name}
                </span>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 group-hover:border-slate-500"></div>
                )}
              </div>

              {/* Native Script Prominently Displayed */}
              <div className="text-2xl font-bold text-white mb-1 tracking-normal group-hover:text-cyan-200 transition-colors">
                {lang.nativeName}
              </div>

              <div className="text-xs text-slate-400 font-medium">
                {lang.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Transparency Feature Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 mb-8 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Official Municipal Corporation Redressal Engine</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Instant Vision AI Severity Inspection</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Building className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Direct Dispatch to Ward Engineers</span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={onContinue}
          disabled={!selectedLanguage}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2.5 transition-all shadow-lg ${
            selectedLanguage
              ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-slate-950 hover:from-cyan-400 hover:to-indigo-400 shadow-cyan-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          <span>{currentT.continue_btn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {!selectedLanguage && (
          <p className="text-xs text-slate-500 mt-2">
            Please click on any language above to proceed
          </p>
        )}
      </div>
    </div>
  );
};
