import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartContainer, PieWrapper, Legend, LegendItem, ColorBox, Title } from "./PriorityChartStyles";
import { colors } from "../styles/colors";

interface PriorityChartProps {
  tasks: { priority: 'low' | 'medium' | 'high' }[];
}

export default function PriorityChart({ tasks }: PriorityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const high = tasks.filter(t => t.priority === "high").length;
  const medium = tasks.filter(t => t.priority === "medium").length;
  const low = tasks.filter(t => t.priority === "low").length;

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: ["High", "Medium", "Low"],
        datasets: [
          {
            data: [high, medium, low],
            backgroundColor: [colors.highPriority, colors.mediumPriority, colors.lowPriority],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        maintainAspectRatio: false,
        cutout: "40%", 
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [high, medium, low]);

  return (
    <ChartContainer>
      <Title>Task Priorities</Title>
      <PieWrapper>
        <canvas ref={canvasRef} />
        <Legend>
          <LegendItem>
            <ColorBox color={colors.highPriority} /> High
          </LegendItem>
          <LegendItem>
            <ColorBox color={colors.mediumPriority} /> Medium
          </LegendItem>
          <LegendItem>
            <ColorBox color={colors.lowPriority} /> Low
          </LegendItem>
        </Legend>
      </PieWrapper>
    </ChartContainer>
  );
}
