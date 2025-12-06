import api from "../lib/api";

export interface NumericalStats {
  totalChargingSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  totalAmountPaid: number;
  totalSavings: number;
  averageSessionDuration: number;
  totalEnergyConsumed: number;
}

export interface ChartDataset {
  label: string;
  data: number[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface GraphicalStats {
  socTrends: ChartData;
  chargingSessionsOverTime: ChartData;
  revenueTrends: ChartData;
  energyConsumption: ChartData;
}

export interface Statistics {
  numerical: NumericalStats;
  graphical: GraphicalStats;
}

export interface StatisticsResponse {
  success: boolean;
  message: string;
  data?: Statistics;
}

export const statisticsService = {
  getStatistics: async (
    carId?: number,
    startDate?: string,
    endDate?: string
  ): Promise<StatisticsResponse> => {
    const params: Record<string, string> = {};
    if (carId) params.carId = carId.toString();
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/statistics", { params });
    return response.data;
  },
};

