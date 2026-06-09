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
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator'; // مسیر صحیح فایل یوتیلیتی
import './MonthlyBarChart.css';

// تابع کمکی برای تبدیل ارقام انگلیسی به فارسی (بدون تغییر جداکننده)
const convertDigitsToPersian = (str) => {
  if (!str) return '';
  return str.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

function MonthlyBarChart({ data }) {
  // فرمت اعداد محور Y با حروف اختصاری (k, M) و تبدیل ارقام به فارسی
  const formatYAxis = (value) => {
    let formatted;
    if (value >= 1000000) {
      formatted = (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      formatted = (value / 1000).toFixed(0) + 'k';
    } else {
      formatted = value.toString();
    }
    // تبدیل ارقام انگلیسی به فارسی (مثلاً "150k" -> "۱۵۰k")
    return convertDigitsToPersian(formatted);
  };

  // فرمت Tooltip با جداکننده هزارگان و ارقام فارسی
  const formatTooltip = (value) => {
    return ToPersianWithSeparator(value);
  };

  // فرمت برچسب‌های محور X (نام ماه) برای تبدیل ارقام سال به فارسی
  const formatXAxis = (monthName) => {
    return convertDigitsToPersian(monthName);
  };

  return (
    <div className="bar-chart-wrapper">
      <h3>درآمد و هزینه ماهانه</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={60}
            tickFormatter={formatXAxis} // فارسی‌سازی ارقام سال در ماه
          />
          <YAxis tickFormatter={formatYAxis} width={70} tickMargin={8} orientation="left" />
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
