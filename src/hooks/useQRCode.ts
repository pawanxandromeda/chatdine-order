// src/hooks/useQRCode.ts
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import {
  getQRCodesApi,
  createQRCodeApi,
  updateQRCodeApi,
  toggleQRCodeStatusApi,
  deleteQRCodeApi,
  getQRCodeByIdApi,
} from '@/api/qrCodeApi';
import { IQRCode } from '@/types/qrCode';

interface UseQRCodeReturn {
  qrCodes: IQRCode[];
  loading: boolean;
  error: string | null;
  newTableNumber: string;
  newTableType: IQRCode['tableType'];
  setNewTableNumber: (value: string) => void;
  setNewTableType: (value: IQRCode['tableType']) => void;
  fetchQRCodes: () => Promise<void>;
  generateQRCode: () => Promise<void>;
  toggleQRCodeStatus: (id: string) => Promise<void>;
  deleteQRCode: (id: string) => Promise<void>;
  getQRCode: (id: string) => Promise<IQRCode | null>;
}

export const useQRCode = (): UseQRCodeReturn => {
  const [qrCodes, setQRCodes] = useState<IQRCode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newTableNumber, setNewTableNumber] = useState<string>('');
  const [newTableType, setNewTableType] = useState<IQRCode['tableType']>('indoor');

  // Fetch all QR codes
  const fetchQRCodes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getQRCodesApi();
      setQRCodes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch QR codes');
      toast.error('Fetch Failed ❌', {
        description: 'Unable to load QR codes. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate a new QR code
  const generateQRCode = useCallback(async () => {
    if (!newTableNumber.trim()) {
      toast.error('Missing Table Number ⚠️', {
        description: 'Please enter a valid table number before creating.',
      });
      return;
    }

    setLoading(true);
    try {
      const newQR = await createQRCodeApi({
        tableNumber: newTableNumber,
        tableType: newTableType,
      });
      setQRCodes([newQR, ...qrCodes]);
      setNewTableNumber('');
      setNewTableType('indoor');
      setError(null);
      toast.success('QR Code Created 🎉', {
        description: 'The new QR code has been generated successfully.',
      });
    } catch (err) {
      setError('Failed to create QR code');
      toast.error('Create Failed ❌', {
        description: 'Something went wrong while creating the QR code.',
      });
    } finally {
      setLoading(false);
    }
  }, [newTableNumber, newTableType, qrCodes]);

  // Toggle QR code status
  const toggleQRCodeStatus = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const updatedQR = await toggleQRCodeStatusApi(id);
        setQRCodes(qrCodes.map((qr) => (qr._id === id ? updatedQR : qr)));
        setError(null);
        toast.success('Status Updated 🔄', {
          description: `QR Code ${updatedQR.isActive ? 'enabled ✅' : 'disabled 🚫'} successfully.`,
        });
      } catch (err) {
        setError('Failed to toggle QR code status');
        toast.error('Toggle Failed ⚠️', {
          description: 'Could not change QR code status.',
        });
      } finally {
        setLoading(false);
      }
    },
    [qrCodes]
  );

  // Delete a QR code
  const deleteQRCode = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await deleteQRCodeApi(id);
        setQRCodes(qrCodes.filter((qr) => qr._id !== id));
        setError(null);
        toast.success('QR Code Deleted 🗑️', {
          description: 'The QR code has been deleted successfully.',
        });
      } catch (err) {
        setError('Failed to delete QR code');
        toast.error('Delete Failed ❌', {
          description: 'Unable to delete QR code. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    },
    [qrCodes]
  );

  // Get a single QR code by ID
  const getQRCode = useCallback(async (id: string): Promise<IQRCode | null> => {
    setLoading(true);
    try {
      const qrCode = await getQRCodeByIdApi(id);
      setError(null);
      return qrCode;
    } catch (err) {
      setError('Failed to fetch QR code');
      toast.error('Fetch Failed ❌', {
        description: 'Unable to fetch QR code details.',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch QR codes on mount
  useEffect(() => {
    fetchQRCodes();
  }, [fetchQRCodes]);

  return {
    qrCodes,
    loading,
    error,
    newTableNumber,
    newTableType,
    setNewTableNumber,
    setNewTableType,
    fetchQRCodes,
    generateQRCode,
    toggleQRCodeStatus,
    deleteQRCode,
    getQRCode,
  };
};
