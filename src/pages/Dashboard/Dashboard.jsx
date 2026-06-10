import { useContext, useMemo, useState } from 'react';
import { TransactionContext } from '../../contexts/TransactionContext';
import DonutChart from '../../components/DonutChart/DonutChart';
import MonthlyBarChart from '../../components/MonthlyBarChart/MonthlyBarChart';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
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

  const yearOptions = [
    { value: '', label: 'همه سال‌ها' },
    { value: '1403', label: '1403' },
    { value: '1404', label: '1404' },
    { value: '1405', label: '1405' },
    { value: '1406', label: '1406' },
  ];

  const monthOptions = [
    { value: '', label: 'انتخاب ماه' },
    { value: '1', label: 'فروردین' },
    { value: '2', label: 'اردیبهشت' },
    { value: '3', label: 'خرداد' },
    { value: '4', label: 'تیر' },
    { value: '5', label: 'مرداد' },
    { value: '6', label: 'شهریور' },
    { value: '7', label: 'مهر' },
    { value: '8', label: 'آبان' },
    { value: '9', label: 'آذر' },
    { value: '10', label: 'دی' },
    { value: '11', label: 'بهمن' },
    { value: '12', label: 'اسفند' },
  ];

  const filteredTransactions = useMemo(
    () => filterTransactionsByDateRange(transactions, selectedYear, fromMonth, toMonth),
    [transactions, selectedYear, fromMonth, toMonth]
  );

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

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="dashboard-container">
      <h2>داشبورد تراکنش‌ها</h2>

      <div className="filters-row">
        <CustomDropdown
          value={selectedYear}
          options={yearOptions}
          onChange={setSelectedYear}
          placeholder="همه سال‌ها"
        />

        <CustomDropdown
          value={fromMonth}
          options={monthOptions}
          onChange={setFromMonth}
          placeholder="از ماه"
        />

        <CustomDropdown
          value={toMonth}
          options={monthOptions}
          onChange={setToMonth}
          placeholder="تا ماه"
        />
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
