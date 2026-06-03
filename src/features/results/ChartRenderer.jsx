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
  LineChart,
  Line,
  AreaChart,
  Area,
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
      <div className="rounded border border-indigo-200 bg-white p-3 shadow-lg">
        <p className="font-semibold text-slate-900">{data.name}</p>
        <p className="text-sm text-slate-600">
          Share: <span className="font-bold text-indigo-700">{data.value}%</span>
        </p>
        <p className="text-sm text-slate-600">
          Count: {data.count?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function RechartsBar({ data }) {
  const colors = ["#4338ca", "#0ea5e9", "#14b8a6", "#f59e0b", "#ec4899", "#8b5cf6", "#60a5fa", "#38bdf8", "#f97316", "#22c55e"];
  return (
    <div className="h-[340px] w-full pt-4 sm:h-[400px]">
      <div className="mb-2 flex justify-end text-xs text-slate-500">
        Unit: %
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 10, left: 90, bottom: 10 }}
          barSize={24}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#e2e8f0"
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickCount={6}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={{ stroke: "#cbd5e1" }}
            tickLine={false}
            tick={<CustomYAxisTick />}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip />}
          />
          <Bar
            dataKey="value"
            radius={[0, 4, 4, 0]}
            background={{ fill: "#e2e8f0", radius: [0, 4, 4, 0] }}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RechartsDonut({ data }) {
  return (
    <div className="flex flex-col items-center gap-6 p-4 lg:flex-row lg:items-center lg:justify-center">
      <div className="relative h-[300px] w-full max-w-[300px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <span className="text-3xl font-bold text-slate-900">100%</span>
          <span className="text-sm text-slate-500">total share</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={90}
              outerRadius={130}
              paddingAngle={2}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
              minAngle={8}
            >
              {data.map((entry, index) => {
                const colors = ["#4338ca", "#0ea5e9", "#14b8a6", "#f59e0b", "#ec4899", "#8b5cf6", "#60a5fa", "#38bdf8", "#f97316", "#22c55e"];
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

      <div className="grid w-full gap-3 sm:max-w-md">
        {data.map((entry, index) => {
          const colors = ["#4338ca", "#0ea5e9", "#14b8a6", "#f59e0b", "#ec4899", "#8b5cf6", "#60a5fa", "#38bdf8", "#f97316", "#22c55e"];
          return (
            <div
              key={`${entry.name}-legend-${index}`}
              className="flex items-center gap-3 text-sm text-slate-700"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="flex-1">{entry.name}</span>
              <span className="font-semibold text-slate-900">
                {entry.value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RechartsVerticalBar({ data }) {
  const colors = ["#4338ca", "#0ea5e9", "#14b8a6", "#f59e0b", "#ec4899", "#8b5cf6", "#60a5fa", "#38bdf8", "#f97316", "#22c55e"];
  return (
    <div className="h-[340px] w-full pt-4 sm:h-[400px]">
      <div className="mb-2 flex justify-end text-xs text-slate-500">
        Unit: %
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 10, left: 90, bottom: 10 }}
          barSize={28}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#e2e8f0"
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickCount={6}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={{ stroke: "#cbd5e1" }}
            tickLine={false}
            tick={<CustomYAxisTick />}
          />
          <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            background={{ fill: "#e2e8f0", radius: [0, 8, 8, 0] }}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RechartsLineChart({ data }) {
  return (
    <div className="h-[340px] w-full pt-4 sm:h-[400px]">
      <div className="mb-2 flex justify-end text-xs text-slate-500">
        Unit: %
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#475569", fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#475569", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4338ca"
            strokeWidth={3}
            dot={{ fill: "#4338ca", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function RechartsAreaChart({ data }) {
  return (
    <div className="h-[340px] w-full pt-4 sm:h-[400px]">
      <div className="mb-2 flex justify-end text-xs text-slate-500">
        Unit: %
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4338ca" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4338ca" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#475569", fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#475569", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4338ca"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ChartRenderer({ type, data }) {
  const safeData = buildSafeData(data);

  if (!safeData.length) {
    return (
      <div className="p-8 text-center text-slate-500">
        No chart data available.
      </div>
    );
  }

  return (
    <div className="mt-2 w-full">
      {type === "donut" ? (
        <RechartsDonut data={safeData} />
      ) : type === "vertical-bar" ? (
        <RechartsVerticalBar data={safeData} />
      ) : type === "line" ? (
        <RechartsLineChart data={safeData} />
      ) : type === "area" ? (
        <RechartsAreaChart data={safeData} />
      ) : (
        <RechartsBar data={safeData} />
      )}
    </div>
  );
}
