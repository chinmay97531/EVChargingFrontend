import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "../services/car.service";

export const useCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: () => carService.getCarDetails(),
    staleTime: 60000, // 1 minute
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId: number) => carService.deleteCar(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["batteryStatus"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
    },
  });
};

