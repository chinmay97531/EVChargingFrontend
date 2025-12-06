import { MapPin, Zap, Battery, DollarSign } from "lucide-react";
import { Station } from "../services/station.service";

interface StationCardProps {
  station: Station;
  onSelect?: () => void;
}

export const StationCard = ({ station, onSelect }: StationCardProps) => {
  const address = `${station.address.line1}, ${station.address.town}, ${station.address.state} ${station.address.postcode}`;

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{station.name}</h3>
        {station.address.distance > 0 && (
          <span className="text-sm text-gray-500">
            {station.address.distance.toFixed(2)} km away
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2 text-gray-600">
          <MapPin size={18} className="mt-1 flex-shrink-0" />
          <p className="text-sm">{address}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-blue-600">
            <Zap size={16} />
            <span className="font-medium">
              {station.FastChargers} Fast Chargers
            </span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <Battery size={16} />
            <span className="font-medium">
              {station.SlowChargers} Slow Chargers
            </span>
          </div>
        </div>

        {station.typesOfChargers.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {station.typesOfChargers.map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {type.type} ({type.count})
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
          <DollarSign size={16} />
          <span>Pricing available at station</span>
        </div>
      </div>
    </div>
  );
};

