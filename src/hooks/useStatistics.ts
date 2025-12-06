import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "../services/statistics.service";

export const useStatistics = (
  carId?: number,
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ["statistics", carId, startDate, endDate],
    queryFn: () => statisticsService.getStatistics(carId, startDate, endDate),
    staleTime: 60000, // 1 minute
  });
};

