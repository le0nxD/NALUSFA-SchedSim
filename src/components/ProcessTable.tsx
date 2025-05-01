import React from 'react';
import { Process } from '../types';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProcessTableProps {
  processes: Process[];
  onDeleteProcess?: (id: string) => void;
  showResults?: boolean;
}

export const ProcessTable: React.FC<ProcessTableProps> = ({ 
  processes, 
  onDeleteProcess,
  showResults = false 
}) => {
  if (processes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg"
      >
        <p className="text-lg text-foreground">Belum ada proses yang ditambahkan</p>
        <p className="text-sm mt-2 text-muted-foreground">Tambahkan proses menggunakan form di atas</p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6 lg:pl-8">
                  Proses
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                  Waktu Kedatangan
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                  Waktu Proses
                </th>
                {showResults && (
                  <>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                      Waktu Mulai
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                      Waktu Selesai
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                      Waktu Penyelesaian
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                      Waktu Tunggu
                    </th>
                  </>
                )}
                {onDeleteProcess && (
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">Aksi</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              <AnimatePresence>
                {processes.map((process, idx) => (
                  <motion.tr
                    key={process.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="hover:bg-muted/50 transition-colors duration-200"
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6 lg:pl-8">
                      {process.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                      {process.arrivalTime}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                      {process.burstTime}
                    </td>
                    {showResults && (
                      <>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                          {process.startTime}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                          {process.completionTime}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                          {process.turnaroundTime}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                          {process.waitingTime}
                        </td>
                      </>
                    )}
                    {onDeleteProcess && (
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onDeleteProcess(process.id)}
                          className="text-destructive hover:text-destructive/80 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};