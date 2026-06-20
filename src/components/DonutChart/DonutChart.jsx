import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator';
import './DonutChart.css';

// تبدیل اعداد انگلیسی به فارسی
const convertDigitsToPersian = (num) => {
  if (num === undefined || num === null) return '';
  return String(num).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

function DonutChart({ income, cost }) {
  const hasData = income > 0 || cost > 0;

  const data = [
    { name: 'درآمد', value: income || 0, color: '#82ca9d' },
    { name: 'هزینه', value: cost || 0, color: '#8884d8' },
  ];

  // اگر داده‌ای وجود نداشت
  if (!hasData) {
    return (
      <div className="donut-chart-wrapper">
        <h3>نسبت درآمد به هزینه</h3>

        <div className="chart-empty">داده‌ای موجود نیست</div>
      </div>
    );
  }

  // لیبل بیرون دایره
  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

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
        }}
      >
        {`${name}: ${persianPercent}%`}
      </text>
    );
  };

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
