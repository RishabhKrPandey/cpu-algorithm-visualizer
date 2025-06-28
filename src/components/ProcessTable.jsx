export default function ProcessTable({ processes, setProcesses }) {
  const handleChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = parseInt(value);
    setProcesses(newProcesses);
  };

  return (
    <table className="w-full border-collapse mt-6">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">PID</th>
          <th className="p-2">AT</th>
          <th className="p-2">BT</th>
          <th className="p-2">Priority</th>
        </tr>
      </thead>
      <tbody>
        {processes.map((p, index) => (
          <tr key={p.id} className="border-t">
            <td className="p-2 text-center">{p.id}</td>
            <td className="p-2 text-center">
              <input
                type="number"
                value={p.at}
                onChange={(e) => handleChange(index, "at", e.target.value)}
                className="border px-2 py-1 w-20 text-center"
              />
            </td>
            <td className="p-2 text-center">
              <input
                type="number"
                value={p.bt}
                onChange={(e) => handleChange(index, "bt", e.target.value)}
                className="border px-2 py-1 w-20 text-center"
              />
            </td>
            <td className="p-2 text-center">
              <input
                type="number"
                value={p.priority}
                onChange={(e) => handleChange(index, "priority", e.target.value)}
                className="border px-2 py-1 w-20 text-center"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
