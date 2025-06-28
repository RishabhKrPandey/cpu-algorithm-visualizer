import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import "./GanttChart.css";

Chart.register(BarElement, CategoryScale, LinearScale);

export default function GanttChart({ ganttData }) {
  if (!ganttData.length) return null;

  const data = {
    labels: ganttData.map((p) => `P${p.pid}`),
    datasets: [
      {
        label: "Execution",
        data: ganttData.map((p) => p.end - p.start),
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { stacked: true, title: { display: true, text: "Timeline" } },
      y: { stacked: true },
    },
  };

  return (
    <div className="gantt-chart">
      <h3>Gantt Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
