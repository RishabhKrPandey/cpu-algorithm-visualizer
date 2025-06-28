import { v4 as uuidv4 } from "uuid";
import "./Controls.css";

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
    <div className="controls">
      <button onClick={addProcess}>Add Process</button>
      <button className="remove" onClick={removeProcess}>
        Remove Last Process
      </button>
    </div>
  );
}
