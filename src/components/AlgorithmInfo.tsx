import React from 'react';
import { SchedulingAlgorithm } from '../types';
import { Info, HelpCircle, CheckCircle, XCircle, Target, Code } from 'lucide-react';
import { motion } from 'framer-motion';

interface AlgorithmInfoProps {
  algorithm: SchedulingAlgorithm;
}

export const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const getAlgorithmInfo = () => {
    switch (algorithm) {
      case 'FCFS':
        return {
          title: 'First Come First Serve (FCFS)',
          description: 'Algoritma penjadwalan CPU paling sederhana yang mengeksekusi proses berdasarkan urutan kedatangan.',
          characteristics: [
            'Algoritma non-preemptive',
            'Mudah dipahami dan diimplementasikan',
            'Kinerja kurang optimal karena waktu tunggu bisa tinggi',
            'Dapat menyebabkan convoy effect'
          ],
          advantages: [
            'Implementasi sederhana',
            'Tidak ada starvation - setiap proses mendapat kesempatan',
            'Cocok untuk sistem batch'
          ],
          disadvantages: [
            'Waktu tunggu rata-rata tinggi',
            'Tidak cocok untuk sistem interaktif',
            'Dapat terjadi convoy effect',
            'Tidak ada penanganan prioritas'
          ],
          bestFor: [
            'Sistem pemrosesan batch',
            'Sistem yang mengutamakan kesederhanaan',
            'Ketika proses memiliki burst time yang mirip'
          ],
          implementation: `// Implementasi FCFS
const calculateFCFS = (processes) => {
  // Urutkan proses berdasarkan waktu kedatangan
  const sorted = processes.sort((a, b) => 
    a.arrivalTime - b.arrivalTime
  );
  
  let currentTime = 0;
  return sorted.map(process => {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const completionTime = startTime + process.burstTime;
    currentTime = completionTime;
    
    return {
      ...process,
      startTime,
      completionTime,
      turnaroundTime: completionTime - process.arrivalTime,
      waitingTime: startTime - process.arrivalTime
    };
  });
};`
        };
      case 'SJF':
        return {
          title: 'Shortest Job First (SJF)',
          description: 'Proses dieksekusi berdasarkan waktu burst, dengan proses yang lebih pendek mendapat prioritas.',
          characteristics: [
            'Algoritma non-preemptive',
            'Optimal dalam hal waktu tunggu rata-rata',
            'Memerlukan prediksi burst time',
            'Dapat menyebabkan starvation'
          ],
          advantages: [
            'Waktu tunggu rata-rata minimum',
            'Cocok untuk sistem dengan burst time yang diketahui',
            'Maksimalisasi throughput sistem'
          ],
          disadvantages: [
            'Kemungkinan starvation untuk proses panjang',
            'Memerlukan prediksi CPU burst time',
            'Tidak praktis untuk sistem interaktif',
            'Dapat tidak adil untuk proses panjang'
          ],
          bestFor: [
            'Sistem batch dengan burst time yang diketahui',
            'Sistem yang mengutamakan throughput',
            'Ketika waktu proses bervariasi signifikan'
          ],
          implementation: `// Implementasi SJF
const calculateSJF = (processes) => {
  let currentTime = 0;
  const completed = [];
  const remaining = [...processes];

  while (remaining.length > 0) {
    // Cari proses yang sudah tiba dan memiliki burst time terpendek
    const available = remaining.filter(
      p => p.arrivalTime <= currentTime
    );
    
    if (available.length === 0) {
      currentTime = Math.min(
        ...remaining.map(p => p.arrivalTime)
      );
      continue;
    }

    const shortest = available.reduce((prev, curr) =>
      prev.burstTime < curr.burstTime ? prev : curr
    );

    const process = remaining.splice(
      remaining.findIndex(p => p.id === shortest.id),
      1
    )[0];

    const startTime = currentTime;
    const completionTime = startTime + process.burstTime;
    
    completed.push({
      ...process,
      startTime,
      completionTime,
      turnaroundTime: completionTime - process.arrivalTime,
      waitingTime: startTime - process.arrivalTime
    });

    currentTime = completionTime;
  }

  return completed;
};`
        };
      case 'RR':
        return {
          title: 'Round Robin (RR)',
          description: 'Setiap proses mendapat jatah waktu tetap (quantum) untuk eksekusi sebelum dipindah ke antrian belakang.',
          characteristics: [
            'Algoritma preemptive',
            'Alokasi CPU yang adil',
            'Cocok untuk sistem time-sharing',
            'Kinerja bergantung pada ukuran quantum'
          ],
          advantages: [
            'Distribusi CPU yang adil',
            'Tidak ada starvation',
            'Respons baik untuk proses pendek',
            'Ideal untuk sistem time-sharing'
          ],
          disadvantages: [
            'Overhead context switching tinggi',
            'Kinerja bergantung pada quantum',
            'Waktu tunggu rata-rata bisa tinggi',
            'Tidak optimal untuk burst time bervariasi'
          ],
          bestFor: [
            'Sistem interaktif',
            'Lingkungan time-sharing',
            'Ketika distribusi CPU yang adil diprioritaskan'
          ],
          implementation: `// Implementasi Round Robin
const calculateRR = (processes, quantum) => {
  const queue = [...processes];
  const remainingTime = new Map(
    processes.map(p => [p.id, p.burstTime])
  );
  
  let currentTime = 0;
  
  while (queue.length > 0) {
    const process = queue.shift();
    const remaining = remainingTime.get(process.id);
    
    if (remaining <= quantum) {
      // Proses selesai
      currentTime += remaining;
      remainingTime.set(process.id, 0);
      process.completionTime = currentTime;
    } else {
      // Proses perlu quantum time lagi
      currentTime += quantum;
      remainingTime.set(process.id, remaining - quantum);
      queue.push(process);
    }
  }
  
  return processes.map(p => ({
    ...p,
    turnaroundTime: p.completionTime - p.arrivalTime,
    waitingTime: p.completionTime - p.arrivalTime - p.burstTime
  }));
};`
        };
      default:
        return {
          title: '',
          description: '',
          characteristics: [],
          advantages: [],
          disadvantages: [],
          bestFor: [],
          implementation: ''
        };
    }
  };

  const info = getAlgorithmInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl shadow-lg border border-border p-6 backdrop-blur-sm"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Info className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-medium text-foreground">Informasi Algoritma</h3>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="text-sm font-medium text-foreground">{info.title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{info.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <h4 className="text-sm font-medium text-foreground">Kelebihan</h4>
            </div>
            <ul className="space-y-2">
              {info.advantages.map((adv, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-sm text-muted-foreground flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{adv}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-destructive" />
              <h4 className="text-sm font-medium text-foreground">Kekurangan</h4>
            </div>
            <ul className="space-y-2">
              {info.disadvantages.map((dis, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-sm text-muted-foreground flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  <span>{dis}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-blue-500" />
            <h4 className="text-sm font-medium text-foreground">Penggunaan Terbaik</h4>
          </div>
          <ul className="space-y-2">
            {info.bestFor.map((use, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-sm text-muted-foreground flex items-center space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>{use}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4 text-purple-500" />
            <h4 className="text-sm font-medium text-foreground">Implementasi</h4>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground whitespace-pre-wrap">
              {info.implementation}
            </code>
          </pre>
        </motion.div>
      </div>
    </motion.div>
  );
};