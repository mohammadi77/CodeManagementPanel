import { useContext, useMemo, useState } from 'react';
import { TransactionContext } from '../../contexts/TransactionContext';
import DonutChart from '../../components/DonutChart/DonutChart';
import MonthlyBarChart from '../../components/MonthlyBarChart/MonthlyBarChart';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator';
import { getPersianMonthName } from '../../utils/getPersianMonthName';
import { filterTransactionsByDateRange } from '../../utils/filterTransactionsByDateRange';
import './Dashboard.css';

function Dashboard() {
  const { transactions, loading, error } = useContext(TransactionContext);

  const [selectedYear, setSelectedYear] = useState('');
  const [fromMonth, setFromMonth] = useState('');
  const [toMonth, setToMonth] = useState('');

  const filteredTransactions = useMemo(
    () => filterTransactionsByDateRange(transactions, selectedYear, fromMonth, toMonth),
    [transactions, selectedYear, fromMonth, toMonth]
  );
  console.log('transactions', transactions);
  console.log('filteredTransactions', filteredTransactions);
  const totalIncome = useMemo(
    () =>
      filteredTransactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount || 0 : 0), 0),
    [filteredTransactions]
  );

  const totalCost = useMemo(
    () =>
      filteredTransactions.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount || 0 : 0), 0),
    [filteredTransactions]
  );

  const balance = totalIncome - totalCost;

  const monthlyData = useMemo(() => {
    const months = {};

    filteredTransactions.forEach((t) => {
      if (!t.date) return;

      const monthName = getPersianMonthName(t.date);

      if (!monthName) return;

      if (!months[monthName]) {
        months[monthName] = {
          income: 0,
          cost: 0,
        };
      }

      if (t.type === 'income') {
        months[monthName].income += t.amount || 0;
      }

      if (t.type === 'expense') {
        months[monthName].cost += t.amount || 0;
      }
    });

    return Object.keys(months).map((month) => ({
      month,
      income: months[month].income,
      cost: months[month].cost,
    }));
  }, [filteredTransactions]);

  // مهم: بعد از همه Hook ها
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="dashboard-container">
      <h2>داشبورد تراکنش‌ها</h2>

      <div className="filters-row">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">همه سال‌ها</option>
          <option value="1403">1403</option>
          <option value="1404">1404</option>
          <option value="1405">1405</option>
          <option value="1406">1406</option>
        </select>

        <select value={fromMonth} onChange={(e) => setFromMonth(e.target.value)}>
          <option value="">از ماه</option>
          <option value="1">فروردین</option>
          <option value="2">اردیبهشت</option>
          <option value="3">خرداد</option>
          <option value="4">تیر</option>
          <option value="5">مرداد</option>
          <option value="6">شهریور</option>
          <option value="7">مهر</option>
          <option value="8">آبان</option>
          <option value="9">آذر</option>
          <option value="10">دی</option>
          <option value="11">بهمن</option>
          <option value="12">اسفند</option>
        </select>

        <select value={toMonth} onChange={(e) => setToMonth(e.target.value)}>
          <option value="">تا ماه</option>
          <option value="1">فروردین</option>
          <option value="2">اردیبهشت</option>
          <option value="3">خرداد</option>
          <option value="4">تیر</option>
          <option value="5">مرداد</option>
          <option value="6">شهریور</option>
          <option value="7">مهر</option>
          <option value="8">آبان</option>
          <option value="9">آذر</option>
          <option value="10">دی</option>
          <option value="11">بهمن</option>
          <option value="12">اسفند</option>
        </select>
      </div>

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
