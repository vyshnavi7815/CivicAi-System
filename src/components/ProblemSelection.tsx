import React, { useState } from 'react';
import { ProblemCategory, SupportedLanguage } from '../types';
import { CIVIC_CATEGORIES } from '../data/categories';
import { TRANSLATIONS } from '../data/translations';
import { AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft, ShieldAlert, Sparkles } from 'lucide-react';

interface ProblemSelectionProps {
  language: SupportedLanguage;
  selectedCategoryId: string | null;
  onSelectCategory: (category: ProblemCategory) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const ProblemSelectionPage: React.FC<ProblemSelectionProps> = ({
  language,
  selectedCategoryId,
  onSelectCategory,
  onContinue,
  onBack,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [filterTerm, setFilterTerm] = useState('');

  const selectedCategory = CIVIC_CATEGORIES.find((c) => c.id === selectedCategoryId);

  const filteredCategories = CIVIC_CATEGORIES.filter(
    (cat) =>
      cat.defaultTitle.toLowerCase().includes(filterTerm.toLowerCase()) ||
      cat.defaultDescription.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Municipal Grievance Directory</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
          {t.problem_select_title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t.problem_select_subtitle}
        </p>

        {/* Quick Filter Search */}
        <div className="mt-5 max-w-md mx-auto">
          <input
            type="text"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            placeholder="Search problem types (e.g. pothole, drainage, wire, water)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
          />
        </div>
      </div>

      {/* High Danger Safety Banner if selected issue is dangerous */}
      {selectedCategory?.isDangerous && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3 shadow-lg shadow-rose-950/20">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-300 block mb-0.5">
              CRITICAL PUBLIC SAFETY HAZARD
            </span>
            <p className="leading-relaxed">{selectedCategory.dangerNotice || t.safety_alert_banner}</p>
          </div>
        </div>
      )}

      {/* 16 Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {filteredCategories.map((category) => {
          const isSelected = selectedCategoryId === category.id;

          return (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className={`group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 hover:scale-[1.01]'
              }`}
            >
              {/* Category Realistic Photograph */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                <img
                  src={category.imageUrl}
                  alt={category.defaultTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to solid smart city gradient if network image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Dangerous Badge */}
                {category.isDangerous && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-rose-600/90 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Danger</span>
                  </div>
                )}

                {/* Selection Indicator Badge */}
                <div className="absolute top-2.5 right-2.5">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-black/50 border border-white/30 backdrop-blur-sm group-hover:border-cyan-400/80 transition-colors"></div>
                  )}
                </div>
              </div>

              {/* Text & Department Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {category.defaultTitle}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {category.defaultDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[170px]" title={category.defaultDepartment}>
                    {category.defaultDepartment.split('&')[0]}
                  </span>
                  <span className="text-cyan-400 font-medium">Select &rarr;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back_btn}</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedCategoryId}
          className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
            selectedCategoryId
              ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 hover:from-cyan-400 hover:to-sky-400 shadow-cyan-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          <span>{t.continue_btn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
