import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from './api'
import type { LabelValue, EnergyPoint, Car, Booking, User } from '../models'

// Profile
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.post('/getUserDetails', {})
      return data.data as User
    },
  })
}

// Cars
export const useCarDetails = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const { data } = await api.post('/getCarDetails', {})
      return (data.data.cars as Car[]) || []
    },
  })
}

export const useInsertCar = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Car>) => {
      const token = localStorage.getItem('token'); 

      // 1. Map Frontend keys to Backend's expected keys (including Backend typos)
      const backendPayload = {
        carName: payload.name,
        carModel: payload.model,
        carNumber: payload.number,
        
        // Backend uses 'Battrey' (typo) instead of 'Battery'
        currentBattreyHealth: payload.currentBatteryHealth,
        capacityOfBattrey: payload.capacityOfBattery,
        currentBattreyStatus: payload.currentBatteryStatus,

        typeOfPort: payload.typeOfPort,

        // Backend expects a string "Fast"/"Slow", frontend has boolean
        FastAndSlow: payload.fastSupporting ? "Fast" : "Slow" 
      };

      // 2. Send the mapped payload
      const { data } = await api.post('/insertCarData', backendPayload, {
        headers: {
          // Standard convention is 'Authorization', not 'token'. 
          // If your middleware specifically needs 'token', change this back to 'token'.
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });

      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (error) => {
      console.error("Failed to insert car:", error);
    }
  });
};

export const useDeleteCar = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: { carId: number }) => {
      const { data } = await api.post('/deleteCarDetails', body)
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cars'] })
  })
}

// Bookings
export const useCreateBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: { lat: number; long: number }) => {
      const { data } = await api.post('/booking', body)
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] })
  })
}

export const useGetChargingSessions = () => {
  return useQuery({
    queryKey: ['chargingSessions'],
    queryFn: async () => {
      const { data } = await api.post('/getChargingSessions', {})
      return (data.data.sessions as Booking[]) || []
    },
  })
}

export const useCompleteBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: { bookingId: number }) => {
      const { data } = await api.post('/completeBooking', body)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['chargingSessions'] })
      qc.invalidateQueries({ queryKey: ['bookings'] })
    }
  })
}

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data } = await api.post('/getAllBookings', { limit: 50, offset: 0 })
      return (data.data as Booking[]) || []
    },
  })
}

// Payments
export const useCreatePayment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: { bookingId: number; amount: number; paymentMode: string }) => {
      const { data } = await api.post('/payment', body)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bookings'] })
      qc.invalidateQueries({ queryKey: ['payments'] })
    }
  })
}

export const usePaymentsByMode = (_params?: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: ['stats', 'paymentsByMode'],
    queryFn: async () => {
      const { data } = await api.get('/stats/payments-by-mode')
      return (data.data as LabelValue[]) || []
    },
  })
}

export const useSessionsOverTime = (granularity = 'daily') => {
  return useQuery({
    queryKey: ['stats', 'sessions', granularity],
    queryFn: async () => {
      const { data } = await api.get(`/stats/sessions-over-time?granularity=${granularity}`)
      return (data.data as EnergyPoint[]) || []
    },
  })
}

export const useRevenueOverTime = (granularity = 'daily') => {
  return useQuery({
    queryKey: ['stats', 'revenue', granularity],
    queryFn: async () => {
      const { data } = await api.get(`/stats/revenue-over-time?granularity=${granularity}`)
      return (data.data as EnergyPoint[]) || []
    },
  })
}

export const useEnergyConsumption = (granularity = 'daily') => {
  return useQuery({
    queryKey: ['stats', 'energy', granularity],
    queryFn: async () => {
      const { data } = await api.get(`/stats/energy-consumption?granularity=${granularity}`)
      return (data.data as EnergyPoint[]) || []
    },
  })
}

export const useSoCTrends = (granularity = 'daily') => {
  return useQuery({
    queryKey: ['stats', 'soc', granularity],
    queryFn: async () => {
      const { data } = await api.get(`/stats/soc-trends?granularity=${granularity}`)
      return (data.data as EnergyPoint[]) || []
    },
  })
}
