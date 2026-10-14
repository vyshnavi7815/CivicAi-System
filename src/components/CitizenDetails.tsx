import React, { useState, useEffect, useRef } from 'react';
import { CitizenDetails, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { InteractiveMap } from './InteractiveMap';
import { POPULAR_PLACES_DATABASE, lookupLocalPlaceCoordinates, geocodeAddress } from '../data/places';
import {
  Navigation,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  Search,
  Sparkles,
  LocateFixed,
  RefreshCw,
} from 'lucide-react';

interface CitizenDetailsProps {
  language: SupportedLanguage;
  initialData: CitizenDetails;
  onContinue: (data: CitizenDetails) => void;
  onBack: () => void;
}

export const CitizenDetailsPage: React.FC<CitizenDetailsProps> = ({
  language,
  initialData,
  onContinue,
  onBack,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [formData, setFormData] = useState<CitizenDetails>(initialData);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'requesting' | 'success' | 'denied'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [mappedPlaceLabel, setMappedPlaceLabel] = useState<string>('Banjara Hills, Hyderabad');
  const [searchLocationQuery, setSearchLocationQuery] = useState('');

  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceStatusText, setVoiceStatusText] = useState('');

  // Speech Recognition - user can tell the location out loud like Google Maps
  const startVoiceLocationInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceStatusText('Voice input is not supported in this browser. Please type the location in the search bar.');
      setTimeout(() => setVoiceStatusText(''), 4000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListeningVoice(true);
      setVoiceStatusText('🎙️ Listening... Tell your location (e.g. "Charminar Hyderabad" or "Indiranagar Bangalore")');

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchLocationQuery(transcript);
        setIsListeningVoice(false);
        setVoiceStatusText(`Heard: "${transcript}" — Locating on map...`);
        setTimeout(() => setVoiceStatusText(''), 3000);
        handleSearchPlaceQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListeningVoice(false);
        setVoiceStatusText('Could not hear clearly. Please type the place or try again.');
        setTimeout(() => setVoiceStatusText(''), 4000);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      recognition.start();
    } catch (err) {
      setIsListeningVoice(false);
      setVoiceStatusText('Microphone access was interrupted. Please type the place.');
      setTimeout(() => setVoiceStatusText(''), 3000);
    }
  };

  // Google Maps-style search: user tells or types any place, landmark, colony, or city
  const handleSearchPlaceQuery = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    setIsGeocoding(true);
    try {
      // 1. Check instant offline Indian database
      const localMatch = lookupLocalPlaceCoordinates('', q);
      if (localMatch) {
        setFormData((prev) => ({
          ...prev,
          city: localMatch.matchedCity || prev.city,
          area: localMatch.matchedArea || q,
          streetLandmark: prev.streetLandmark || q,
          coordinates: { lat: localMatch.lat, lng: localMatch.lng },
          isGpsDetected: false,
        }));
        setMappedPlaceLabel(localMatch.matchedName);
        return;
      }

      // 2. Query geocoding proxy (/api/geocode)
      const geo = await geocodeAddress('', q, '');
      if (geo) {
        const parts = (geo.matchedName || q).split(',').map((s) => s.trim());
        const inferredArea = geo.matchedArea || parts[0] || q;
        const inferredCity = geo.matchedCity || (parts.length > 1 ? parts[1] : formData.city);

        setFormData((prev) => ({
          ...prev,
          city: inferredCity,
          area: inferredArea,
          streetLandmark: prev.streetLandmark || q,
          coordinates: { lat: geo.lat, lng: geo.lng },
          isGpsDetected: false,
        }));
        setMappedPlaceLabel(geo.matchedName);
      } else {
        setMappedPlaceLabel(`Pinned near: ${q}`);
      }
    } catch (err) {
      console.warn('Geocoding search failed:', err);
    } finally {
      setIsGeocoding(false);
    }
  };

  const debounceTimerRef = useRef<any>(null);

  const performPlaceGeocode = async (city: string, area: string, street: string) => {
    if (!city && !area && !street) return;

    // First try instant offline local matching
    const localMatch = lookupLocalPlaceCoordinates(city, `${area} ${street}`);
    if (localMatch) {
      setFormData((prev) => ({
        ...prev,
        city: localMatch.matchedCity || prev.city,
        coordinates: { lat: localMatch.lat, lng: localMatch.lng },
      }));
      setMappedPlaceLabel(localMatch.matchedName);
      return;
    }

    // Next try online OpenStreetMap geocoding via server proxy
    setIsGeocoding(true);
    try {
      const geo = await geocodeAddress(city, area, street);
      if (geo) {
        setFormData((prev) => ({
          ...prev,
          city: geo.matchedCity || prev.city,
          coordinates: { lat: geo.lat, lng: geo.lng },
        }));
        setMappedPlaceLabel(geo.matchedName);
      }
    } catch (err) {
      console.warn('Geocoding error:', err);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleCityOrAreaChange = (field: 'city' | 'area' | 'streetLandmark', value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }

    // Immediate check if user typed a known locality (e.g., "old gajuwaks" or "gajuwaka")
    const instantCheck = lookupLocalPlaceCoordinates(
      field === 'city' ? value : '',
      field === 'area' ? value : updated.area
    );
    if (instantCheck) {
      setFormData((prev) => ({
        ...prev,
        city: instantCheck.matchedCity || prev.city,
        coordinates: { lat: instantCheck.lat, lng: instantCheck.lng },
      }));
      setMappedPlaceLabel(instantCheck.matchedName);
    }

    // Debounce online search for more specific addresses
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      performPlaceGeocode(
        instantCheck?.matchedCity || (field === 'city' ? value : updated.city),
        field === 'area' ? value : updated.area,
        field === 'streetLandmark' ? value : updated.streetLandmark
      );
    }, 200);
  };

  // Trigger GPS only upon citizen click
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('denied');
      return;
    }

    setGpsStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          coordinates: { lat: latitude, lng: longitude },
          locationAccuracy: accuracy,
          isGpsDetected: true,
        }));
        setMappedPlaceLabel(`Browser GPS Position (Accuracy: ${Math.round(accuracy)}m)`);
        setGpsStatus('success');
      },
      (err) => {
        console.warn('Geolocation denied or unavailable:', err.message);
        setGpsStatus('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleMapMove = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: { lat, lng },
      isGpsDetected: true,
    }));
    setMappedPlaceLabel(`Custom Pinpoint Location`);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }
    if (!formData.city.trim()) {
      errs.city = 'City / Town is required.';
    }
    if (!formData.area.trim()) {
      errs.area = 'Area / Locality / Ward is required.';
    }
    if (!formData.streetLandmark.trim()) {
      errs.streetLandmark = 'Street name or landmark is required for dispatch.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onContinue(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title & Guidance */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
          {t.citizen_info_title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t.citizen_info_subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">
              Citizen Contact & Privacy
            </h2>
            <span className="text-[11px] text-slate-400 ml-auto">
              Protected by Data Minimization
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.full_name} <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                placeholder={t.full_name_placeholder}
                className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                  errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.phone_number}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t.phone_placeholder}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Location Form & Interactive Leaflet Pin Section with Auto Place Mapping */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-base font-bold text-white">
                  {t.location_title}
                </h2>
                <span className="text-[11px] text-cyan-400 block">
                  Map automatically syncs with your entered place & locality
                </span>
              </div>
            </div>

            {/* GPS Button */}
            <button
              type="button"
              onClick={handleRequestLocation}
              disabled={gpsStatus === 'requesting'}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${gpsStatus === 'requesting' ? 'animate-spin' : ''}`} />
              <span>{gpsStatus === 'requesting' ? 'Detecting GPS...' : t.use_gps_btn}</span>
            </button>
          </div>

          {/* Google Maps Style Location Search & Voice Input Bar */}
          <div className="bg-slate-950/90 border-2 border-cyan-500/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <label className="text-xs font-bold text-white block">
                    Tell or Search Location (Like Google Maps)
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Tell your place or type any address — the map will fly and pinpoint that exact location
                  </span>
                </div>
              </div>

              {/* Use GPS Button */}
              <button
                type="button"
                onClick={handleRequestLocation}
                disabled={gpsStatus === 'requesting'}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Navigation className={`w-3.5 h-3.5 ${gpsStatus === 'requesting' ? 'animate-spin' : ''}`} />
                <span>{gpsStatus === 'requesting' ? 'Detecting...' : 'My Device GPS'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  type="text"
                  value={searchLocationQuery}
                  onChange={(e) => setSearchLocationQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearchPlaceQuery(searchLocationQuery);
                    }
                  }}
                  placeholder="Tell or type place (e.g. Charminar, Connaught Place, Indiranagar, Marine Drive, Benz Circle)..."
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-10 pr-24 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 shadow-inner"
                />
                {/* Voice Recognition Button inside search bar */}
                <button
                  type="button"
                  onClick={startVoiceLocationInput}
                  className={`absolute inset-y-1 right-1 px-3 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isListeningVoice
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30'
                  }`}
                  title="Speak or Tell Location"
                >
                  <span className="text-sm">🎙️</span>
                  <span className="hidden sm:inline">{isListeningVoice ? 'Listening...' : 'Tell Place'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleSearchPlaceQuery(searchLocationQuery)}
                disabled={isGeocoding || !searchLocationQuery.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isGeocoding ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <MapPin className="w-3.5 h-3.5" />
                )}
                <span>Locate Map</span>
              </button>
            </div>

            {voiceStatusText && (
              <div className="mt-2 text-xs font-mono text-cyan-300 flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>{voiceStatusText}</span>
              </div>
            )}
          </div>

          {/* GPS Status Message */}
          {gpsStatus === 'success' && (
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.gps_detected} (Lat: {formData.coordinates.lat.toFixed(4)}, Lng: {formData.coordinates.lng.toFixed(4)})</span>
            </div>
          )}

          {gpsStatus === 'denied' && (
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.gps_denied}</span>
            </div>
          )}

          {/* Address fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.city_town} <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleCityOrAreaChange('city', e.target.value)}
                placeholder="e.g. Hyderabad, Bengaluru, Chennai..."
                className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  errors.city ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.city && <p className="text-xs text-rose-400 mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.area_locality} <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => handleCityOrAreaChange('area', e.target.value)}
                placeholder="e.g. Banjara Hills, Indiranagar, T. Nagar..."
                className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  errors.area ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.area && <p className="text-xs text-rose-400 mt-1">{errors.area}</p>}
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.street_landmark} <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.streetLandmark}
                onChange={(e) => handleCityOrAreaChange('streetLandmark', e.target.value)}
                placeholder="e.g. Road No. 12, Opposite City Hospital"
                className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  errors.streetLandmark ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.streetLandmark && (
                <p className="text-xs text-rose-400 mt-1">{errors.streetLandmark}</p>
              )}
            </div>
          </div>



          {/* Sync to Map button & Live Pin Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/40 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <LocateFixed className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Interactive Map Pin Location:</span>
                <strong className="text-white font-bold">{mappedPlaceLabel}</strong>
                <span className="text-cyan-300 font-mono text-[10px] ml-2">
                  ({formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)})
                </span>
              </div>
              {isGeocoding && (
                <span className="text-cyan-300 flex items-center gap-1 font-mono text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Pinning location...</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                performPlaceGeocode(formData.city, formData.area, formData.streetLandmark)
              }
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Center Map to Address</span>
            </button>
          </div>


          {/* Interactive Leaflet Pin Adjustment Map */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{t.pin_adjust_hint}</span>
              </span>
              <span className="font-mono text-cyan-300">
                Lat: {formData.coordinates.lat.toFixed(5)}, Lng: {formData.coordinates.lng.toFixed(5)}
              </span>
            </div>

            <InteractiveMap
              center={[formData.coordinates.lat, formData.coordinates.lng]}
              markerPosition={[formData.coordinates.lat, formData.coordinates.lng]}
              draggableMarker={true}
              onMarkerMove={handleMapMove}
              height="280px"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back_btn}</span>
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-sm flex items-center gap-2 hover:from-cyan-400 hover:to-sky-400 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t.continue_btn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
