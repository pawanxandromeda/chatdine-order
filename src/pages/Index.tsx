import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, LayoutDashboard } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8 animate-slide-up">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Restaurant Order
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Premium ordering experience with chat and voice
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/order")}
            className="rounded-2xl h-14 px-8 text-lg"
          >
            <QrCode className="mr-2 h-5 w-5" />
            Start Ordering
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/admin")}
            className="rounded-2xl h-14 px-8 text-lg"
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
