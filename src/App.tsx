/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SupportedLanguage, CitizenDetails, ProblemCategory, AIAnalysisResult, CivicReport } from './types';
import { CIVIC_CATEGORIES } from './data/categories';
import { TRANSLATIONS } from './data/translations';
import { Header } from './components/Header';
import { LanguageSelection } from './components/LanguageSelection';
import { CitizenDetailsPage } from './components/CitizenDetails';
import { ProblemSelectionPage } from './components/ProblemSelection';
import { EvidenceUploadPage } from './components/EvidenceUpload';
import { ReviewAndSubmitPage } from './components/ReviewAndSubmit';
import { CitizenDashboard } from './components/CitizenDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ChatbotModal } from './components/ChatbotModal';
import { Check, Shield, Sparkles } from 'lucide-react';

export default function App() {
  // Step flow state
  // Step 1: Language -> Step 2: Citizen Info & GPS -> Step 3: Category -> Step 4: Evidence & AI -> Step 5: Review & Submit
  const [reportingStep, setReportingStep] = useState<number>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);
  const [activeView, setActiveView] = useState<'report' | 'citizen-dashboard' | 'admin' | 'hotspots'>('report');
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  // Form State
  const [citizenDetails, setCitizenDetails] = useState<CitizenDetails>({
    fullName: '',
    phone: '',
    city: 'Hyderabad',
    area: 'Banjara Hills, Ward 98',
    streetLandmark: 'Road No. 12, Near Metro Station',
    coordinates: { lat: 17.4156, lng: 78.4354 },
    isGpsDetected: false,
  });

  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [evidenceImageUrl, setEvidenceImageUrl] = useState<string>('');
  const [observationDateTime, setObservationDateTime] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);

  // Reports store
  const [reports, setReports] = useState<CivicReport[]>([]);

  // Fetch reports on mount
  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.reports) {
          setReports(data.reports);
        }
      })
      .catch((err) => console.warn('Could not load reports list:', err));
  }, []);

  const handleUpdateReport = (id: string, updates: Partial<CivicReport>) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r))
    );

    fetch(`/api/reports/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    }).catch((err) => console.warn('Sync report error:', err));
  };

  const handleReportSubmitted = (newId: string) => {
    // Refresh latest reports
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.reports) setReports(data.reports);
      })
      .catch((err) => console.warn('Refresh error:', err));
  };

  const currentLanguageCode = selectedLanguage || 'en';
  const t = TRANSLATIONS[currentLanguageCode] || TRANSLATIONS.en;

  const stepLabels = [
    { num: 1, label: t.step_1 },
    { num: 2, label: t.step_2 },
    { num: 3, label: t.step_3 },
    { num: 4, label: t.step_4 },
    { num: 5, label: t.step_5 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header & Role Switcher */}
      <Header
        currentLanguage={currentLanguageCode}
        onLanguageChange={(lang) => setSelectedLanguage(lang)}
        activeView={activeView}
        onViewChange={(view) => setActiveView(view)}
        onOpenChat={() => setIsChatbotOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* VIEW 1: CITIZEN REPORTING FLOW (STEPS 1 - 5) */}
        {activeView === 'report' && (
          <div>
            {/* Step Progress Tracker (Visible on Step 2 to 5) */}
            {reportingStep > 1 && (
              <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl">
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0 hidden sm:block"></div>

                    {stepLabels.map((s) => {
                      const isCompleted = s.num < reportingStep;
                      const isCurrent = s.num === reportingStep;

                      return (
                        <div
                          key={s.num}
                          onClick={() => {
                            // Allow clicking previous steps
                            if (isCompleted) setReportingStep(s.num);
                          }}
                          className={`relative z-10 flex flex-col items-center cursor-pointer transition-all ${
                            isCompleted ? 'group' : ''
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                              isCurrent
                                ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 font-black scale-110'
                                : isCompleted
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-800 text-slate-500 border border-slate-700'
                            }`}
                          >
                            {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                          </div>
                          <span
                            className={`text-[11px] font-semibold mt-1.5 hidden sm:block ${
                              isCurrent
                                ? 'text-cyan-300'
                                : isCompleted
                                ? 'text-slate-300 group-hover:text-cyan-300'
                                : 'text-slate-500'
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: LANGUAGE SELECTION */}
            {reportingStep === 1 && (
              <LanguageSelection
                selectedLanguage={selectedLanguage}
                onSelectLanguage={(lang) => setSelectedLanguage(lang)}
                onContinue={() => setReportingStep(2)}
              />
            )}

            {/* STEP 2: CITIZEN DETAILS & LOCATION */}
            {reportingStep === 2 && (
              <CitizenDetailsPage
                language={currentLanguageCode}
                initialData={citizenDetails}
                onContinue={(data) => {
                  setCitizenDetails(data);
                  setReportingStep(3);
                }}
                onBack={() => setReportingStep(1)}
              />
            )}

            {/* STEP 3: PROBLEM CATEGORY SELECTION */}
            {reportingStep === 3 && (
              <ProblemSelectionPage
                language={currentLanguageCode}
                selectedCategoryId={selectedCategory?.id || null}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onContinue={() => setReportingStep(4)}
                onBack={() => setReportingStep(2)}
              />
            )}

            {/* STEP 4: DESCRIBE & UPLOAD EVIDENCE */}
            {reportingStep === 4 && selectedCategory && (
              <EvidenceUploadPage
                language={currentLanguageCode}
                category={selectedCategory}
                onUpdateCategory={(catTitle) => {
                  const matched = CIVIC_CATEGORIES.find((c) => c.defaultTitle === catTitle);
                  if (matched) setSelectedCategory(matched);
                }}
                description={problemDescription}
                onChangeDescription={(desc) => setProblemDescription(desc)}
                imageUrl={evidenceImageUrl}
                onImageChange={(img) => setEvidenceImageUrl(img)}
                observationDateTime={observationDateTime}
                onChangeDateTime={(dt) => setObservationDateTime(dt)}
                additionalNotes={additionalNotes}
                onChangeNotes={(notes) => setAdditionalNotes(notes)}
                aiAnalysis={aiAnalysis}
                onAiAnalysisComplete={(res) => setAiAnalysis(res)}
                onContinue={() => setReportingStep(5)}
                onBack={() => setReportingStep(3)}
              />
            )}

            {/* STEP 5: REVIEW & FINAL SUBMIT */}
            {reportingStep === 5 && selectedCategory && (
              <ReviewAndSubmitPage
                language={currentLanguageCode}
                citizenDetails={citizenDetails}
                category={selectedCategory}
                description={problemDescription}
                imageUrl={evidenceImageUrl}
                observationDateTime={observationDateTime}
                additionalNotes={additionalNotes}
                aiAnalysis={aiAnalysis}
                onEditSection={(step) => {
                  if (step === 6) setActiveView('citizen-dashboard');
                  else if (step === 7) setActiveView('admin');
                  else if (step === 1) {
                    // Reset reporting form
                    setProblemDescription('');
                    setEvidenceImageUrl('');
                    setAiAnalysis(null);
                    setReportingStep(1);
                  } else {
                    setReportingStep(step);
                  }
                }}
                onSubmitSuccess={handleReportSubmitted}
                onBack={() => setReportingStep(4)}
              />
            )}
          </div>
        )}

        {/* VIEW 2: CITIZEN DASHBOARD */}
        {activeView === 'citizen-dashboard' && (
          <CitizenDashboard
            language={currentLanguageCode}
            reports={reports}
            onOpenReportForm={() => {
              setActiveView('report');
              setReportingStep(3);
            }}
            onOpenAdmin={() => setActiveView('admin')}
          />
        )}

        {/* VIEW 3: MUNICIPAL ADMIN COMMAND CENTER */}
        {activeView === 'admin' && (
          <AdminDashboard
            language={currentLanguageCode}
            reports={reports}
            onUpdateReport={handleUpdateReport}
            onOpenReportForm={() => {
              setActiveView('report');
              setReportingStep(1);
            }}
          />
        )}
      </main>

      {/* Multilingual AI Assistant Modal */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        language={currentLanguageCode}
        activeComplaints={reports}
        onOpenReportForm={() => {
          setIsChatbotOpen(false);
          setActiveView('report');
          setReportingStep(1);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-400">
              CivicAI – Smart Civic Management System
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Unified Municipal Redressal</span>
            <span>•</span>
            <span>Gemini Vision AI Engine</span>
            <span>•</span>
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="text-cyan-400 hover:underline"
            >
              Ask AI Assistant
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
