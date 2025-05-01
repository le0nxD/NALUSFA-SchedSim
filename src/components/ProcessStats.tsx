import React from 'react';
import { Process } from '../types';
import { BarChart2, Clock, Users, Zap, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessStatsProps {
  processes: Process[];
}

export const ProcessStats: React.FC<ProcessStatsProps> = ({ processes }) => {
  const totalProcesses = processes.length;
  
  const avgBurstTime = totalProcesses > 0
    ? processes.reduce((sum, p) => sum + p.burstTime, 0) / totalProcesses
    : 0;
    
  const avgArrivalTime = totalProcesses > 0
    ? processes.reduce((sum, p) => sum + p.arrivalTime, 0) / totalProcesses
    : 0;

  const avgWaitingTime = totalProcesses > 0 && processes[0].waitingTime !== undefined
    ? processes.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / totalProcesses
    : 0;

  const avgTurnaroundTime = totalProcesses > 0 && processes[0].turnaroundTime !== undefined
    ? processes.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / totalProcesses
    : 0;
    
  const maxBurstTime = totalProcesses > 0
    ? Math.max(...processes.map(p => p.burstTime))
    : 0;
    
  const minBurstTime = totalProcesses > 0
    ? Math.min(...processes.map(p => p.burstTime))
    : 0;

  const stats = [
    {
      label: 'Total Proses',
      value: totalProcesses,
      icon: Users,
      gradient: 'from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10'
    },
    {
      label: 'Rata-rata Waktu Proses',
      value: avgBurstTime.toFixed(2),
      icon: Clock,
      gradient: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10'
    },
    {
      label: 'Rata-rata Waktu Tunggu',
      value: avgWaitingTime.toFixed(2),
      icon: BarChart2,
      gradient: 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10'
    },
    {
      label: 'Rata-rata Waktu Penyelesaian',
      value: avgTurnaroundTime.toFixed(2),
      icon: Timer,
      gradient: 'from-rose-500/20 to-red-500/20 dark:from-rose-500/10 dark:to-red-500/10'
    },
    {
      label: 'Rentang Waktu Proses',
      value: totalProcesses > 0 ? `${minBurstTime} - ${maxBurstTime}` : '0 - 0',
      icon: Zap,
      gradient: 'from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10'
    }
  ];

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.gradient} p-6 backdrop-blur-sm border border-border/50`}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-background/50 p-2.5">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="absolute right-1 bottom-1 opacity-10">
                <Icon className="w-16 h-16" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};