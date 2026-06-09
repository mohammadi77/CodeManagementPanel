import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator'; // برای Tooltip
import './DonutChart.css';

// تابع کمکی برای تبدیل ارقام انگلیسی به فارسی (بدون جداکننده)
const convertDigitsToPersian = (num) => {
  if (num === undefined || num === null) return '';
  return String(num).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

function DonutChart({ income, cost }) {
  const data = [
    { name: 'درآمد', value: income, color: '#82ca9d' },
    { name: 'هزینه', value: cost, color: '#8884d8' },
  ];

  // لیبل بیرون دایره با درصد فارسی
  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // درصد به عدد انگلیسی، سپس تبدیل به فارسی
    const percentValue = (percent * 100).toFixed(0);
    const persianPercent = convertDigitsToPersian(percentValue);

    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{
          fontSize: '13px',
          fontWeight: 'bold',
          backgroundColor: '#fff',
          padding: '2px 4px',
          borderRadius: '4px',
        }}
      >
        {`${name}: ${persianPercent}%`}
      </text>
    );
  };

  // فرمت Tooltip با جداکننده هزارگان و اعداد فارسی
  const formatTooltip = (value) => {
    return ToPersianWithSeparator(value);
  };

  return (
    <div className="donut-chart-wrapper">
      <h3>نسبت درآمد به هزینه</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            labelLine={true}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={formatTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DonutChart;
