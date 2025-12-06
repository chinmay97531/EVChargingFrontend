import { useMutation } from "@tanstack/react-query";
import { chargingScheduleService, ChargingScheduleRequest } from "../services/chargingSchedule.service";

export const useChargingSchedule = () => {
  return useMutation({
    mutationFn: (data: ChargingScheduleRequest) =>
      chargingScheduleService.predict(data),
  });
};

