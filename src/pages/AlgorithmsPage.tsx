import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, RefreshCw } from 'lucide-react';
import { AlgorithmInfo } from '../components/AlgorithmInfo';
import { SchedulingAlgorithm } from '../types';

export const AlgorithmsPage: React.FC = () => {
  const algorithms: SchedulingAlgorithm[] = ['FCFS', 'SJF', 'RR'];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
         PENJELASAN ALGORITMA
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pelajari berbagai algoritma penjadwalan CPU dan cara kerjanya
        </p>
      </motion.div>

      <div className="grid gap-8">
        {algorithms.map((algorithm, index) => (
          <motion.div
            key={algorithm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AlgorithmInfo algorithm={algorithm} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};