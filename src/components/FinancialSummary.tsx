import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { formatCurrency, CurrencyCode } from "@/lib/currency";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

interface FinancialSummaryProps {
  refreshTrigger: number;
}

const FinancialSummary = ({ refreshTrigger }: FinancialSummaryProps) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();
  const { user } = useAuth();

  const fetchMonthlyExpenses = async () => {
    if (!user) return;

    try {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const { data, error } = await supabase
        .from('expenses')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', startOfMonth.toISOString())
        .lte('date', endOfMonth.toISOString());

      if (error) {
        console.error('Error fetching expenses:', error);
      } else {
        const total = data?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
        setMonthlyExpenses(total);
      }
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [user, refreshTrigger]);

  if (loading || !profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading financial summary...</div>
        </CardContent>
      </Card>
    );
  }

  const salary = profile.monthly_salary;
  const currency = profile.currency as CurrencyCode;
  const remainingAmount = salary - monthlyExpenses;
  const expensePercentage = salary > 0 ? (monthlyExpenses / salary) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Monthly Salary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Salary</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(salary, currency)}
          </div>
          <p className="text-xs text-muted-foreground">
            {format(new Date(), 'MMMM yyyy')}
          </p>
        </CardContent>
      </Card>

      {/* Monthly Expenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(monthlyExpenses, currency)}
          </div>
          <p className="text-xs text-muted-foreground">
            {expensePercentage.toFixed(1)}% of salary
          </p>
        </CardContent>
      </Card>

      {/* Remaining Amount */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          {remainingAmount >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${remainingAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(remainingAmount, currency)}
          </div>
          <p className="text-xs text-muted-foreground">
            {remainingAmount >= 0 ? 'Available to spend' : 'Over budget'}
          </p>
        </CardContent>
      </Card>

      {/* Savings Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {salary > 0 ? Math.max(0, ((salary - monthlyExpenses) / salary) * 100).toFixed(1) : 0}%
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Badge variant={remainingAmount >= salary * 0.2 ? "default" : remainingAmount >= 0 ? "secondary" : "destructive"}>
              {remainingAmount >= salary * 0.2 ? "Excellent" : remainingAmount >= 0 ? "Good" : "Over Budget"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
