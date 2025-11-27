import React from "react";
// 통계 컴포넌트
type StatItem = { label: string; value: number | string; color?: string };
type StateSummaryProps = { items: StatItem[] };

export const StateSummary: React.FC<StateSummaryProps> = ({ items }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="rounded-md border p-4">
          <div className="text-xs text-muted-foreground">{item.label}</div>
          <div className="text-2xl font-bold text-foreground">{item.value}</div>
        </div>
        ))}
    </div>
  );
};
