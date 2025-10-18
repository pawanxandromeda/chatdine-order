import { User, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl premium-gradient flex items-center justify-center text-white text-2xl font-bold">A</div>
          <div>
            <h2 className="text-2xl font-semibold">Admin</h2>
            <p className="text-sm text-muted-foreground">restaurant@mevoo.com</p>
          </div>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Full name</label>
                <div className="mt-1 p-3 rounded-lg bg-muted/50">Admin</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <div className="mt-1 p-3 rounded-lg bg-muted/50">restaurant@mevoo.com</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Joined</label>
                <div className="mt-1 p-3 rounded-lg bg-muted/50">Jan 12, 2024</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Last login</label>
                <div className="mt-1 p-3 rounded-lg bg-muted/50">2 hours ago</div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button className="premium-gradient text-white">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Contact & Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <Mail className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">restaurant@mevoo.com</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-medium">Timezone</p>
                <p className="text-xs text-muted-foreground">Asia/Kolkata</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <User className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-medium">Role</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
