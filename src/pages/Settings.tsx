import { Settings as SettingsIcon, Shield, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl premium-gradient flex items-center justify-center text-white text-2xl font-bold">S</div>
          <div>
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p className="text-sm text-muted-foreground">Application and account settings</p>
          </div>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium">Password</p>
                <p className="text-xs text-muted-foreground">Last changed: 3 months ago</p>
                <div className="mt-3">
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Analytics</p>
                  <p className="text-xs text-muted-foreground">Share anonymized usage data to improve Mevoo</p>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-update UI</p>
                  <p className="text-xs text-muted-foreground">Receive feature updates automatically</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
