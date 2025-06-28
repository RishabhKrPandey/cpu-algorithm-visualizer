import { v4 as uuidv4 } from "uuid";

export default function Controls({ processes, setProcesses }) {
  const addProcess = () => {
    const newProcess = {
      id: uuidv4().slice(0, 4),
      at: 0,
      bt: 5,
      priority: 1,
    };
    setProcesses([...processes, newProcess]);
  };

  const removeProcess = () => {
    if (processes.length > 0) {
      setProcesses(processes.slice(0, -1));
    }
  };

  return (
    <div className="space-x-3 mb-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={addProcess}
      >
        Add Process
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={removeProcess}
      >
        Remove Last Process
      </button>
    </div>
  );
}
