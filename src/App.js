import React, { useState } from "react";
import AlgorithmSelector from "./components/AlgorithmSelector";
import Controls from "./components/Controls";
import ProcessTable from "./components/ProcessTable";
import GanttChart from "./components/GanttChart";
import Averages from "./components/Averages";
import { calculateScheduling } from "./utils/calculateScheduling";
import './App.css'

export default function App() {
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [processes, setProcesses] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [averages, setAverages] = useState({ avgWT: 0, avgTAT: 0 });
  // 

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">CPU Scheduling Visualizer</h1>

      <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />

      <Controls processes={processes} setProcesses={setProcesses} />

      <ProcessTable processes={processes} setProcesses={setProcesses} />

      <button
        className="bg-green-600 text-white px-6 py-2 rounded mt-6"
        onClick={() =>
          calculateScheduling(algorithm, processes, setProcesses, setGanttData, setAverages)
        }
      >
        Compute Scheduling
      </button>

      <Averages averages={averages} />

      <GanttChart ganttData={ganttData} />
    </main>
  );
}
