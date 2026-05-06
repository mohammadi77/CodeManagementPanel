import { useContext, useMemo } from "react";
import { TransactionContext } from "../../constants/TransactionContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Dashboard.css";

function Dashboard() {
  const { transactions } = useContext(TransactionContext);

  const totalIncome = useMemo(
    () => transactions.reduce((sum, t) => sum + (t.income || 0), 0),
    [transactions],
  );
  const totalCost = useMemo(
    () => transactions.reduce((sum, t) => sum + (t.cost || 0), 0),
    [transactions],
  );
  const balance = totalIncome - totalCost;

  const monthlyData = useMemo(() => {
    const months = {};
    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("fa-IR", {
        month: "long",
        year: "numeric",
      });
      if (!months[month]) months[month] = { income: 0, cost: 0 };
      months[month].income += t.income || 0;
      months[month].cost += t.cost || 0;
    });
    return Object.keys(months).map((month) => ({ month, ...months[month] }));
  }, [transactions]);

  return (
    <div className="Dashboard">
      <h2>داشبورد تراکنش‌ها</h2>

      <div className="totals">
        <div className="card">
          <h3>کل درآمد</h3>
          <p>{totalIncome.toLocaleString()} تومان</p>
        </div>
        <div className="card">
          <h3>کل هزینه</h3>
          <p>{totalCost.toLocaleString()} تومان</p>
        </div>
        <div className="card">
          <h3>تراز نهایی</h3>
          <p>{balance.toLocaleString()} تومان</p>
        </div>
      </div>

      <div>
        <div>
          {" "}
          <h3>درآمد و هزینه ماهانه</h3>
          <BarChart width={800} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("fa-IR").format(value)
              }
            />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" name="درآمد" />
            <Bar dataKey="cost" fill="#8884d8" name="هزینه" />
          </BarChart>
        </div>
        <div>
          <h3>تراز ماهانه</h3>
          <LineChart width={800} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("fa-IR").format(value)
              }
            />
            <Line
              type="monotone"
              dataKey={(d) => d.income - d.cost}
              stroke="#ff7300"
              name="تراز"
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
