import NavBar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

/** Prefer env var; fallback to the provided key (not ideal on client) */
const OCM_API_KEY =
  import.meta.env?.VITE_OPEN_CHARGE_MAPS_API_KEY ||
  "b37e088c-05b2-4660-ba12-2c80cadc6704";

/** Small geocoder using OpenStreetMap Nominatim (no key required) */
async function geocodeCity(city: string, state: string) {
  const q = encodeURIComponent(`${city}, ${state}, India`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=1`;
  const res = await fetch(url, {
    headers: { "Accept-Language": "en" },
  });
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No coordinates found for this city");
  }
  const { lat, lon } = data[0];
  return { lat: Number(lat), lon: Number(lon) };
}

/** Fetch stations from Open Charge Map near lat/lon within 500km */
async function fetchStationsOCM({ lat, lon, distanceKm = 500 }: { lat: number; lon: number; distanceKm?: number }) {
  const params = new URLSearchParams({
    output: "json",
    countrycode: "IN",
    latitude: String(lat),
    longitude: String(lon),
    distance: String(distanceKm),
    distanceunit: "KM",
    maxresults: "500",
    compact: "true",
    key: OCM_API_KEY,
  });

  const res = await fetch(`https://api.openchargemap.io/v3/poi/?${params.toString()}`, {
    headers: {
      "X-API-Key": OCM_API_KEY,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OCM error: ${res.status} ${text}`);
  }
  const raw = await res.json();
  return Array.isArray(raw) ? raw : [];
}

/** Shape OCM response into simple card data */
function normalizeStations(raw: any[]) {
  return raw.map((station: any) => {
    const ai = station?.AddressInfo || {};
    const conns = Array.isArray(station?.Connections) ? station.Connections : [];

    // Count types + fast/slow + find max power
    const typeCounts: Record<string, number> = {};
    let fast = 0;
    let slow = 0;
    let maxPowerKW = 0;
    for (const c of conns) {
      const type = c?.ConnectionType?.Title || "Unknown";
      typeCounts[type] = (typeCounts[type] || 0) + 1;
      const isFast = c?.Level?.IsFastChargeCapable === true;
      if (isFast) fast++;
      else slow++;
      const p = Number(c?.PowerKW || 0);
      if (Number.isFinite(p) && p > maxPowerKW) maxPowerKW = p;
    }

    const title = ai?.Title || "Unknown Station";
    const addressParts = [ai?.AddressLine1, ai?.Town, ai?.StateOrProvince, ai?.Postcode]
      .filter(Boolean)
      .join(", ");

    const typesLabel =
      Object.entries(typeCounts)
        .map(([t, n]) => `${t} × ${n}`)
        .join(" • ") || "Types: N/A";

    // Fallback “availability-style” text (OCM doesn’t give live slots)
    const availability =
      fast + slow > 0
        ? `Connectors: ${fast} fast • ${slow} slow`
        : (station?.StatusType?.Title ? `Status: ${station.StatusType.Title}` : "Status: Unknown");

    const lat = ai?.Latitude;
    const lon = ai?.Longitude;

    return {
      id: station?.ID || `${title}-${lat}-${lon}`,
      name: title,
      address: addressParts,
      chargers: `${typesLabel}${maxPowerKW ? ` (max ~${maxPowerKW} kW)` : ""}`,
      availability,
      lat,
      lon,
      // OCM distance is present only when you pass lat/lon in query:
      distanceKm: ai?.Distance ?? null,
      directionsUrl:
        lat && lon
          ? `https://www.google.com/maps?q=${encodeURIComponent(title)}@${lat},${lon}`
          : null,
    };
  });
}

function StationsPage() {
  const navigate = useNavigate();
  const { state, city } = useParams();

  const stateName = decodeURIComponent(state || "");
  const cityName = decodeURIComponent(city || "");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [stations, setStations] = useState<any[]>([]);

  const headerTitle = useMemo(
    () => `${cityName}${stateName ? `, ${stateName}` : ""}`,
    [cityName, stateName]
  );

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setErr("");

        // 1) Get city coordinates
        const { lat, lon } = await geocodeCity(cityName, stateName);

        // 2) Fetch OCM stations within 500 km
        const raw = await fetchStationsOCM({ lat, lon, distanceKm: 500 });

        // 3) Normalize
        const normalized = normalizeStations(raw);

        // 4) Sort by OCM-provided distance if available, else by name
        normalized.sort((a, b) => {
          const da = a.distanceKm ?? Number.POSITIVE_INFINITY;
          const db = b.distanceKm ?? Number.POSITIVE_INFINITY;
          if (da === db) return (a.name || "").localeCompare(b.name || "");
          return da - db;
        });

        if (!cancelled) setStations(normalized as any[]);
      } catch (e) {
        if (!cancelled) setErr((e as any)?.message || "Failed to load stations");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [cityName, stateName]);

  return (
    <div className="bg-gradient-to-b from-white to-gray-800 min-h-screen dark:from-gray-800 dark:to-white">
      <NavBar />
      <div className="flex justify-center items-center dark:text-white">
        <div className="flex flex-col justify-center items-center w-full px-6 py-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 rounded-lg bg-white/80 border border-gray-300 hover:bg-white transition text-gray-700"
            >
              ← Back
            </button>
            <h1 className="text-2xl md:text-4xl">{headerTitle}</h1>
          </div>

          {/* Status */}
          {loading && (
            <div className="text-gray-700 dark:text-gray-200 mb-4">Loading stations within 500 km…</div>
          )}
          {err && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
              {err}
            </div>
          )}

          {/* Stations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {!loading && !err && stations.map((s: any) => (
                <div
                  key={s.id}
                  className="rounded-2xl bg-white p-6 shadow-lg border border-gray-200 hover:scale-105 transition-all"
                >
                  <h3 className="text-[#20247b] font-bold text-xl mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{s.address || "Address unavailable"}</p>
                  <p className="text-sm font-medium">⚡ {s.chargers}</p>
                  <p className="text-sm text-green-700 font-semibold mt-1">{s.availability}</p>
                  {typeof s.distanceKm === "number" && (
                    <p className="text-xs mt-1 opacity-80">~ {s.distanceKm.toFixed(1)} km away</p>
                  )}

                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 rounded-lg bg-[#20247b] text-white hover:bg-[#1a1e6b] transition">
                      Book Slot
                    </button>
                    {s.directionsUrl ? (
                      <a
                        href={s.directionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                      >
                        Directions
                      </a>
                    ) : (
                      <button className="px-4 py-2 rounded-lg bg-gray-200 opacity-70 cursor-not-allowed">
                        Directions
                      </button>
                    )}
                  </div>
                </div>
              ))}

            {!loading && !err && stations.length === 0 && (
              <div className="text-center text-gray-600 col-span-full">
                No charging stations found within 500 km.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StationsPage;
