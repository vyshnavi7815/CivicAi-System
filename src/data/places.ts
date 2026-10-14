// Curated high-precision coordinates for Indian cities and wards for instant offline mapping
export interface PlaceCoord {
  city: string;
  area: string;
  lat: number;
  lng: number;
  displayName: string;
}

export const POPULAR_PLACES_DATABASE: PlaceCoord[] = [
  // Hyderabad & Telangana
  { city: 'Hyderabad', area: 'Banjara Hills', lat: 17.4156, lng: 78.4354, displayName: 'Banjara Hills, Hyderabad' },
  { city: 'Hyderabad', area: 'Jubilee Hills', lat: 17.4319, lng: 78.4073, displayName: 'Jubilee Hills, Hyderabad' },
  { city: 'Hyderabad', area: 'Madhapur', lat: 17.4483, lng: 78.3915, displayName: 'Madhapur, Hitec City, Hyderabad' },
  { city: 'Hyderabad', area: 'Gachibowli', lat: 17.4401, lng: 78.3489, displayName: 'Gachibowli, Hyderabad' },
  { city: 'Hyderabad', area: 'Kukatpally', lat: 17.4938, lng: 78.3984, displayName: 'KPHB Colony, Kukatpally, Hyderabad' },
  { city: 'Hyderabad', area: 'Charminar', lat: 17.3616, lng: 78.4747, displayName: 'Charminar Old City, Hyderabad' },
  { city: 'Hyderabad', area: 'Ameerpet', lat: 17.4375, lng: 78.4483, displayName: 'Ameerpet, Hyderabad' },
  { city: 'Hyderabad', area: 'Secunderabad', lat: 17.4399, lng: 78.4983, displayName: 'Clock Tower, Secunderabad' },
  { city: 'Hyderabad', area: 'Dilsukhnagar', lat: 17.3688, lng: 78.5247, displayName: 'Dilsukhnagar, Hyderabad' },
  { city: 'Hyderabad', area: 'Mehdipatnam', lat: 17.3916, lng: 78.4398, displayName: 'Mehdipatnam, Hyderabad' },
  { city: 'Hyderabad', area: 'Kondapur', lat: 17.4682, lng: 78.3578, displayName: 'Kondapur, Hyderabad' },
  { city: 'Hyderabad', area: 'Uppal', lat: 17.4022, lng: 78.5602, displayName: 'Uppal, Hyderabad' },
  { city: 'Hyderabad', area: 'LB Nagar', lat: 17.3457, lng: 78.5522, displayName: 'LB Nagar, Hyderabad' },
  { city: 'Hyderabad', area: 'Begumpet', lat: 17.4447, lng: 78.4664, displayName: 'Begumpet, Hyderabad' },
  { city: 'Hyderabad', area: 'Miyapur', lat: 17.4969, lng: 78.3547, displayName: 'Miyapur, Hyderabad' },
  { city: 'Hyderabad', area: 'Manikonda', lat: 17.3995, lng: 78.3842, displayName: 'Manikonda, Hyderabad' },
  { city: 'Warangal', area: 'Hanamkonda', lat: 17.9784, lng: 79.5941, displayName: 'Hanamkonda, Warangal' },
  { city: 'Warangal', area: 'Kazipet', lat: 17.9818, lng: 79.5255, displayName: 'Kazipet, Warangal' },
  { city: 'Nizamabad', area: 'Gandhi Chowk', lat: 18.6725, lng: 78.0941, displayName: 'Gandhi Chowk, Nizamabad' },
  { city: 'Karimnagar', area: 'Collectorate Road', lat: 18.4386, lng: 79.1288, displayName: 'Collectorate, Karimnagar' },
  { city: 'Khammam', area: 'Wyra Road', lat: 17.2473, lng: 80.1514, displayName: 'Wyra Road, Khammam' },

  // Bengaluru (Bangalore)
  { city: 'Bengaluru', area: 'Indiranagar', lat: 12.9784, lng: 77.6408, displayName: 'Indiranagar, Bengaluru' },
  { city: 'Bengaluru', area: 'Koramangala', lat: 12.9352, lng: 77.6245, displayName: 'Koramangala, Bengaluru' },
  { city: 'Bengaluru', area: 'Whitefield', lat: 12.9698, lng: 77.7500, displayName: 'Whitefield, Bengaluru' },
  { city: 'Bengaluru', area: 'HSR Layout', lat: 12.9121, lng: 77.6446, displayName: 'HSR Layout, Bengaluru' },
  { city: 'Bengaluru', area: 'Electronic City', lat: 12.8452, lng: 77.6602, displayName: 'Electronic City, Bengaluru' },
  { city: 'Bengaluru', area: 'Jayanagar', lat: 12.9308, lng: 77.5838, displayName: 'Jayanagar, Bengaluru' },
  { city: 'Bengaluru', area: 'Malleshwaram', lat: 13.0031, lng: 77.5643, displayName: 'Malleshwaram, Bengaluru' },
  { city: 'Bengaluru', area: 'MG Road', lat: 12.9756, lng: 77.6066, displayName: 'MG Road, Bengaluru' },
  { city: 'Bengaluru', area: 'Hebbal', lat: 13.0358, lng: 77.5970, displayName: 'Hebbal, Bengaluru' },
  { city: 'Bengaluru', area: 'BTM Layout', lat: 12.9166, lng: 77.6101, displayName: 'BTM Layout, Bengaluru' },
  { city: 'Bengaluru', area: 'Marathahalli', lat: 12.9591, lng: 77.6974, displayName: 'Marathahalli, Bengaluru' },
  { city: 'Mysuru', area: 'Devaraja Market', lat: 12.3052, lng: 76.6552, displayName: 'Devaraja Market, Mysuru' },
  { city: 'Mangaluru', area: 'Hampankatta', lat: 12.8698, lng: 74.8430, displayName: 'Hampankatta, Mangaluru' },
  { city: 'Hubballi', area: 'Vidyanagar', lat: 15.3647, lng: 75.1240, displayName: 'Vidyanagar, Hubballi' },

  // Andhra Pradesh
  { city: 'Visakhapatnam', area: 'Old Gajuwaka', lat: 17.6860, lng: 83.2035, displayName: 'Old Gajuwaka, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'Gajuwaka', lat: 17.6917, lng: 83.2185, displayName: 'Gajuwaka, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'New Gajuwaka', lat: 17.6950, lng: 83.2120, displayName: 'New Gajuwaka, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'Kurmannapalem', lat: 17.6740, lng: 83.1680, displayName: 'Kurmannapalem, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'NAD Junction', lat: 17.7400, lng: 83.2200, displayName: 'NAD Junction, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'MVP Colony', lat: 17.7420, lng: 83.3371, displayName: 'MVP Colony, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'Beach Road', lat: 17.7126, lng: 83.3182, displayName: 'RK Beach Road, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'Siripuram', lat: 17.7214, lng: 83.3150, displayName: 'Siripuram, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'Dwaraka Nagar', lat: 17.7275, lng: 83.3087, displayName: 'Dwaraka Nagar, Visakhapatnam' },
  { city: 'Visakhapatnam', area: 'Madhurawada', lat: 17.8180, lng: 83.3520, displayName: 'Madhurawada, Visakhapatnam' },
  { city: 'Vijayawada', area: 'Benz Circle', lat: 16.5024, lng: 80.6548, displayName: 'Benz Circle, Vijayawada' },
  { city: 'Vijayawada', area: 'Governorpet', lat: 16.5131, lng: 80.6276, displayName: 'Governorpet, Vijayawada' },
  { city: 'Vijayawada', area: 'Patamata', lat: 16.4952, lng: 80.6651, displayName: 'Patamata, Vijayawada' },
  { city: 'Vijayawada', area: 'Bhavanipuram', lat: 16.5262, lng: 80.5978, displayName: 'Bhavanipuram, Vijayawada' },
  { city: 'Guntur', area: 'Brodipet', lat: 16.3067, lng: 80.4365, displayName: 'Brodipet, Guntur' },
  { city: 'Guntur', area: 'Arundelpet', lat: 16.3032, lng: 80.4431, displayName: 'Arundelpet, Guntur' },
  { city: 'Tirupati', area: 'Alipiri Road', lat: 13.6288, lng: 79.4192, displayName: 'Alipiri, Tirupati' },
  { city: 'Tirupati', area: 'Bhavani Nagar', lat: 13.6358, lng: 79.4261, displayName: 'Bhavani Nagar, Tirupati' },
  { city: 'Nellore', area: 'VRC Centre', lat: 14.4426, lng: 79.9865, displayName: 'VRC Centre, Nellore' },
  { city: 'Kurnool', area: 'Kallur', lat: 15.8281, lng: 78.0373, displayName: 'Kallur, Kurnool' },
  { city: 'Rajahmundry', area: 'Kotipalli Bus Stand', lat: 17.0005, lng: 81.8040, displayName: 'Kotipalli, Rajahmundry' },
  { city: 'Kakinada', area: 'Bhanugudi Junction', lat: 16.9891, lng: 82.2475, displayName: 'Bhanugudi, Kakinada' },
  { city: 'Anantapur', area: 'Subhash Road', lat: 14.6819, lng: 77.6006, displayName: 'Subhash Road, Anantapur' },
  { city: 'Kadapa', area: 'Seven Roads Junction', lat: 14.4673, lng: 78.8242, displayName: 'Seven Roads, Kadapa' },

  // Chennai & Tamil Nadu
  { city: 'Chennai', area: 'T. Nagar', lat: 13.0418, lng: 80.2341, displayName: 'T. Nagar, Chennai' },
  { city: 'Chennai', area: 'Anna Nagar', lat: 13.0850, lng: 80.2101, displayName: 'Anna Nagar, Chennai' },
  { city: 'Chennai', area: 'Adyar', lat: 13.0012, lng: 80.2565, displayName: 'Adyar, Chennai' },
  { city: 'Chennai', area: 'Velachery', lat: 12.9815, lng: 80.2180, displayName: 'Velachery, Chennai' },
  { city: 'Chennai', area: 'Mylapore', lat: 13.0368, lng: 80.2676, displayName: 'Mylapore, Chennai' },
  { city: 'Chennai', area: 'OMR Road', lat: 12.9249, lng: 80.2279, displayName: 'OMR IT Corridor, Chennai' },
  { city: 'Coimbatore', area: 'RS Puram', lat: 11.0089, lng: 76.9497, displayName: 'RS Puram, Coimbatore' },
  { city: 'Coimbatore', area: 'Gandhipuram', lat: 11.0168, lng: 76.9672, displayName: 'Gandhipuram, Coimbatore' },
  { city: 'Madurai', area: 'Simmakkal', lat: 9.9252, lng: 78.1198, displayName: 'Simmakkal, Madurai' },
  { city: 'Salem', area: 'Fairlands', lat: 11.6643, lng: 78.1460, displayName: 'Fairlands, Salem' },
  { city: 'Tiruchirappalli', area: 'Thillai Nagar', lat: 10.8258, lng: 78.6856, displayName: 'Thillai Nagar, Trichy' },

  // Mumbai & Maharashtra
  { city: 'Mumbai', area: 'Andheri West', lat: 19.1136, lng: 72.8697, displayName: 'Andheri West, Mumbai' },
  { city: 'Mumbai', area: 'Bandra West', lat: 19.0596, lng: 72.8295, displayName: 'Bandra West, Mumbai' },
  { city: 'Mumbai', area: 'Dadar', lat: 19.0178, lng: 72.8478, displayName: 'Dadar Central, Mumbai' },
  { city: 'Mumbai', area: 'Borivali', lat: 19.2307, lng: 72.8567, displayName: 'Borivali, Mumbai' },
  { city: 'Mumbai', area: 'Colaba', lat: 18.9067, lng: 72.8147, displayName: 'Colaba, South Mumbai' },
  { city: 'Mumbai', area: 'Thane West', lat: 19.2183, lng: 72.9781, displayName: 'Thane West, MMR' },
  { city: 'Mumbai', area: 'Navi Mumbai (Vashi)', lat: 19.0771, lng: 72.9986, displayName: 'Vashi, Navi Mumbai' },
  { city: 'Pune', area: 'Kothrud', lat: 18.5074, lng: 73.8077, displayName: 'Kothrud, Pune' },
  { city: 'Pune', area: 'Shivaji Nagar', lat: 18.5308, lng: 73.8474, displayName: 'Shivaji Nagar, Pune' },
  { city: 'Pune', area: 'Hinjewadi', lat: 18.5913, lng: 73.7389, displayName: 'Hinjewadi IT Park, Pune' },
  { city: 'Pune', area: 'Viman Nagar', lat: 18.5679, lng: 73.9143, displayName: 'Viman Nagar, Pune' },
  { city: 'Nagpur', area: 'Dharampeth', lat: 21.1458, lng: 79.0628, displayName: 'Dharampeth, Nagpur' },
  { city: 'Nashik', area: 'College Road', lat: 20.0059, lng: 73.7634, displayName: 'College Road, Nashik' },

  // Delhi & NCR
  { city: 'Delhi', area: 'Connaught Place', lat: 28.6315, lng: 77.2167, displayName: 'Connaught Place, Central Delhi' },
  { city: 'Delhi', area: 'Karol Bagh', lat: 28.6517, lng: 77.1906, displayName: 'Karol Bagh, Delhi' },
  { city: 'Delhi', area: 'Lajpat Nagar', lat: 28.5677, lng: 77.2433, displayName: 'Lajpat Nagar, South Delhi' },
  { city: 'Delhi', area: 'Rohini', lat: 28.7166, lng: 77.1189, displayName: 'Rohini, North West Delhi' },
  { city: 'Delhi', area: 'Dwarka', lat: 28.5921, lng: 77.0460, displayName: 'Dwarka, South West Delhi' },
  { city: 'Delhi', area: 'Hauz Khas', lat: 28.5494, lng: 77.2001, displayName: 'Hauz Khas, South Delhi' },
  { city: 'Noida', area: 'Sector 18', lat: 28.5708, lng: 77.3271, displayName: 'Sector 18, Noida' },
  { city: 'Gurugram', area: 'Cyber City', lat: 28.4950, lng: 77.0895, displayName: 'DLF Cyber City, Gurugram' },

  // Kolkata & West Bengal
  { city: 'Kolkata', area: 'Salt Lake', lat: 22.5868, lng: 88.4178, displayName: 'Salt Lake Sector V, Kolkata' },
  { city: 'Kolkata', area: 'Park Street', lat: 22.5516, lng: 88.3524, displayName: 'Park Street, Kolkata' },
  { city: 'Kolkata', area: 'Howrah', lat: 22.5958, lng: 88.2636, displayName: 'Howrah Junction, Kolkata' },
  { city: 'Kolkata', area: 'New Town', lat: 22.5905, lng: 88.4731, displayName: 'New Town, Rajarhat, Kolkata' },

  // Kerala
  { city: 'Kochi', area: 'Marine Drive', lat: 9.9816, lng: 76.2753, displayName: 'Marine Drive, Kochi' },
  { city: 'Kochi', area: 'Edapally', lat: 10.0247, lng: 76.3079, displayName: 'Edapally, Kochi' },
  { city: 'Thiruvananthapuram', area: 'Pattom', lat: 8.5241, lng: 76.9366, displayName: 'Pattom, Thiruvananthapuram' },
  { city: 'Kozhikode', area: 'Mavoor Road', lat: 11.2588, lng: 75.7804, displayName: 'Mavoor Road, Kozhikode' },

  // Other Major State Capitals & Hubs
  { city: 'Ahmedabad', area: 'Navrangpura', lat: 23.0365, lng: 72.5611, displayName: 'Navrangpura, Ahmedabad' },
  { city: 'Surat', area: 'Athwa Lines', lat: 21.1702, lng: 72.8311, displayName: 'Athwa, Surat' },
  { city: 'Jaipur', area: 'C-Scheme', lat: 26.9124, lng: 75.7873, displayName: 'C-Scheme, Jaipur' },
  { city: 'Lucknow', area: 'Hazratganj', lat: 26.8467, lng: 80.9462, displayName: 'Hazratganj, Lucknow' },
  { city: 'Bhopal', area: 'MP Nagar', lat: 23.2324, lng: 77.4343, displayName: 'MP Nagar, Bhopal' },
  { city: 'Indore', area: 'Vijay Nagar', lat: 22.7533, lng: 75.8937, displayName: 'Vijay Nagar, Indore' },
  { city: 'Patna', area: 'Frazer Road', lat: 25.6111, lng: 85.1444, displayName: 'Frazer Road, Patna' },
  { city: 'Chandigarh', area: 'Sector 17', lat: 30.7415, lng: 76.7681, displayName: 'Sector 17 Plaza, Chandigarh' },
  { city: 'Bhubaneswar', area: 'Saheed Nagar', lat: 20.2961, lng: 85.8245, displayName: 'Saheed Nagar, Bhubaneswar' },
];

/**
 * Searches local database and geocodes matching text to coordinates with fuzzy token and stemming matching.
 * Returns coordinates along with detected city and area so inputs can be automatically updated.
 */
export function lookupLocalPlaceCoordinates(
  cityQuery: string,
  areaQuery: string
): { lat: number; lng: number; matchedName: string; matchedCity?: string; matchedArea?: string } | null {
  const cleanCity = (cityQuery || '').toLowerCase().trim();
  const cleanArea = (areaQuery || '').toLowerCase().trim();

  const combined = `${cleanArea} ${cleanCity}`.trim();
  if (!combined) return null;

  // City aliases normalization
  const normalizeCityName = (name: string) =>
    name
      .replace('bangalore', 'bengaluru')
      .replace('vizag', 'visakhapatnam')
      .replace('calcutta', 'kolkata')
      .replace('bombay', 'mumbai')
      .replace('madras', 'chennai')
      .replace('gurgaon', 'gurugram')
      .replace('baroda', 'vadodara')
      .replace('trichy', 'tiruchirappalli');

  const normCity = normalizeCityName(cleanCity);

  // Extract individual tokens and stems (strip trailing 's' or 'es' on words with length > 4, like gajuwaks -> gajuwak)
  const rawTokens = combined
    .split(/[\s,.-]+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length >= 3);

  const stems = rawTokens
    .map((w) => (w.length > 4 && w.endsWith('s') ? w.replace(/s$/, '') : w))
    .sort((a, b) => b.length - a.length); // Longer, more distinctive words first!

  // 1. Direct match on area name or stemmed area in database
  const cleanedAreaStem = cleanArea.endsWith('s') && cleanArea.length > 4 ? cleanArea.replace(/s$/, '') : cleanArea;
  if (cleanArea) {
    const directAreaMatch = POPULAR_PLACES_DATABASE.find((p) => {
      const pArea = p.area.toLowerCase();
      const pDisp = p.displayName.toLowerCase();
      return (
        pArea.includes(cleanArea) ||
        cleanArea.includes(pArea) ||
        pDisp.includes(cleanArea) ||
        pArea.includes(cleanedAreaStem) ||
        cleanedAreaStem.includes(pArea) ||
        pDisp.includes(cleanedAreaStem)
      );
    });

    if (directAreaMatch) {
      return {
        lat: directAreaMatch.lat,
        lng: directAreaMatch.lng,
        matchedName: directAreaMatch.displayName,
        matchedCity: directAreaMatch.city,
        matchedArea: directAreaMatch.area,
      };
    }
  }

  // 2. Token & Stem matching across all database entries (e.g. "gajuwaks" matching "Gajuwaka" or "Old Gajuwaka")
  const genericModifiers = [
    'old',
    'new',
    'near',
    'road',
    'main',
    'ward',
    'lane',
    'street',
    'gate',
    'cross',
    'circle',
    'chowk',
    'colony',
    'block',
    'phase',
    'sector',
    'city',
  ];

  for (const stem of stems) {
    if (stem.length < 3) continue;
    // Don't match generic words alone if there are other tokens
    if (stems.length > 1 && genericModifiers.includes(stem)) continue;

    const tokenMatch = POPULAR_PLACES_DATABASE.find((p) => {
      const pArea = p.area.toLowerCase();
      const pDisp = p.displayName.toLowerCase();
      const pCity = p.city.toLowerCase();

      return (
        pArea.includes(stem) ||
        stem.includes(pArea) ||
        pDisp.includes(stem) ||
        pCity.includes(stem)
      );
    });

    if (tokenMatch) {
      return {
        lat: tokenMatch.lat,
        lng: tokenMatch.lng,
        matchedName: tokenMatch.displayName,
        matchedCity: tokenMatch.city,
        matchedArea: tokenMatch.area,
      };
    }
  }

  // 3. Match on city only if nothing else matched
  if (normCity && normCity.length >= 3) {
    const cityMatch = POPULAR_PLACES_DATABASE.find(
      (p) =>
        p.city.toLowerCase().includes(normCity) ||
        normCity.includes(p.city.toLowerCase())
    );
    if (cityMatch) {
      return {
        lat: cityMatch.lat,
        lng: cityMatch.lng,
        matchedName: `${cityMatch.city} Municipal Ward`,
        matchedCity: cityMatch.city,
        matchedArea: cityMatch.area,
      };
    }
  }

  return null;
}

/**
 * Geocode address with server proxy fallback to ensure 100% reliable coordinates.
 */
export async function geocodeAddress(
  city: string,
  area: string,
  street: string
): Promise<{ lat: number; lng: number; matchedName: string; matchedCity?: string; matchedArea?: string } | null> {
  // First check instant high-precision local database with token stemming
  const localResult = lookupLocalPlaceCoordinates(city, `${area} ${street}`);
  if (localResult) {
    return localResult;
  }

  // If local match not found, query server geocoding proxy
  const queryParam = [street, area].filter(Boolean).join(', ') || area || street;

  try {
    const response = await fetch(
      `/api/geocode?q=${encodeURIComponent(queryParam)}&city=${encodeURIComponent(city || '')}&area=${encodeURIComponent(area || '')}`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.lat && data.lng) {
        return {
          lat: data.lat,
          lng: data.lng,
          matchedName: data.displayName || `${area || city}, India`,
          matchedCity: data.city || city,
          matchedArea: data.area || area,
        };
      }
    }
  } catch (err) {
    console.warn('Server geocode failed, using local match:', err);
  }

  return localResult;
}
