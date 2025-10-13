import { useState } from "react";
import { CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentSectionProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PaymentSection = ({
  amount,
  onSuccess,
  onCancel,
}: PaymentSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Card className="glass p-6 border-border/50 animate-slide-up">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your order has been confirmed
          </p>
          <p className="text-sm text-muted-foreground">
            Estimated preparation time: <span className="font-semibold text-foreground">15-20 minutes</span>
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass p-6 border-border/50 animate-slide-up">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Payment</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted/30 rounded-2xl">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold text-primary mt-1">
            ${amount.toFixed(2)}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="card-number" className="text-sm font-medium">
              Card Number
            </Label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              className="mt-1.5 h-12 rounded-2xl bg-muted/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="expiry" className="text-sm font-medium">
                Expiry
              </Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                className="mt-1.5 h-12 rounded-2xl bg-muted/50"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-sm font-medium">
                CVV
              </Label>
              <Input
                id="cvv"
                placeholder="123"
                className="mt-1.5 h-12 rounded-2xl bg-muted/50"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-12 rounded-2xl"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 h-12 rounded-2xl font-semibold"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
