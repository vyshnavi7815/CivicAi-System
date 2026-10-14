import React, { useState } from 'react';
import { SupportedLanguage, CivicReport } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Shield,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  activeComplaints: CivicReport[];
  onOpenReportForm: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  language,
  activeComplaints,
  onOpenReportForm,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const initialWelcomeText: Record<SupportedLanguage, string> = {
    en: "Namaste! I am CivicAI, your multilingual municipal assistant. How may I assist you with reporting or tracking civic problems today?",
    te: "నమస్కారం! నేను CivicAI ని, మీ బహుభాషా మున్సిపల్ అసిస్టెంట్. పౌర సమస్యలను నివేదించడంలో లేదా ట్రాక్ చేయడంలో మీకు ఎలా సహాయపడగలను?",
    hi: "नमस्ते! मैं CivicAI हूँ, आपका म्यूनिसिपल सहायक। आज नागरिक समस्याओं की शिकायत या ट्रैकिंग में आपकी क्या सहायता कर सकता हूँ?",
    ta: "வணக்கம்! நான் CivicAI, உங்கள் நகராட்சி உதவியாளர். பொது பிரச்சினைகளை பதிவு செய்ய அல்லது கண்காணிக்க நான் எவ்வாறு உதவ முடியும்?",
    kn: "ನಮಸ್ಕಾರ! ನಾನು CivicAI, ನಿಮ್ಮ ಪಾಲಿಕೆ ಸಹಾಯಕ. ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಲು ಅಥವಾ ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    ml: "നമസ്കാരം! ഞാൻ CivicAI ആണ്, നിങ്ങളുടെ മുനിസിപ്പൽ അസിസ്റ്റന്റ്. പരാതികൾ രജിസ്റ്റർ ചെയ്യാനോ ട്രാക്ക് ചെയ്യാനോ ഞാൻ എങ്ങനെ സഹായിക്കണം?",
    mr: "नमस्कार! मी CivicAI आहे, आपला पालिका सहाय्यक. नागरी समस्या नोंदवण्यासाठी किंवा तपासण्यासाठी मी आपल्याला कशी मदत करू शकेन?",
    bn: "নমস্কার! আমি CivicAI, আপনার পৌর সহায়ক। নাগরিক সমস্যা অভিযোগ বা ট্র্যাক করতে আজ কীভাবে সাহায্য করতে পারি?",
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: initialWelcomeText[language] || initialWelcomeText.en,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'How do I report a pothole?',
    'What does High Priority mean?',
    'What is my complaint status?',
    'How are citizen reward points earned?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: language,
          activeComplaints: activeComplaints.map((c) => ({
            id: c.id,
            category: c.category,
            status: c.status,
            priority: c.priority,
            area: c.area,
          })),
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || 'I am ready to assist with municipal civic matters.';

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'CivicAI Assistant is operating in local demonstration mode. You can report potholes, blocked drains, or check complaint statuses in the Citizen Dashboard.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col h-[550px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">CivicAI Assistant</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  Multilingual AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official Municipal Grievance Guidance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 text-xs mt-1">
                  AI
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <p>{m.text}</p>
                <span className="text-[9px] text-slate-400 block mt-1 text-right">
                  {m.timestamp}
                </span>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 text-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-slate-400">
              <div className="w-7 h-7 rounded-lg bg-cyan-600/30 flex items-center justify-center text-cyan-300">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <span className="animate-pulse">CivicAI is composing response...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto flex gap-1.5 scrollbar-none">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question in your preferred language..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
