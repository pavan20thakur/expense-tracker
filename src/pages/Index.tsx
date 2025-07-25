import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ProtectedRoute from "@/components/ProtectedRoute";
import SalarySettings from "@/components/SalarySettings";
import FinancialSummary from "@/components/FinancialSummary";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user } = useAuth();

  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Expense Tracker</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-8 mt-6">
              <FinancialSummary refreshTrigger={refreshTrigger} />
              <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            </TabsContent>
            
            <TabsContent value="expenses" className="space-y-8 mt-6">
              <ExpenseList refreshTrigger={refreshTrigger} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-8 mt-6">
              <SalarySettings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
