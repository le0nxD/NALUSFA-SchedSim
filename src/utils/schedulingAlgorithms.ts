import { Process, SchedulingResult } from '../types';

// Helper function to calculate average
const calculateAverage = (numbers: number[]): number => {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

// Helper function to find the next process to execute
const findNextProcess = (
  readyQueue: Process[],
  currentTime: number,
  algorithm: 'FCFS' | 'SJF'
): Process | undefined => {
  if (readyQueue.length === 0) return undefined;
  
  const availableProcesses = readyQueue.filter(p => p.arrivalTime <= currentTime);
  if (availableProcesses.length === 0) return undefined;

  return algorithm === 'FCFS'
    ? availableProcesses.reduce((prev, curr) => 
        prev.arrivalTime < curr.arrivalTime ? prev : curr)
    : availableProcesses.reduce((prev, curr) => 
        prev.burstTime < curr.burstTime ? prev : curr);
};

export const calculateFCFS = (processes: Process[]): SchedulingResult => {
  const result = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  const completedProcesses: Process[] = [];

  while (result.length > 0) {
    const nextProcess = findNextProcess(result, currentTime, 'FCFS');
    
    if (!nextProcess) {
      currentTime = Math.min(...result.map(p => p.arrivalTime));
      continue;
    }

    const processIndex = result.findIndex(p => p.id === nextProcess.id);
    const process = result.splice(processIndex, 1)[0];

    const startTime = Math.max(currentTime, process.arrivalTime);
    const completionTime = startTime + process.burstTime;
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    completedProcesses.push({
      ...process,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    });

    currentTime = completionTime;
  }

  return {
    processes: completedProcesses,
    averageWaitingTime: calculateAverage(completedProcesses.map(p => p.waitingTime!)),
    averageTurnaroundTime: calculateAverage(completedProcesses.map(p => p.turnaroundTime!))
  };
};

export const calculateSJF = (processes: Process[]): SchedulingResult => {
  const result = [...processes];
  let currentTime = 0;
  const completedProcesses: Process[] = [];

  while (result.length > 0) {
    const nextProcess = findNextProcess(result, currentTime, 'SJF');
    
    if (!nextProcess) {
      currentTime = Math.min(...result.map(p => p.arrivalTime));
      continue;
    }

    const processIndex = result.findIndex(p => p.id === nextProcess.id);
    const process = result.splice(processIndex, 1)[0];

    const startTime = Math.max(currentTime, process.arrivalTime);
    const completionTime = startTime + process.burstTime;
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    completedProcesses.push({
      ...process,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    });

    currentTime = completionTime;
  }

  return {
    processes: completedProcesses,
    averageWaitingTime: calculateAverage(completedProcesses.map(p => p.waitingTime!)),
    averageTurnaroundTime: calculateAverage(completedProcesses.map(p => p.turnaroundTime!))
  };
};

export const calculateRR = (processes: Process[], quantum: number = 2): SchedulingResult => {
  const queue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const result: Process[] = queue.map(p => ({ ...p }));
  const remainingTime = new Map(queue.map(p => [p.id, p.burstTime]));
  const startTimes = new Map<string, number>();
  const completionTimes = new Map<string, number>();
  let currentTime = 0;

  // Process queue until all processes are completed
  while (queue.length > 0) {
    const process = queue.shift()!;
    const remaining = remainingTime.get(process.id)!;

    // Record start time if not already recorded
    if (!startTimes.has(process.id)) {
      startTimes.set(process.id, currentTime);
    }

    if (remaining <= quantum) {
      // Process can complete in this quantum
      currentTime += remaining;
      remainingTime.set(process.id, 0);
      completionTimes.set(process.id, currentTime);
    } else {
      // Process needs more time
      currentTime += quantum;
      remainingTime.set(process.id, remaining - quantum);
      
      // Check if any new processes have arrived before re-queuing
      const newArrivals = queue.filter(p => p.arrivalTime <= currentTime);
      if (newArrivals.length > 0) {
        queue.push(...newArrivals);
        queue.splice(0, newArrivals.length);
      }
      
      queue.push(process);
    }

    // Handle idle time if no processes are ready
    if (queue.length > 0 && currentTime < queue[0].arrivalTime) {
      currentTime = queue[0].arrivalTime;
    }
  }

  // Calculate final metrics for each process
  const completedProcesses = result.map(process => {
    const startTime = startTimes.get(process.id)!;
    const completionTime = completionTimes.get(process.id)!;
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    return {
      ...process,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    };
  });

  return {
    processes: completedProcesses,
    averageWaitingTime: calculateAverage(completedProcesses.map(p => p.waitingTime!)),
    averageTurnaroundTime: calculateAverage(completedProcesses.map(p => p.turnaroundTime!))
  };
};