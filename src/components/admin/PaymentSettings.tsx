import { useState, useEffect } from "react";
import { CreditCard, DollarSign, Wallet, CheckCircle2, AlertCircle, Banknote, Shield, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  createRazorpayAccountApi, 
  getPayoutAccountApi, 
  updatePayoutAccountApi,
  deletePayoutAccountApi,
  testPayoutApi 
} from "@/api/payoutApi";
import { toast } from "sonner";

interface AccountDetails {
  name: string;
  ifsc: string;
  accountNumber: string;
  vpa: string;
}

interface ValidationErrors {
  name?: string;
  ifsc?: string;
  accountNumber?: string;
  vpa?: string;
}

export const PaymentSettings = () => {
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  const [isPayPalConnected, setIsPayPalConnected] = useState(false);
  const [isRazorpayConnected, setIsRazorpayConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [razorpayAccount, setRazorpayAccount] = useState<any>(null);
  const [accountType, setAccountType] = useState<"bank_account" | "vpa">("bank_account");
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    name: "",
    ifsc: "",
    accountNumber: "",
    vpa: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [payoutHistory, setPayoutHistory] = useState<any[]>([]);

  // Fetch existing payout account on component mount
  useEffect(() => {
    fetchPayoutAccount();
  }, []);

  const fetchPayoutAccount = async () => {
    try {
      setIsLoading(true);
      const response = await getPayoutAccountApi();
      
      if (response.success && response.payoutAccount) {
        setRazorpayAccount(response.payoutAccount);
        setIsRazorpayConnected(true);
        setAccountType(response.payoutAccount.accountType);
        setAccountDetails(response.payoutAccount.accountDetails);
      }
    } catch (error) {
      console.error("Failed to fetch payout account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!accountDetails.name.trim()) {
      errors.name = "Account holder name is required";
    } else if (accountDetails.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (accountType === "bank_account") {
      if (!accountDetails.ifsc.trim()) {
        errors.ifsc = "IFSC code is required";
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(accountDetails.ifsc)) {
        errors.ifsc = "Invalid IFSC code format";
      }
      
      if (!accountDetails.accountNumber.trim()) {
        errors.accountNumber = "Account number is required";
      } else if (!/^\d+$/.test(accountDetails.accountNumber)) {
        errors.accountNumber = "Account number must contain only digits";
      } else if (accountDetails.accountNumber.length < 9 || accountDetails.accountNumber.length > 18) {
        errors.accountNumber = "Account number must be 9-18 digits";
      }
    } else if (accountType === "vpa") {
      if (!accountDetails.vpa.trim()) {
        errors.vpa = "VPA is required";
      } else if (!/^[\w.-]+@[\w]+$/.test(accountDetails.vpa)) {
        errors.vpa = "Invalid VPA format. Example: username@upi";
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateRazorpayAccount = async () => {
    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        accountType,
        accountDetails,
      };

      const data = await createRazorpayAccountApi(payload);

      setRazorpayAccount(data.payoutAccount);
      setIsRazorpayConnected(true);
      
      toast.success("Payout account created successfully!");
      
      // Suggest verification
      toast.info("Consider verifying your account with a test payout", {
        duration: 5000,
      });

    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAccount = async () => {
    if (!razorpayAccount?.fundAccountId) return;
    
    setIsVerifying(true);
    try {
      const response = await testPayoutApi({
        fundAccountId: razorpayAccount.fundAccountId
      });
      
      toast.success("Test payout initiated. Check your account for ₹1.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdateAccount = async () => {
    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        accountType,
        accountDetails,
      };

      const response = await updatePayoutAccountApi(payload);
      
      setRazorpayAccount(response.payoutAccount);
      toast.success("Account updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect your payout account?")) {
      return;
    }

    setLoading(true);
    try {
      await deletePayoutAccountApi();
      
      setRazorpayAccount(null);
      setIsRazorpayConnected(false);
      setAccountDetails({
        name: "",
        ifsc: "",
        accountNumber: "",
        vpa: "",
      });
      
      toast.success("Account disconnected successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Disconnect failed");
    } finally {
      setLoading(false);
    }
  };

  const maskAccountNumber = (accountNumber: string): string => {
    if (!accountNumber) return "";
    return accountNumber.slice(0, 2) + "X".repeat(accountNumber.length - 4) + accountNumber.slice(-2);
  };

  const maskVpa = (vpa: string): string => {
    if (!vpa) return "";
    const [username, provider] = vpa.split('@');
    if (username.length <= 3) return vpa;
    return username.slice(0, 2) + "X".repeat(username.length - 2) + "@" + provider;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Payment Settings
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Securely connect and manage your payment providers
          </p>
        </div>

        {!isStripeConnected && !isPayPalConnected && !isRazorpayConnected && (
          <Alert className="border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Connect at least one payment provider to start accepting payments
            </AlertDescription>
          </Alert>
        )}

        <Card className="glass border-border/50 hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <Banknote className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    Razorpay Payouts
                    <Badge variant="outline" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Encrypted
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Receive payments and payouts directly to your bank account or UPI
                  </CardDescription>
                </div>
              </div>
              {isRazorpayConnected && (
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  Connected
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue={isRazorpayConnected ? "view" : "setup"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="setup">Setup Account</TabsTrigger>
                <TabsTrigger value="view" disabled={!isRazorpayConnected}>
                  Account Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="setup" className="space-y-4">
                {error && (
                  <Alert className="border-destructive/20 bg-destructive/5">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Account Holder Name *
                    {validationErrors.name && (
                      <span className="text-destructive text-xs ml-2">{validationErrors.name}</span>
                    )}
                  </Label>
                  <Input
                    id="name"
                    value={accountDetails.name}
                    onChange={(e) => {
                      setAccountDetails({ ...accountDetails, name: e.target.value });
                      if (validationErrors.name) {
                        setValidationErrors({ ...validationErrors, name: undefined });
                      }
                    }}
                    placeholder="Full Name as per Bank Records"
                    className={`rounded-2xl h-11 ${validationErrors.name ? 'border-destructive' : ''}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>
                    Account Type *
                  </Label>
                  <div className="flex gap-4">
                    <Button
                      variant={accountType === "bank_account" ? "default" : "outline"}
                      onClick={() => {
                        setAccountType("bank_account");
                        setValidationErrors({});
                      }}
                      className="rounded-2xl"
                    >
                      Bank Account
                    </Button>
                    <Button
                      variant={accountType === "vpa" ? "default" : "outline"}
                      onClick={() => {
                        setAccountType("vpa");
                        setValidationErrors({});
                      }}
                      className="rounded-2xl"
                    >
                      UPI (VPA)
                    </Button>
                  </div>
                </div>

                {accountType === "bank_account" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="ifsc">
                        IFSC Code *
                        {validationErrors.ifsc && (
                          <span className="text-destructive text-xs ml-2">{validationErrors.ifsc}</span>
                        )}
                      </Label>
                      <Input
                        id="ifsc"
                        value={accountDetails.ifsc}
                        onChange={(e) => {
                          setAccountDetails({ ...accountDetails, ifsc: e.target.value.toUpperCase() });
                          if (validationErrors.ifsc) {
                            setValidationErrors({ ...validationErrors, ifsc: undefined });
                          }
                        }}
                        placeholder="SBIN0000123"
                        className={`rounded-2xl h-11 ${validationErrors.ifsc ? 'border-destructive' : ''}`}
                        maxLength={11}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">
                        Account Number *
                        {validationErrors.accountNumber && (
                          <span className="text-destructive text-xs ml-2">{validationErrors.accountNumber}</span>
                        )}
                      </Label>
                      <div className="relative">
                        <Input
                          id="accountNumber"
                          type={showAccountNumber ? "text" : "password"}
                          value={accountDetails.accountNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setAccountDetails({ ...accountDetails, accountNumber: value });
                            if (validationErrors.accountNumber) {
                              setValidationErrors({ ...validationErrors, accountNumber: undefined });
                            }
                          }}
                          placeholder="1234567890"
                          className={`rounded-2xl h-11 pr-10 ${validationErrors.accountNumber ? 'border-destructive' : ''}`}
                          maxLength={18}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowAccountNumber(!showAccountNumber)}
                        >
                          {showAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="vpa">
                      VPA (Virtual Payment Address) *
                      {validationErrors.vpa && (
                        <span className="text-destructive text-xs ml-2">{validationErrors.vpa}</span>
                      )}
                    </Label>
                    <Input
                      id="vpa"
                      value={accountDetails.vpa}
                      onChange={(e) => {
                        setAccountDetails({ ...accountDetails, vpa: e.target.value });
                        if (validationErrors.vpa) {
                          setValidationErrors({ ...validationErrors, vpa: undefined });
                        }
                      }}
                      placeholder="username@upi"
                      className={`rounded-2xl h-11 ${validationErrors.vpa ? 'border-destructive' : ''}`}
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 rounded-2xl premium-gradient"
                    onClick={isRazorpayConnected ? handleUpdateAccount : handleCreateRazorpayAccount}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        {isRazorpayConnected ? "Updating..." : "Connecting..."}
                      </>
                    ) : isRazorpayConnected ? "Update Account" : "Connect Razorpay"}
                  </Button>
                  
                  {isRazorpayConnected && (
                    <Button
                      variant="outline"
                      className="rounded-2xl"
                      onClick={handleVerifyAccount}
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        "Verify Account"
                      )}
                    </Button>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground pt-2">
                  <p className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Your bank details are encrypted and stored securely. We never store plaintext data.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="view" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <p className="text-sm font-medium mb-1">Account Type</p>
                      <p className="text-lg font-semibold capitalize">
                        {accountType === "bank_account" ? "Bank Account" : "UPI"}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <p className="text-sm font-medium mb-1">Account Status</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-lg font-semibold">Active</span>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-muted/30">
                      <p className="text-sm font-medium mb-1">Account Holder</p>
                      <p className="text-lg font-semibold">{accountDetails.name}</p>
                    </div>
                    
                    {accountType === "bank_account" ? (
                      <>
                        <div className="p-4 rounded-2xl bg-muted/30">
                          <p className="text-sm font-medium mb-1">IFSC Code</p>
                          <p className="text-lg font-semibold">{accountDetails.ifsc}</p>
                        </div>
                        
                        <div className="p-4 rounded-2xl bg-muted/30">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">Account Number</p>
                            <button
                              onClick={() => setShowAccountNumber(!showAccountNumber)}
                              className="text-xs text-primary hover:underline"
                            >
                              {showAccountNumber ? "Hide" : "Show"}
                            </button>
                          </div>
                          <p className="text-lg font-semibold font-mono">
                            {showAccountNumber 
                              ? accountDetails.accountNumber 
                              : maskAccountNumber(accountDetails.accountNumber)
                            }
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 rounded-2xl bg-muted/30">
                        <p className="text-sm font-medium mb-1">VPA Address</p>
                        <p className="text-lg font-semibold">
                          {maskVpa(accountDetails.vpa)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-medium">Live Mode</span>
                        <p className="text-xs text-muted-foreground">
                          Process real payouts to your account
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="rounded-2xl"
                      onClick={() => {
                        setValidationErrors({});
                        document.querySelector('[value="setup"]')?.dispatchEvent(
                          new MouseEvent('click', { bubbles: true })
                        );
                      }}
                    >
                      Edit Account
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="rounded-2xl"
                      onClick={handleVerifyAccount}
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify Account"
                      )}
                    </Button>
                    
                    <Button
                      variant="destructive"
                      className="rounded-2xl"
                      onClick={handleDisconnect}
                      disabled={loading}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};