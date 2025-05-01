<div align="center">

# 🧠⚙️ Process Scheduling Simulator  
**An Interactive CPU Scheduling Visualizer**

🔗 [Live Demo](https://nalusfa-schedsim.netlify.app/)  
🚀 Built with React + TypeScript + Tailwind CSS

</div>

---

## ✨ Features

- 🟢 **FCFS** — First Come First Serve  
- 🔵 **SJF** — Shortest Job First (Non-preemptive)  
- 🟣 **Round Robin** — with custom time quantum

Additional functionality:
- 📊 Dynamic Gantt Chart
- 📋 Process and statistics table (waiting time, turnaround time, etc.)
- 🌗 Dark / Light mode toggle
- 📄 Export simulation result as PDF

---

## 🧪 Example Inputs

### FCFS (First Come First Serve)

| Process | Arrival Time | Burst Time |
|---------|--------------|------------|
| P1      | 0            | 4          |
| P2      | 1            | 3          |
| P3      | 2            | 1          |

### SJF (Shortest Job First)

| Process | Arrival Time | Burst Time |
|---------|--------------|------------|
| P1      | 0            | 7          |
| P2      | 2            | 4          |
| P3      | 4            | 1          |
| P4      | 5            | 4          |

### Round Robin (Quantum = 2)

| Process | Arrival Time | Burst Time |
|---------|--------------|------------|
| P1      | 0            | 5          |
| P2      | 1            | 3          |
| P3      | 2            | 1          |
| P4      | 3            | 2          |

---

## ⚙️ Scheduling Algorithm Overview

### 🟢 FCFS (First Come First Serve)

- **Type:** Non-preemptive  
- **Logic:** Processes are executed in order of arrival  
- **Execution:**
  - Sorted by `arrivalTime`
  - CPU executes the next arrived process fully before moving on  
  - Handles idle time if no process is available

```ts
startTime = max(currentTime, arrivalTime)
completionTime = startTime + burstTime
turnaroundTime = completionTime - arrivalTime
waitingTime = turnaroundTime - burstTime
```

---

### 🔵 SJF (Shortest Job First)

- **Type:** Non-preemptive  
- **Logic:** Among available processes, the one with the shortest `burstTime` is selected  
- **Execution:**
  - Checks all arrived processes
  - Selects the shortest burst time
  - CPU idles if no process has arrived

---

### 🟣 Round Robin

- **Type:** Preemptive  
- **Logic:** Each process gets a fixed time slice (quantum) in a cyclic order  
- **Execution:**
  - Processes are queued and given `quantum` time
  - If unfinished, they’re pushed back to the queue
  - Ensures fairness, handles process arrival dynamically

```ts
if (remainingTime <= quantum) complete
else reduce time and re-queue
```

- Tracks:
  - Start time
  - Completion time
  - Turnaround time
  - Waiting time

---

## 🧰 Tech Stack

| Technology     | Description                    |
|----------------|--------------------------------|
| ⚛️ React       | Frontend component architecture |
| 🟦 TypeScript  | Typed JavaScript                |
| 🎨 Tailwind CSS| Modern styling framework        |
| ⚡ Vite        | Lightning-fast build tool       |
| 📄 React-PDF   | Export simulation as PDF        |

---

## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/process-scheduling-simulator.git
cd process-scheduling-simulator

# Install dependencies
npm install

# Run locally
npm run dev
```

---

## 📄 License

MIT © 2025 — [Naufal Darlian](https://github.com/le0nxD)

---

## 🤝 Contributing

Pull requests and suggestions are welcome. If you find this helpful, don't forget to ⭐ the repo!
