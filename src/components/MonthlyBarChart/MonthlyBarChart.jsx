import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator';
import './MonthlyBarChart.css';

// تبدیل ارقام انگلیسی به فارسی
const convertDigitsToPersian = (str) => {
  if (!str) return '';
  return String(str).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

function MonthlyBarChart({ data }) {
  // فرمت محور Y
  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return convertDigitsToPersian(`${Math.round(value / 1000000)}M`);
    }

    if (value >= 1000) {
      return convertDigitsToPersian(`${Math.round(value / 1000)}k`);
    }

    return convertDigitsToPersian(value.toString());
  };

  // فرمت Tooltip
  const formatTooltip = (value) => {
    return ToPersianWithSeparator(value);
  };

  // فرمت محور X
  const formatXAxis = (monthName) => {
    return convertDigitsToPersian(monthName);
  };

  return (
    <div className="bar-chart-wrapper">
      <h3>درآمد و هزینه ماهانه</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={60}
            tickFormatter={formatXAxis}
          />

          <YAxis
            tickFormatter={formatYAxis}
            width={110}
            orientation="left"
            tick={{
              fontSize: 12,
              dx: -20,
            }}
          />

          <Tooltip
            formatter={formatTooltip}
            labelFormatter={(label) => `ماه: ${convertDigitsToPersian(label)}`}
          />

          <Legend />

          <Bar dataKey="income" fill="#82ca9d" name="درآمد" barSize={30} />

          <Bar dataKey="cost" fill="#8884d8" name="هزینه" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChart;
