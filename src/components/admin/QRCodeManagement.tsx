import { QrCode, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const QRCodeManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">QR Codes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Generate unique QR codes for each table
        </p>
      </div>

      <Card className="glass p-6 border-border/50">
        <h3 className="text-lg font-semibold mb-4">Generate New QR Code</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="table-number">Table Number</Label>
            <Input
              id="table-number"
              placeholder="e.g., Table 1"
              className="mt-1.5 rounded-2xl h-11"
            />
          </div>
          <Button className="w-full rounded-2xl">
            <Plus className="h-4 w-4 mr-2" />
            Generate QR Code
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((table) => (
          <Card
            key={table}
            className="glass p-6 border-border/50 text-center animate-slide-up"
          >
            <div className="w-32 h-32 mx-auto mb-4 bg-muted/50 rounded-2xl flex items-center justify-center">
              <QrCode className="h-24 w-24 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Table {table}</h3>
            <Button variant="outline" className="w-full rounded-2xl">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
