export function calculateScheduling(
  algorithm,
  processes,
  setProcesses,
  setGanttData,
  setAverages
) {
  // Deep copy to avoid mutating React state directly
  let proc = processes.map((p) => ({
    ...p,
    ct: 0,
    tat: 0,
    wt: 0,
    remainingBt: p.bt,
  }));
  let ganttData = [];

  switch (algorithm) {
    case "FCFS":
      fcfs(proc, ganttData);
      break;
    case "SJF":
      sjf(proc, ganttData);
      break;
    case "PSJF":
      psjf(proc, ganttData);
      break;
    case "Priority":
      priority(proc, ganttData);
      break;
    case "PPriority":
      ppriority(proc, ganttData);
      break;
    case "RoundRobin":
      const quantum = parseInt(prompt("Enter Time Quantum", 2));
      roundRobin(proc, ganttData, quantum);
      break;
    default:
      break;
  }

  // Update state
  setProcesses(proc);
  setGanttData(ganttData);
  setAverages(calcAvg(proc));
}


function fcfs(processes, ganttData) {
  processes.sort((a, b) => a.at - b.at);
  let currentTime = 0;

  processes.forEach((p) => {
    if (currentTime < p.at) currentTime = p.at;
    const start = currentTime;
    currentTime += p.bt;
    p.ct = currentTime;
    p.tat = p.ct - p.at;
    p.wt = p.tat - p.bt;

    ganttData.push({ pid: p.id, start, end: currentTime });
  });
}


function sjf(processes, ganttData) {
  processes.sort((a, b) => a.at - b.at);
  let currentTime = 0,
    completed = 0;

  const isReady = (p, time) => p.at <= time && p.ct === 0;

  while (completed < processes.length) {
    const ready = processes.filter((p) => isReady(p, currentTime));
    ready.sort((a, b) => a.bt - b.bt);

    if (ready.length) {
      const p = ready[0];
      const start = currentTime;
      currentTime += p.bt;
      p.ct = currentTime;
      p.tat = p.ct - p.at;
      p.wt = p.tat - p.bt;
      completed++;
      ganttData.push({ pid: p.id, start, end: currentTime });
    } else {
      currentTime++;
    }
  }
}


function psjf(processes, ganttData) {
  let currentTime = 0,
    completed = 0;
  let lastPid = null;

  const isReady = (p, time) => p.at <= time && p.remainingBt > 0;

  while (completed < processes.length) {
    const ready = processes.filter((p) => isReady(p, currentTime));
    ready.sort((a, b) => a.remainingBt - b.remainingBt);

    if (ready.length) {
      const p = ready[0];
      if (lastPid !== p.id) {
        ganttData.push({
          pid: p.id,
          start: currentTime,
          end: currentTime + 1,
        });
      } else {
        ganttData[ganttData.length - 1].end++;
      }
      p.remainingBt--;
      currentTime++;
      if (p.remainingBt === 0) {
        p.ct = currentTime;
        p.tat = p.ct - p.at;
        p.wt = p.tat - p.bt;
        completed++;
      }
      lastPid = p.id;
    } else {
      currentTime++;
      lastPid = null;
    }
  }
}


function priority(processes, ganttData) {
  processes.sort((a, b) => a.at - b.at);
  let currentTime = 0,
    completed = 0;

  const isReady = (p, time) => p.at <= time && p.ct === 0;

  while (completed < processes.length) {
    const ready = processes.filter((p) => isReady(p, currentTime));
    ready.sort((a, b) => a.priority - b.priority);

    if (ready.length) {
      const p = ready[0];
      const start = currentTime;
      currentTime += p.bt;
      p.ct = currentTime;
      p.tat = p.ct - p.at;
      p.wt = p.tat - p.bt;
      completed++;
      ganttData.push({ pid: p.id, start, end: currentTime });
    } else {
      currentTime++;
    }
  }
}


function ppriority(processes, ganttData) {
  let currentTime = 0,
    completed = 0;
  let lastPid = null;

  const isReady = (p, time) => p.at <= time && p.remainingBt > 0;

  while (completed < processes.length) {
    const ready = processes.filter((p) => isReady(p, currentTime));
    ready.sort((a, b) => a.priority - b.priority);

    if (ready.length) {
      const p = ready[0];
      if (lastPid !== p.id) {
        ganttData.push({
          pid: p.id,
          start: currentTime,
          end: currentTime + 1,
        });
      } else {
        ganttData[ganttData.length - 1].end++;
      }
      p.remainingBt--;
      currentTime++;
      if (p.remainingBt === 0) {
        p.ct = currentTime;
        p.tat = p.ct - p.at;
        p.wt = p.tat - p.bt;
        completed++;
      }
      lastPid = p.id;
    } else {
      currentTime++;
      lastPid = null;
    }
  }
}

function roundRobin(processes, ganttData, quantum) {
  let queue = [...processes];
  let currentTime = 0;

  while (queue.length) {
    const p = queue.shift();
    const exec = Math.min(quantum, p.remainingBt);
    const start = currentTime;
    currentTime += exec;
    p.remainingBt -= exec;

    ganttData.push({ pid: p.id, start, end: currentTime });

    if (p.remainingBt > 0) queue.push(p);
    else {
      p.ct = currentTime;
      p.tat = p.ct - p.at;
      p.wt = p.tat - p.bt;
    }
  }
}


function calcAvg(processes) {
  const n = processes.length;
  const avgWT = (
    processes.reduce((s, p) => s + p.wt, 0) / n
  ).toFixed(2);
  const avgTAT = (
    processes.reduce((s, p) => s + p.tat, 0) / n
  ).toFixed(2);
  return { avgWT, avgTAT };
}
