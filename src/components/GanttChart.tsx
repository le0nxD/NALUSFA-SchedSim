import React, { useState } from 'react';
import { Process } from '../types';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Download, ZoomIn, ZoomOut, Maximize2, Minimize2, X } from 'lucide-react';
import { toPng } from 'html-to-image';

interface GanttChartProps {
  processes: Process[];
  totalTime: number;
}

export const GanttChart: React.FC<GanttChartProps> = ({ processes, totalTime }) => {
  const [zoom, setZoom] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0, 200], [0, 1, 0]);
  const scale = useTransform(y, [-200, 0, 200], [0.8, 1, 0.8]);

  if (!processes?.length || totalTime === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Gantt Chart</h3>
        <div className="border border-border rounded-lg p-6 bg-card text-center text-muted-foreground">
          Tambahkan proses dan jalankan simulasi untuk melihat bagan Gantt Chart
        </div>
      </div>
    );
  }

  const colors = [
    'bg-blue-500 dark:bg-blue-400',
    'bg-green-500 dark:bg-green-400',
    'bg-yellow-500 dark:bg-yellow-400',
    'bg-purple-500 dark:bg-purple-400',
    'bg-pink-500 dark:bg-pink-400',
    'bg-indigo-500 dark:bg-indigo-400',
    'bg-red-500 dark:bg-red-400',
  ];

  const timeMarkers = Array.from({ length: totalTime + 1 }, (_, i) => i);

  const exportChart = async () => {
    const chart = document.getElementById('gantt-chart');
    if (chart) {
      try {
        const dataUrl = await toPng(chart, { quality: 1 });
        const link = document.createElement('a');
        link.download = 'gantt-chart.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to export chart:', err);
      }
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    if (Math.abs(info.offset.y) > 100) {
      setIsExpanded(false);
    }
  };

  // Sort processes by start time to maintain execution order
  const sortedProcesses = [...processes].sort((a, b) => 
    (a.startTime || 0) - (b.startTime || 0)
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-foreground">Gantt Chart</h3>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground"
          >
            <ZoomOut className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setZoom(z => Math.min(2, z + 0.1))}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground"
          >
            <ZoomIn className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportChart}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95,
              y: 200
            }}
            style={{ opacity, scale }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            className="fixed inset-4 z-50 bg-background shadow-2xl rounded-lg overflow-hidden"
          >
            <div 
              id="gantt-chart"
              className="h-full overflow-y-auto p-6"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <motion.div
                  className="text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Tarik untuk menutup
                </motion.div>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                  className="w-10 h-10 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="min-w-[800px] mt-16" style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
                <div className="relative">
                  {/* Time Grid */}
                  <div className="absolute inset-0 flex">
                    {timeMarkers.map((time) => (
                      <div
                        key={time}
                        className="flex-1 border-l border-border first:border-l-0"
                      />
                    ))}
                  </div>

                  {/* Process Blocks */}
                  <div className="relative space-y-4 py-4">
                    {sortedProcesses.map((process, index) => {
                      if (!process.startTime || !process.completionTime) return null;
                      
                      const left = (process.startTime / totalTime) * 100;
                      const width = ((process.completionTime - process.startTime) / totalTime) * 100;
                      
                      return (
                        <motion.div
                          key={process.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative h-12"
                          style={{
                            marginLeft: `${left}%`,
                            width: `${Math.max(width, 2)}%`,
                          }}
                        >
                          <div className={`${colors[index % colors.length]} h-12 rounded-md shadow-lg flex items-center justify-center text-white text-sm font-medium transition-all hover:brightness-110 hover:shadow-xl`}>
                            <div className="truncate px-2">
                              {process.name}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Time Labels */}
                  <div className="flex justify-between mt-4">
                    {timeMarkers.map((time) => (
                      <div
                        key={time}
                        className="flex-1 text-center text-sm text-muted-foreground"
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-8 pt-4 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-2">Legend</div>
                  <div className="flex flex-wrap gap-4">
                    {sortedProcesses.map((process, index) => (
                      <motion.div
                        key={process.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <div className={`w-4 h-4 ${colors[index % colors.length]} rounded`} />
                        <span className="text-sm text-muted-foreground">
                          {process.name} (Start: {process.startTime}, End: {process.completionTime}, Wait: {process.waitingTime})
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div 
            id="gantt-chart"
            className="overflow-x-auto border border-border rounded-lg bg-card p-6"
          >
            <div className="min-w-[800px]" style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
              <div className="relative">
                {/* Time Grid */}
                <div className="absolute inset-0 flex">
                  {timeMarkers.map((time) => (
                    <div
                      key={time}
                      className="flex-1 border-l border-border first:border-l-0"
                    />
                  ))}
                </div>

                {/* Process Blocks */}
                <div className="relative space-y-4 py-4">
                  {sortedProcesses.map((process, index) => {
                    if (!process.startTime || !process.completionTime) return null;
                    
                    const left = (process.startTime / totalTime) * 100;
                    const width = ((process.completionTime - process.startTime) / totalTime) * 100;
                    
                    return (
                      <motion.div
                        key={process.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative h-12"
                        style={{
                          marginLeft: `${left}%`,
                          width: `${Math.max(width, 2)}%`,
                        }}
                      >
                        <div className={`${colors[index % colors.length]} h-12 rounded-md shadow-lg flex items-center justify-center text-white text-sm font-medium transition-all hover:brightness-110 hover:shadow-xl`}>
                          <div className="truncate px-2">
                            {process.name}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Time Labels */}
                <div className="flex justify-between mt-4">
                  {timeMarkers.map((time) => (
                    <div
                      key={time}
                      className="flex-1 text-center text-sm text-muted-foreground"
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 pt-4 border-t border-border">
                <div className="text-sm font-medium text-foreground mb-2">Legend</div>
                <div className="flex flex-wrap gap-4">
                  {sortedProcesses.map((process, index) => (
                    <motion.div
                      key={process.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className={`w-4 h-4 ${colors[index % colors.length]} rounded`} />
                      <span className="text-sm text-muted-foreground">
                        {process.name} (Start: {process.startTime}, End: {process.completionTime}, Wait: {process.waitingTime})
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};