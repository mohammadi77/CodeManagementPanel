import { useContext, useMemo } from 'react';
import { TransactionContext } from '../../contexts/TransactionContext';
import DonutChart from '../../components/DonutChart/DonutChart';
import MonthlyBarChart from '../../components/MonthlyBarChart/MonthlyBarChart';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator';
import './Dashboard.css';

function Dashboard() {
  const { transactions, loading, error } = useContext(TransactionContext);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const totalIncome = useMemo(
    () => transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount || 0 : 0), 0),
    [transactions]
  );

  const totalCost = useMemo(
    () => transactions.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount || 0 : 0), 0),
    [transactions]
  );

  const balance = totalIncome - totalCost;

  const monthlyData = useMemo(() => {
    const months = {};
    transactions.forEach((t) => {
      if (!t.date) return;
      const month = new Date(t.date).toLocaleString('fa-IR', {
        month: 'long',
        year: 'numeric',
      });
      if (!months[month]) months[month] = { income: 0, cost: 0 };
      if (t.type === 'income') months[month].income += t.amount || 0;
      else if (t.type === 'expense') months[month].cost += t.amount || 0;
    });
    return Object.keys(months).map((month) => ({ month, ...months[month] }));
  }, [transactions]);

  return (
    <div className="dashboard-container">
      <h2>داشبورد تراکنش‌ها</h2>

      <div className="totals">
        <div className="card">
          <h3>کل درآمد</h3>
          <p>{ToPersianWithSeparator(totalIncome)} تومان</p>
        </div>
        <div className="card">
          <h3>کل هزینه</h3>
          <p>{ToPersianWithSeparator(totalCost)} تومان</p>
        </div>
        <div className="card">
          <h3>تراز نهایی</h3>
          <p>{ToPersianWithSeparator(balance)} تومان</p>
        </div>
      </div>

      <div className="charts-grid">
        <DonutChart income={totalIncome} cost={totalCost} />
        <MonthlyBarChart data={monthlyData} />
      </div>
    </div>
  );
}

export default Dashboard;
