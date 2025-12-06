import { Battery, Calendar } from "lucide-react";
import { BatteryStatus } from "../services/battery.service";
import { Card } from "./ui/Card";

interface BatteryDisplayProps {
  batteryStatus: BatteryStatus;
}

export const BatteryDisplay = ({ batteryStatus }: BatteryDisplayProps) => {
  const getSocColor = (soc: number) => {
    if (soc >= 80) return "text-green-600";
    if (soc >= 50) return "text-yellow-600";
    if (soc >= 20) return "text-orange-600";
    return "text-red-600";
  };

  const getSohColor = (soh: number) => {
    if (soh >= 90) return "text-green-600";
    if (soh >= 80) return "text-yellow-600";
    if (soh >= 70) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <Card title="Battery Status" icon={<Battery size={20} />}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">State of Charge (SOC)</p>
            <p className={`text-2xl font-bold ${getSocColor(batteryStatus.soc)}`}>
              {batteryStatus.soc.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">State of Health (SOH)</p>
            <p className={`text-2xl font-bold ${getSohColor(batteryStatus.soh)}`}>
              {batteryStatus.soh.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Last Updated: {new Date(batteryStatus.timestamp).toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Date: {batteryStatus.date}
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                batteryStatus.soc >= 80
                  ? "bg-green-600"
                  : batteryStatus.soc >= 50
                  ? "bg-yellow-600"
                  : batteryStatus.soc >= 20
                  ? "bg-orange-600"
                  : "bg-red-600"
              }`}
              style={{ width: `${batteryStatus.soc}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Battery Level</p>
        </div>
      </div>
    </Card>
  );
};

