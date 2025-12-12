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
  getUserFoodCourtApi,
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
   foodCourtId: string | null;
     foodCourtLoading: boolean; // ✅ add this line

  fetchFoodCourt: () => Promise<void>;
}

export const useQRCode = (): UseQRCodeReturn => {
  const [qrCodes, setQRCodes] = useState<IQRCode[]>([]);
  const [foodCourtLoading, setFoodCourtLoading] = useState<boolean>(false);

   const [foodCourtId, setFoodCourtId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newTableNumber, setNewTableNumber] = useState<string>('');
  const [newTableType, setNewTableType] = useState<IQRCode['tableType']>('indoor');



const fetchFoodCourt = useCallback(async () => {
  setFoodCourtLoading(true);
  try {
  const response = await getUserFoodCourtApi();

// MongoDB always returns _id
if (response && ( response.id)) {
  setFoodCourtId(  response.id);
} else {
  console.warn("Foodcourt response did not include _id or id", response);
}

  } catch (err) {
    console.error('Failed to fetch foodcourt:', err);
    toast.error('Failed to load foodcourt information');
  } finally {
    setFoodCourtLoading(false);
  }
}, []);
  
  // Fetch all QR codes
  const fetchQRCodes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getQRCodesApi();
      setQRCodes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch QR codes');
      toast.error('Unable to load QR codes. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate a new QR code
  const generateQRCode = useCallback(async () => {
    if (!newTableNumber.trim()) {
      toast.error('Please enter a valid table number before creating.');
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
      toast.success('The new QR code has been generated successfully.');
    } catch (err) {
      setError('Failed to create QR code');
      toast.error('Something went wrong while creating the QR code.');
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
        toast.success(`QR Code ${updatedQR.isActive ? 'enabled ✅' : 'disabled 🚫'} successfully.`);
      } catch (err) {
        setError('Failed to toggle QR code status');
        toast.error('Could not change QR code status.');
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
        toast.success('The QR code has been deleted successfully.');
      } catch (err) {
        setError('Failed to delete QR code');
        toast.error('Unable to delete QR code. Please try again.');
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
      toast.error('Unable to fetch QR code details.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch QR codes on mount
  useEffect(() => {
    fetchQRCodes();
  }, [fetchQRCodes]);

  // Fetch user's food court context on mount (if not already loaded)
  useEffect(() => {
    if (!foodCourtId && !foodCourtLoading) {
      fetchFoodCourt();
    }
  }, [fetchFoodCourt, foodCourtId, foodCourtLoading]);

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
  foodCourtId,
  foodCourtLoading,
  fetchFoodCourt,
};

};
