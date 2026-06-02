import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

function buildSafeData(data) {
  return (Array.isArray(data) ? data : []).map((entry) => ({
    name: entry?.name ?? "Unknown",
    value: Number(entry?.value) || 0,
    count: entry?.count,
  }));
}

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x={-100}
        y={-14}
        width={90}
        height={28}
        rx={14}
        fill="white"
        stroke="#d6d3d1" // stone-300
        strokeDasharray="4 4"
      />
      <text
        x={-55}
        y={4}
        textAnchor="middle"
        fill="#57534e" // stone-500
        fontSize={12}
        className="font-mono"
      >
        {payload.value.length > 10
          ? payload.value.slice(0, 10) + "..."
          : payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded border border-stone-200 bg-white p-3 shadow-lg">
        <p className="font-semibold text-stone-800">{data.name}</p>
        <p className="text-sm text-stone-600">
          Share: <span className="font-bold">{data.value}%</span>
        </p>
        <p className="text-sm text-stone-600">
          Count: {data.count?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function RechartsBar({ data }) {
  // We need to pass data that has a "remainder" to effectively create a background bar if we want it in one Bar
  // But a better way in recharts is to use a background prop on the Bar component.
  return (
    <div className="h-[400px] w-full pt-4">
      <div className="mb-2 flex justify-end text-xs text-stone-500">
        Unit: %
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 0, right: 0, left: 110, bottom: 0 }}
          barSize={32}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#e7e5e4"
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickCount={6}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a8a29e", fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={{ stroke: "#d6d3d1" }}
            tickLine={false}
            tick={<CustomYAxisTick />}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip />}
          />
          <Bar
            dataKey="value"
            fill="#000000"
            radius={[0, 4, 4, 0]}
            background={{ fill: "#f5f5f4", radius: [0, 4, 4, 0] }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RechartsDonut({ data }) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 lg:flex-row lg:items-center lg:justify-center">
      <div className="relative h-[300px] w-[300px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-black">100%</span>
          <span className="text-sm text-stone-500">total share</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={90}
              outerRadius={130}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => {
                const colors = ["#000", "#444", "#777", "#aaa", "#ddd"];
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid w-full max-w-sm gap-3">
        {data.map((entry, index) => {
          const colors = ["#000", "#444", "#777", "#aaa", "#ddd"];
          return (
            <div
              key={`${entry.name}-legend-${index}`}
              className="flex items-center gap-3 text-sm text-stone-700"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="flex-1">{entry.name}</span>
              <span className="font-semibold text-stone-900">
                {entry.value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ChartRenderer({ type, data }) {
  const safeData = buildSafeData(data);

  if (!safeData.length) {
    return (
      <div className="p-8 text-center text-stone-500">
        No chart data available.
      </div>
    );
  }

  return (
    <div className="mt-2 w-full">
      {type === "donut" ? (
        <RechartsDonut data={safeData} />
      ) : (
        <RechartsBar data={safeData} />
      )}
    </div>
  );
}
