import "./ProcessTable.css";

export default function ProcessTable({ processes, setProcesses }) {
  const handleChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = parseInt(value);
    setProcesses(newProcesses);
  };

  return (
    <table className="process-table">
      <thead>
        <tr>
          <th>PID</th>
          <th>AT</th>
          <th>BT</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {processes.map((p, index) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>
              <input
                type="number"
                value={p.at}
                onChange={(e) => handleChange(index, "at", e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={p.bt}
                onChange={(e) => handleChange(index, "bt", e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={p.priority}
                onChange={(e) => handleChange(index, "priority", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
