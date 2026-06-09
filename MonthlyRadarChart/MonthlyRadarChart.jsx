import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';

function MonthlyRadarChart({ data }) {
  const radarData = data.map((item) => ({
    month: item.month,
    balance: (item.income || 0) - (item.cost || 0),
  }));

  return (
    <div className="chart-container">
      <h3>تراز ماهانه (نمودار راداری)</h3>
      <RadarChart outerRadius={150} width={600} height={400} data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="month" />
        <PolarRadiusAxis tickFormatter={(value) => new Intl.NumberFormat('fa-IR').format(value)} />
        <Tooltip
          formatter={(value) => new Intl.NumberFormat('fa-IR').format(value)}
          labelFormatter={(label) => `ماه: ${label}`}
        />
        <Legend />
        <Radar name="تراز" dataKey="balance" stroke="#ff7300" fill="#ff7300" fillOpacity={0.5} />
      </RadarChart>
    </div>
  );
}

export default MonthlyRadarChart;
