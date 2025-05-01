export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  startTime?: number;
  completionTime?: number;
  turnaroundTime?: number;
  waitingTime?: number;
}

export interface SchedulingResult {
  processes: Process[];
  averageWaitingTime: number;
  averageTurnaroundTime: number;
}

export type SchedulingAlgorithm = 'FCFS' | 'SJF' | 'RR';