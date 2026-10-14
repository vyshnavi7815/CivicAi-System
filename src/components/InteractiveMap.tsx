import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  status?: string;
  imageUrl?: string;
}

interface InteractiveMapProps {
  center: [number, number];
  zoom?: number;
  height?: string;
  draggableMarker?: boolean;
  markerPosition?: [number, number];
  onMarkerMove?: (lat: number, lng: number) => void;
  reportMarkers?: MapMarker[];
  showHotspots?: boolean;
  routeWaypoints?: [number, number][];
  onSelectMarker?: (id: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center,
  zoom = 13,
  height = '350px',
  draggableMarker = false,
  markerPosition,
  onMarkerMove,
  reportMarkers = [],
  showHotspots = false,
  routeWaypoints = [],
  onSelectMarker,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const singleMarkerRef = useRef<L.Marker | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const hotspotsLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // OpenStreetMap with dark aesthetic
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        className: 'dark-map-tiles',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Handle map click for draggable single marker
      if (draggableMarker && onMarkerMove) {
        map.on('click', (e) => {
          if (singleMarkerRef.current) {
            singleMarkerRef.current.setLatLng(e.latlng);
          }
          onMarkerMove(e.latlng.lat, e.latlng.lng);
        });
      }
    }

    return () => {
      // Clean up map on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center & zoom with flyTo animation
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.flyTo(center, zoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 300);
    }
  }, [center[0], center[1], zoom]);

  // Handle single pin (Citizen report placement)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const pinCoords: [number, number] = markerPosition || center;

    const customPinIcon = L.divIcon({
      className: 'custom-single-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute -top-6 w-9 h-9 bg-rose-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white font-bold animate-bounce">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="w-3 h-1.5 bg-black/50 rounded-full blur-[1px] -bottom-1"></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 30],
    });

    if (!singleMarkerRef.current) {
      if (draggableMarker || markerPosition) {
        const marker = L.marker(pinCoords, {
          icon: customPinIcon,
          draggable: draggableMarker,
        }).addTo(map);

        if (draggableMarker && onMarkerMove) {
          marker.on('dragend', () => {
            const pos = marker.getLatLng();
            onMarkerMove(pos.lat, pos.lng);
          });
        }

        singleMarkerRef.current = marker;
      }
    } else {
      singleMarkerRef.current.setLatLng(pinCoords);
    }
  }, [markerPosition ? markerPosition[0] : null, markerPosition ? markerPosition[1] : null, draggableMarker, center[0], center[1]]);

  // Handle multiple report markers (Admin / Hotspots)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    } else {
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    reportMarkers.forEach((m) => {
      const isCritical = m.priority === 'Critical';
      const isHigh = m.priority === 'High';
      const color = isCritical ? '#ef4444' : isHigh ? '#f97316' : '#06b6d4';
      const border = isCritical ? 'border-rose-400' : isHigh ? 'border-amber-400' : 'border-cyan-400';

      const icon = L.divIcon({
        className: 'custom-report-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            ${isCritical ? '<div class="absolute -top-4 w-9 h-9 rounded-full bg-rose-500/30 marker-pulse"></div>' : ''}
            <div class="w-7 h-7 rounded-full bg-slate-900 border-2 ${border} flex items-center justify-center text-xs font-bold shadow-lg" style="color: ${color}">
              ${isCritical ? '!' : m.title.substring(0, 1)}
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([m.lat, m.lng], { icon });

      // Create rich popup
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 text-slate-100 max-w-[220px]';
      popupContent.innerHTML = `
        <div class="text-xs font-mono text-cyan-400 mb-0.5">${m.id}</div>
        <div class="text-sm font-bold text-white mb-1">${m.category || m.title}</div>
        <div class="flex items-center gap-1.5 mb-2">
          <span class="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
            isCritical ? 'bg-rose-500/20 text-rose-300' : isHigh ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'
          }">
            ${m.priority || 'Medium'}
          </span>
          <span class="text-[10px] text-slate-400">• ${m.status || 'Active'}</span>
        </div>
        ${m.imageUrl ? `<img src="${m.imageUrl}" class="w-full h-20 object-cover rounded mb-2 border border-slate-700" alt="incident" />` : ''}
        <button id="btn-${m.id}" class="w-full text-center text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-1 px-2 rounded transition-colors">
          View in Command Center
        </button>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-${m.id}`);
        if (btn && onSelectMarker) {
          btn.onclick = () => onSelectMarker(m.id);
        }
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [reportMarkers]);

  // Handle Hotspots circles
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (hotspotsLayerRef.current) {
      hotspotsLayerRef.current.clearLayers();
    } else {
      hotspotsLayerRef.current = L.layerGroup().addTo(map);
    }

    if (showHotspots && reportMarkers.length > 0) {
      // Cluster nearby incidents with subtle radar circles
      reportMarkers.forEach((m) => {
        if (m.priority === 'Critical' || m.priority === 'High') {
          const circle = L.circle([m.lat, m.lng], {
            radius: 400,
            color: '#ef4444',
            fillColor: '#ef4444',
            fillOpacity: 0.18,
            weight: 1.5,
            dashArray: '4, 4',
          });
          hotspotsLayerRef.current?.addLayer(circle);
        }
      });
    }
  }, [showHotspots, reportMarkers]);

  // Handle Route Optimization Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    if (routeWaypoints && routeWaypoints.length > 1) {
      const polyline = L.polyline(routeWaypoints, {
        color: '#06b6d4',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 6',
      }).addTo(map);

      routePolylineRef.current = polyline;
      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
    }
  }, [routeWaypoints]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      <div
        ref={mapContainerRef}
        style={{ height }}
        className="dark-map w-full bg-slate-900"
      />
      <div className="absolute top-3 right-3 z-[400] bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>OSM Live GPS Feed</span>
      </div>
    </div>
  );
};
