export interface ChartSummaryStat {
  label: string;
  value: string | number;
}

export interface CardChartSummaryListProps {
  stats: ChartSummaryStat[];
  className?: string;
}

export interface CardChartSummaryProps {
  stat: ChartSummaryStat;
}

export default function CardChartSummaryList({
  stats,
  className = "",
}: CardChartSummaryListProps) {
  const countStats = stats.length;

  return (
    <div className={`grid grid-cols-${countStats} gap-3 ${className}`}>
      {stats.map((stat) => (
        <CardChartSummaryItem key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

export function CardChartSummaryItem({ stat }: CardChartSummaryProps) {
  return (
    <div className="md:text-center border-ink-100 rounded-2xl border bg-white p-4 md:py-6 text-start md:p-6">
      <h4 className="text-primary text-2xl font-semibold">{stat.value}</h4>
      <p className="text-ink-500 mt-0.5 text-xs">{stat.label}</p>
    </div>
  );
}
