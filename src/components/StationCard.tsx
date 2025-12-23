import { MapPin, Zap, Battery, DollarSign, Navigation } from "lucide-react";
import { Station } from "../services/station.service";

interface StationCardProps {
  station: Station;
  onSelect?: () => void;
}

export const StationCard = ({ station, onSelect }: StationCardProps) => {
  const address = `${station.address.line1}, ${station.address.town}, ${station.address.state} ${station.address.postcode}`;

  // Construct the Google Maps URL using coordinates for precision
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.geolocation.latitude},${station.geolocation.longitude}`;

  const handleDirectionsClick = (e: React.MouseEvent) => {
    // Prevent the card's onSelect from firing when clicking the button
    e.stopPropagation();
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer group"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {station.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
             {/* Operational Status Badge */}
             <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
               station.isOperational 
                 ? "bg-green-100 text-green-700 border border-green-200" 
                 : "bg-red-100 text-red-700 border border-red-200"
             }`}>
               {station.status || (station.isOperational ? "Operational" : "Closed")}
             </span>
             
             {station.address.distance > 0 && (
              <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                {station.address.distance.toFixed(1)} km
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Address Section */}
        <div className="flex items-start gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
          <MapPin size={18} className="mt-0.5 flex-shrink-0 text-gray-400" />
          <p className="text-sm leading-snug">{address}</p>
        </div>

        {/* Chargers Summary */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
            <Zap size={16} className="text-blue-600 fill-blue-600" />
            <span className="font-semibold">{station.FastChargers} Fast</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700 bg-green-50 px-3 py-1.5 rounded-md border border-green-100">
            <Battery size={16} className="text-green-600" />
            <span className="font-semibold">{station.SlowChargers} Slow</span>
          </div>
        </div>

        {/* Charger Types Tags */}
        {station.typesOfChargers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {station.typesOfChargers.map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded border border-gray-200"
              >
                {type.type} <span className="text-gray-400">×{type.count}</span>
              </span>
            ))}
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <DollarSign size={16} />
            <span className="text-xs">Paid Charging</span>
          </div>

          <button
            onClick={handleDirectionsClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Navigation size={16} />
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};