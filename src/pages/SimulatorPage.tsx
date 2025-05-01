import React, { useState } from 'react';
import { ProcessForm } from '../components/ProcessForm';
import { ProcessTable } from '../components/ProcessTable';
import { GanttChart } from '../components/GanttChart';
import { ProcessStats } from '../components/ProcessStats';
import PDFExport from '../components/PDFExport';
import { Process, SchedulingResult, SchedulingAlgorithm } from '../types';
import { calculateFCFS, calculateSJF, calculateRR } from '../utils/schedulingAlgorithms';
import { motion } from 'framer-motion';
import { Play, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function SimulatorPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SchedulingAlgorithm>('FCFS');
  const [quantum, setQuantum] = useState(2);
  const [result, setResult] = useState<SchedulingResult>({
    processes: [],
    averageWaitingTime: 0,
    averageTurnaroundTime: 0
  });

  const handleAddProcess = (process: Process) => {
    setProcesses(prev => [...prev, process]);
    setResult({
      processes: [],
      averageWaitingTime: 0,
      averageTurnaroundTime: 0
    });
    toast.success('Proses berhasil ditambahkan');
  };

  const handleDeleteProcess = (id: string) => {
    setProcesses(prev => prev.filter(p => p.id !== id));
    setResult({
      processes: [],
      averageWaitingTime: 0,
      averageTurnaroundTime: 0
    });
    toast.success('Proses berhasil dihapus');
  };

  const runSimulation = () => {
    if (processes.length === 0) {
      toast.error('Harap tambahkan setidaknya satu proses');
      return;
    }

    let simulationResult: SchedulingResult;

    try {
      switch (selectedAlgorithm) {
        case 'FCFS':
          simulationResult = calculateFCFS(processes);
          break;
        case 'SJF':
          simulationResult = calculateSJF(processes);
          break;
        case 'RR':
          simulationResult = calculateRR(processes, quantum);
          break;
        default:
          simulationResult = calculateFCFS(processes);
      }

      setResult(simulationResult);
      setProcesses(simulationResult.processes);
      toast.success('Simulasi berhasil diselesaikan');
    } catch (error) {
      toast.error('Kesalahan saat menjalankan simulasi');
      console.error('Simulation error:', error);
    }
  };

  const resetSimulation = () => {
    setProcesses([]);
    setResult({
      processes: [],
      averageWaitingTime: 0,
      averageTurnaroundTime: 0
    });
    toast.success('Reset Simulasi Berhasil');
  };

  const calculateTotalTime = () => {
    if (processes.length === 0) return 0;
    
    const maxCompletionTime = Math.max(
      ...processes
        .filter(p => p.completionTime !== undefined)
        .map(p => p.completionTime!)
    );
    
    const maxBurstPlusArrival = Math.max(
      ...processes.map(p => p.arrivalTime + p.burstTime)
    );
    
    return Math.max(maxCompletionTime || 0, maxBurstPlusArrival);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div 
            className="relative w-32 h-32 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"
            />
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczPAbIQqP3cUZh6vGoGBy3nlSkyJeqfXB9VLKvjDuiuvn13vVavjWzLvEVwCODCAwiTCAi-e4q-l2Az4SpllcMBpFlW7V4R7JNlCAhhNg64OhwQJZyTCEGjKchlrdEgeqGoZCzt9fO_dJgYlidDhwiRN=w1051-h1039-s-no-gm"
              alt="CPU Scheduling Simulator"
              className="w-24 h-24 object-contain relative z-10"
            />
          </motion.div>
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
          </motion.div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Visualisasi dan analisis algoritma penjadwalan CPU dengan antarmuka interaktif
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl shadow-lg p-6 space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value as SchedulingAlgorithm)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground w-full md:w-auto"
            >
              <option value="FCFS">First Come First Serve (FCFS)</option>
              <option value="SJF">Shortest Job First (SJF)</option>
              <option value="RR">Round Robin (RR)</option>
            </select>
            {selectedAlgorithm === 'RR' && (
              <input
                type="number"
                value={quantum}
                onChange={(e) => setQuantum(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                placeholder="Quantum"
                min="1"
              />
            )}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runSimulation}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex-1 md:flex-none flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Jalankan Simulasi
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetSimulation}
              className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors duration-300 flex-1 md:flex-none flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </motion.button>
          </div>
        </div>

        <ProcessForm onAddProcess={handleAddProcess} existingProcesses={processes} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        <ProcessTable 
          processes={processes} 
          onDeleteProcess={handleDeleteProcess}
          showResults={result.processes.length > 0}
        />
        <GanttChart processes={processes} totalTime={calculateTotalTime()} />
        <ProcessStats processes={processes} />
        {result.processes.length > 0 && (
          <div className="flex justify-end mt-4">
            <PDFExport 
              processes={processes} 
              result={result} 
              algorithm={selectedAlgorithm} 
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}