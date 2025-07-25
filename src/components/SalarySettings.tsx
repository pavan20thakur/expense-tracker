import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { CurrencyCode, CURRENCY_SYMBOLS, formatCurrency } from "@/lib/currency";

const SalarySettings = () => {
  const { profile, loading, updateProfile } = useProfile();
  const [salary, setSalary] = useState("");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  // Update local state when profile loads
  useEffect(() => {
    if (profile) {
      setSalary(profile.monthly_salary.toString());
      setCurrency(profile.currency as CurrencyCode);
    }
  }, [profile]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const salaryNum = parseFloat(salary);
    if (isNaN(salaryNum) || salaryNum < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid salary amount",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await updateProfile({
        monthly_salary: salaryNum,
        currency: currency,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Salary settings updated successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-salary">Monthly Salary</Label>
              <Input
                id="monthly-salary"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter your monthly salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={(value: CurrencyCode) => setCurrency(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CURRENCY_SYMBOLS).map(([code, symbol]) => (
                    <SelectItem key={code} value={code}>
                      {symbol} {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {salary && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Preview:</p>
              <p className="font-semibold">
                {formatCurrency(parseFloat(salary) || 0, currency)}
              </p>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SalarySettings;
