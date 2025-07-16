"use client";

import {
  calculatePercentage,
  convertFileSize,
  totalSizeInBytes,
} from "@/lib/utils";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const data = [
  {
    value: 1,
    fill: "white",
  },
];

const Chart = ({ used }: { used: number }) => {
  return (
    <div className="bg-primary flex rounded-2xl p-4 text-white">
      <RadialBarChart
        width={250}
        height={200}
        data={data}
        startAngle={90}
        endAngle={calculatePercentage(used) * 360 + 90}
        innerRadius={80}
        outerRadius={100}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="last:fill-primary first:fill-white/20"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="value" cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-white text-4xl font-bold"
                    >
                      {calculatePercentage(used) * 100}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-white/80 font-semibold"
                    >
                      已经使用
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
      <div className="flex flex-col justify-center gap-2 px-4">
        <div className="text-lg font-bold">剩余存储空间</div>
        <div className="w-full text-white/80">
          {used ? convertFileSize(used) : "?"} /{" "}
          {convertFileSize(totalSizeInBytes)}
        </div>
      </div>
    </div>
  );
};

export default Chart;
