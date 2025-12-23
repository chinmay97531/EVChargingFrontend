import { useState } from "react";
import { Zap, Sparkles, CheckCircle, AlertCircle, Clock, BatteryCharging, Sun, Grid, Battery } from "lucide-react";
import { Button } from "./ui/Button";
import { useChargingSchedule } from "../hooks/useChargingSchedule";

// --- Helper Functions ---

const getActionDetails = (action: any) => {
  // Safe check: if action is null/undefined or not an array
  if (!action || !Array.isArray(action)) {
    return { speed: "N/A", source: "N/A" };
  }
  
  const [speed, source] = action;
  
  const format = (str: string | null) => 
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "None";

  return {
    speed: format(speed),
    source: format(source)
  };
};

const SourceIcon = ({ source }: { source: string }) => {
  const s = (source || "").toLowerCase();
  if (s.includes("solar")) return <Sun className="w-5 h-5 text-orange-500" />;
  if (s.includes("grid")) return <Grid className="w-5 h-5 text-gray-500" />;
  if (s.includes("battery")) return <Battery className="w-5 h-5 text-green-500" />;
  return <CheckCircle className="w-5 h-5 text-blue-500" />;
};

// --- Main Component ---

export const ChargingSchedulePredictor = () => {
  const [currentSoc, setCurrentSoc] = useState<number>(40);
  const [requiredSoc, setRequiredSoc] = useState<number>(80);
  const [hoursRemaining, setHoursRemaining] = useState<number>(2);
  const [preference, setPreference] = useState<string>("fastest");
  const [timeSlot, setTimeSlot] = useState<number>(new Date().getHours());
  const [solarKw, setSolarKw] = useState<number>(30);
  const [price, setPrice] = useState<number>(0.2);
  const [stationBattery, setStationBattery] = useState<number>(50);
  
  const [result, setResult] = useState<any>(null);

  const predictMutation = useChargingSchedule();

  const handlePredict = async () => {
    try {
      setResult(null); // Reset previous result while loading
      
      const rawResponse = await predictMutation.mutateAsync({
        current_soc: currentSoc,
        required_soc: requiredSoc,
        hours_remaining: hoursRemaining,
        preference,
        solar_kw: solarKw,
        price,
        station_battery_kwh: stationBattery,
        time_slot: timeSlot,
      });

      console.log("🔮 Raw API Response:", rawResponse);

      // FIX: Handle both Axios response wrapper ({ data: ... }) and direct response
      // If rawResponse.data exists, use it; otherwise use rawResponse directly.
      const responseData = rawResponse?.data || rawResponse;

      if (responseData?.status === "ok") {
        console.log("✅ Setting result:", responseData.result);
        setResult(responseData.result);
      } else {
        console.warn("⚠️ valid 'status: ok' not found in response:", responseData);
      }
    } catch (error) {
      console.error("❌ Prediction error:", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-indigo-100 overflow-hidden hover-lift">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-400 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">AI Charging Schedule Predictor</h3>
            <p className="text-indigo-100 text-sm">Machine learning powered optimization</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current SoC (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={currentSoc}
              onChange={(e) => setCurrentSoc(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Required SoC (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={requiredSoc}
              onChange={(e) => setRequiredSoc(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hours Remaining</label>
            <input
              type="number"
              min="0"
              value={hoursRemaining}
              onChange={(e) => setHoursRemaining(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preference</label>
            <select
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            >
              <option value="fastest">Fastest</option>
              <option value="cheapest">Cheapest</option>
              <option value="solar">Prefer Solar</option>
              <option value="grid">Prefer Grid</option>
              <option value="">No Preference</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Solar kW (optional)</label>
            <input
              type="number"
              value={solarKw}
              onChange={(e) => setSolarKw(parseFloat(e.target.value) || 0)}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Grid Price ($/kWh, optional)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Station Battery (kWh)</label>
            <input
              type="number"
              value={stationBattery}
              onChange={(e) => setStationBattery(parseFloat(e.target.value) || 0)}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Time Slot (0-23)</label>
            <input
              type="number"
              min="0"
              max="23"
              value={timeSlot}
              onChange={(e) => setTimeSlot(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handlePredict}
              isLoading={predictMutation.isPending}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Predict Optimal Action
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {result ? (
          <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 animate-fade-in">
            <div className="flex items-center gap-3 mb-4 border-b border-indigo-100 pb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <p className="text-lg font-bold text-gray-800">AI Recommendation Found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {/* 1. Charging Time Card */}
              <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center justify-center text-center">
                <Clock className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Est. Time</span>
                <span className="text-xl font-bold text-gray-900 mt-1">
                  {result.estimated_hours_to_complete 
                    ? `${result.estimated_hours_to_complete.toFixed(2)} hrs` 
                    : "N/A"}
                </span>
              </div>

               {/* 2. Speed and Source */}
               {(() => {
                 const { speed, source } = getActionDetails(result.recommended_action);
                 return (
                   <>
                    <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center justify-center text-center">
                      <BatteryCharging className="w-8 h-8 text-purple-500 mb-2" />
                      <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Speed</span>
                      <span className="text-xl font-bold text-gray-900 mt-1">{speed}</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center justify-center text-center">
                      <div className="mb-2">
                         <SourceIcon source={source} />
                      </div>
                      <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Source</span>
                      <span className="text-xl font-bold text-gray-900 mt-1">{source}</span>
                    </div>
                   </>
                 );
               })()}
            </div>
          </div>
        ) : null}

        {/* Error State */}
        {predictMutation.isError && (
          <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm font-semibold text-red-800">Prediction Error</p>
            </div>
            <p className="text-sm text-red-600 mt-2">
              {predictMutation.error instanceof Error 
                ? predictMutation.error.message 
                : "Failed to get prediction."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};