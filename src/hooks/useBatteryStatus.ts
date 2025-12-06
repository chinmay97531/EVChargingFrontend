import { useQuery } from "@tanstack/react-query";
import { batteryService } from "../services/battery.service";

export const useBatteryStatus = (carId?: number) => {
  return useQuery({
    queryKey: ["batteryStatus", carId],
    queryFn: () => batteryService.getBatteryStatus(carId),
    staleTime: 30000, // 30 seconds
  });
};

