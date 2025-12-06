import { useState } from "react";
import { Zap, Clock, Sun, TrendingUp } from "lucide-react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useChargingSchedule } from "../hooks/useChargingSchedule";

export const ChargingSchedulePredictor = () => {
  const [hour, setHour] = useState<number>(12);
  const [demand, setDemand] = useState<number>(1);
  const [solar, setSolar] = useState<number>(2);
  const [prediction, setPrediction] = useState<number | null>(null);

  const predictMutation = useChargingSchedule();

  const handlePredict = async () => {
    try {
      const result = await predictMutation.mutateAsync({
        hour,
        demand,
        solar,
      });
      if (result.data) {
        setPrediction(result.data.action);
      }
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const getActionLabel = (action: number): string => {
    const actions = [
      "No Action",
      "Slow Charging",
      "Fast Charging",
      "Optimal Charging",
    ];
    return actions[action] || "Unknown";
  };

  const getActionColor = (action: number): string => {
    const colors = [
      "bg-gray-100 text-gray-800",
      "bg-yellow-100 text-yellow-800",
      "bg-orange-100 text-orange-800",
      "bg-green-100 text-green-800",
    ];
    return colors[action] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card title="EV Charging Schedule Predictor" icon={<Zap size={20} />}>
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Hour (0-23)"
              type="number"
              min="0"
              max="23"
              value={hour.toString()}
              onChange={(e) => setHour(parseInt(e.target.value) || 0)}
              icon={<Clock size={16} />}
            />
          </div>
          <div>
            <Input
              label="Demand Level (0-2)"
              type="number"
              min="0"
              max="2"
              value={demand.toString()}
              onChange={(e) => setDemand(parseInt(e.target.value) || 0)}
              icon={<TrendingUp size={16} />}
            />
          </div>
          <div>
            <Input
              label="Solar Level (0-3)"
              type="number"
              min="0"
              max="3"
              value={solar.toString()}
              onChange={(e) => setSolar(parseInt(e.target.value) || 0)}
              icon={<Sun size={16} />}
            />
          </div>
        </div>

        <Button
          onClick={handlePredict}
          isLoading={predictMutation.isPending}
          className="w-full"
        >
          Predict Optimal Charging Action
        </Button>

        {prediction !== null && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Predicted Action:</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-lg font-semibold ${getActionColor(
                  prediction
                )}`}
              >
                {getActionLabel(prediction)}
              </span>
              <span className="text-sm text-gray-500">(Action #{prediction})</span>
            </div>
          </div>
        )}

        {predictMutation.isError && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">
              Error: {predictMutation.error instanceof Error ? predictMutation.error.message : "Failed to get prediction"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

