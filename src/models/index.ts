// TypeScript interfaces mapped from Prisma schema (backend)

export type Role = 'USER' | 'ADMIN' | 'STAFF';

export interface User {
  id: number;
  username?: string;
  email: string;
  role: Role;
  status: boolean;
  remarks?: string | null;
}

export interface Car {
  id: number;
  userId: number;
  name: string;
  model: string;
  number?: string | null;
  currentBatteryHealth: number;
  capacityOfBattery: number;
  currentBatteryStatus: number;
  typeOfPort?: string | null;
  fastSupporting?: boolean | null;
  status: boolean;
  remarks?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type ChargingType = 'SLOW' | 'FAST' | 'DYNAMIC';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface ChargingStation {
  id: number;
  name: string;
  capacity: number;
  solarCapacity: number;
  avaliableSlots: number;
  status: boolean;
  remarks?: string | null;
}

export interface Booking {
  id: number;
  userId: number;
  chargingStationId: number;
  startTime: string;
  endTime: string;
  slotNumber: number;
  typeOfCharging: ChargingType;
  isOccupied: string;
  status: BookingStatus;
  remarks?: string | null;
}

export type PaymnetType = 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING' | 'WALLET' | 'CASH';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface Payment {
  id: number;
  bookingId: number;
  userId: number;
  amount: number;
  originalAmount: number;
  savings: number;
  paymentMode: PaymnetType;
  status: PaymentStatus;
  remarks?: string | null;
  createdAt?: string;
}

export interface EnergyPoint {
  label: string; // date label
  value: number;
}

export interface LabelValue {
  label: string;
  value: number;
}

