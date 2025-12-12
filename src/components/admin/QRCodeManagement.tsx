// src/components/QRCodeManagement.tsx
import { QrCode, Plus, Download, Sparkles, Crown, Copy, Eye, EyeOff, Trash2, Info, Scan, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useQRCode } from '@/hooks/useQRCode';
import { IQRCode } from '@/types/qrCode';
import { useState } from 'react';

const getTableTypeColor = (type: IQRCode['tableType']) => {
  switch (type) {
    case 'vip':
      return 'premium-gradient text-white border-0';
    case 'outdoor':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'bar':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const getTableTypeIcon = (type: IQRCode['tableType']) => {
  switch (type) {
    case 'vip':
      return <Crown className="h-3 w-3" />;
    case 'outdoor':
      return <Sparkles className="h-3 w-3" />;
    case 'bar':
      return <Zap className="h-3 w-3" />;
    default:
      return <QrCode className="h-3 w-3" />;
  }
};

export const QRCodeManagement = () => {
  const {
    qrCodes,
    loading,
    error,
    newTableNumber,
    newTableType,
    setNewTableNumber,
    setNewTableType,
    generateQRCode,
    toggleQRCodeStatus,
    deleteQRCode,
  } = useQRCode();
  const [hoveredQR, setHoveredQR] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              {/* <h2 className="text-2xl font-bold tracking-tight">QR Code Management</h2> */}
              <Badge variant="secondary" className="premium-gradient text-white border-0">
                <Scan className="w-3 h-3 mr-1" />
                {qrCodes.length} Codes
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate and manage QR codes for table ordering
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Codes', value: qrCodes.length, color: 'text-primary' },
            { label: 'Active', value: qrCodes.filter((qr) => qr.isActive).length, color: 'text-green-500' },
            { label: 'Total Scans', value: qrCodes.reduce((sum, qr) => sum + qr.scans, 0), color: 'text-blue-500' },
            { label: "Today's Scans", value: 12, color: 'text-orange-500' }, // Adjust as needed
          ].map((stat, index) => (
            <Card
              key={index}
              className="glass p-4 border-border/50 text-center group hover-lift transition-all duration-300"
            >
              <div className={`text-2xl font-bold ${stat.color} mb-1 transition-transform group-hover:scale-110`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Generate New QR Code Card */}
        <Card className="glass p-6 border-border/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/20" />
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Generate New QR Code</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="table-number" className="text-sm font-medium flex items-center gap-1">
                  Table Number
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground cursor-help transition-colors hover:text-primary" />
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl max-w-xs">
                      <p>Unique identifier for the table (e.g., "Table 1", "VIP Booth A")</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="table-number"
                  placeholder="e.g., Table 1, VIP Booth A"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  className="rounded-2xl h-11 transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="table-type" className="text-sm font-medium">
                  Table Type
                </Label>
                <select
                  id="table-type"
                  value={newTableType}
                  onChange={(e) => setNewTableType(e.target.value as IQRCode['tableType'])}
                  className="w-full h-11 px-3 rounded-2xl border border-border bg-background transition-all duration-200 focus:scale-[1.02] focus:ring-2 focus:ring-primary/50"
                >
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="bar">Bar</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
            </div>

            <Button
              onClick={generateQRCode}
              disabled={!newTableNumber.trim() || loading}
              className="w-full rounded-2xl premium-gradient hover-lift transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
              <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
              {loading ? 'Generating...' : 'Generate QR Code'}
            </Button>
          </div>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="glass p-4 border-red-500/50 text-red-500">
            <p>{error}</p>
          </Card>
        )}

        {/* QR Codes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading && !qrCodes.length ? (
            <Card className="glass p-12 text-center border-border/50">
              <p>Loading QR codes...</p>
            </Card>
          ) : (
            qrCodes.map((qr) => (
              <Card
                key={qr._id}
                className="glass p-6 border-border/50 text-center transition-all duration-300 group relative overflow-hidden"
                onMouseEnter={() => setHoveredQR(qr._id)}
                onMouseLeave={() => setHoveredQR(null)}
              >
                {/* Status Indicator */}
                <div
                  className={`absolute top-3 right-3 w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                    qr.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />

                {/* QR Code Preview */}
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto bg-muted/30 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-muted/50">
                    <QrCode className="h-20 w-20 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>

                  {/* Scan Count Badge */}
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white border-0 shadow-lg">
                    <Scan className="w-3 h-3 mr-1" />
                    {qr.scans} scans
                  </Badge>
                </div>

                {/* Table Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-semibold text-lg">{qr.tableNumber}</h3>
                    <Badge variant="outline" className={`${getTableTypeColor(qr.tableType)} flex items-center gap-1`}>
                      {getTableTypeIcon(qr.tableType)}
                      {qr.tableType}
                    </Badge>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground cursor-help">
                        <span className="truncate max-w-[180px]">{qr.url}</span>
                        <Copy
                          className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-primary"
                          onClick={() => copyToClipboard(qr.url)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl">
                      <p>Click copy icon to copy URL to clipboard</p>
                    </TooltipContent>
                  </Tooltip>

                  {qr.lastScan && (
                    <p className="text-xs text-muted-foreground">
                      Last scan: {new Date(qr.lastScan).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-2xl transition-all duration-200 hover:scale-105 group/download"
                      >
                        <Download className="h-4 w-4 mr-2 transition-transform group-hover/download:scale-110" />
                        Download
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl">
                      <p>Download high-resolution QR code PNG</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleQRCodeStatus(qr._id)}
                        className="rounded-2xl transition-all duration-200 hover:scale-110 hover:bg-green-500/10"
                        disabled={loading}
                      >
                        {qr.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl">
                      <p>{qr.isActive ? 'Disable QR code' : 'Enable QR code'}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteQRCode(qr._id)}
                        className="rounded-2xl transition-all duration-200 hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl">
                      <p>Delete this QR code permanently</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Active/Inactive Toggle */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${qr.isActive ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {qr.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={qr.isActive}
                      onCheckedChange={() => toggleQRCodeStatus(qr._id)}
                      className="scale-75 data-[state=checked]:bg-green-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-xl transition-all duration-300 pointer-events-none" />
              </Card>
            ))
          )}
        </div>

        {/* Empty State */}
        {!loading && qrCodes.length === 0 && (
          <Card className="glass p-12 text-center border-border/50">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto premium-gradient rounded-2xl flex items-center justify-center">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">No QR codes yet</h3>
              <p className="text-muted-foreground">
                Generate your first QR code to enable table ordering for customers.
              </p>
              <Button
                onClick={() => setNewTableNumber('Table 1')}
                className="premium-gradient rounded-2xl mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate First QR Code
              </Button>
            </div>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};