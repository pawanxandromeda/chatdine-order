// src/types/qrCode.ts
export interface IQRCode {
  _id: string;
  tableNumber: string;
  tableType: 'indoor' | 'outdoor' | 'bar' | 'vip';
  url: string;
  scans: number;
  isActive: boolean;
  createdAt: Date;
  lastScan?: Date;
}