import './AlgorithmSelector.css';

export default function AlgorithmSelector({ algorithm, setAlgorithm }) {
  return (
    <div className="algorithm-selector">
      <label>Select Algorithm:</label>
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="FCFS">First Come First Serve (FCFS)</option>
        <option value="SJF">Shortest Job First (Non-Preemptive)</option>
        <option value="PSJF">Shortest Job First (Preemptive)</option>
        <option value="Priority">Priority Scheduling (Non-Preemptive)</option>
        <option value="PPriority">Priority Scheduling (Preemptive)</option>
        <option value="RoundRobin">Round Robin (RR)</option>
      </select>
    </div>
  );
}
