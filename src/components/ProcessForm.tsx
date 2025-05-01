import React, { useState } from 'react';
import { Process } from '../types';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ProcessFormProps {
  onAddProcess: (process: Process) => void;
  existingProcesses: Process[];
}

export const ProcessForm: React.FC<ProcessFormProps> = ({ onAddProcess, existingProcesses }) => {
  const [process, setProcess] = useState({
    name: '',
    arrivalTime: 0,
    burstTime: 1
  });

  const [errors, setErrors] = useState({
    name: '',
    arrivalTime: '',
    burstTime: ''
  });

  const validateProcess = () => {
    const newErrors = {
      name: '',
      arrivalTime: '',
      burstTime: ''
    };

    if (!process.name.trim()) {
      newErrors.name = 'Nama proses wajib diisi';
    } else if (process.name.length > 10) {
      newErrors.name = 'Nama proses maksimal 10 karakter';
    } else if (existingProcesses.some(p => p.name === process.name.trim())) {
      newErrors.name = 'Nama proses harus unik';
    }

    if (process.arrivalTime < 0) {
      newErrors.arrivalTime = 'Waktu kedatangan tidak boleh negatif';
    } else if (process.arrivalTime > 1000) {
      newErrors.arrivalTime = 'Waktu kedatangan tidak boleh lebih dari 1000';
    }

    if (process.burstTime < 1) {
      newErrors.burstTime = 'Waktu proses minimal 1';
    } else if (process.burstTime > 100) {
      newErrors.burstTime = 'Waktu proses tidak boleh lebih dari 100';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProcess()) {
      toast.error('Harap perbaiki kesalahan sebelum menambahkan proses');
      return;
    }

    if (existingProcesses.length >= 10) {
      toast.error('Maksimal 10 proses telah tercapai');
      return;
    }

    onAddProcess({
      id: crypto.randomUUID(),
      ...process,
      name: process.name.trim()
    });
    setProcess({ name: '', arrivalTime: 0, burstTime: 1 });
    toast.success('Proses berhasil ditambahkan');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Proses
          </label>
          <input
            type="text"
            value={process.name}
            onChange={(e) => setProcess({ ...process, name: e.target.value })}
            className={`w-full px-3 py-2 bg-background border rounded-lg shadow-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 ${
              errors.name 
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                : 'border-input focus:border-primary focus:ring-primary/20'
            }`}
            placeholder="P1"
          />
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-destructive flex items-center"
            >
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Waktu Kedatangan
          </label>
          <input
            type="number"
            min="0"
            max="1000"
            value={process.arrivalTime}
            onChange={(e) => setProcess({ ...process, arrivalTime: parseInt(e.target.value) || 0 })}
            className={`w-full px-3 py-2 bg-background border rounded-lg shadow-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 ${
              errors.arrivalTime 
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                : 'border-input focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.arrivalTime && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-destructive flex items-center"
            >
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.arrivalTime}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Waktu Proses
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={process.burstTime}
            onChange={(e) => setProcess({ ...process, burstTime: parseInt(e.target.value) || 1 })}
            className={`w-full px-3 py-2 bg-background border rounded-lg shadow-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 ${
              errors.burstTime 
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                : 'border-input focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.burstTime && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-destructive flex items-center"
            >
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.burstTime}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-muted-foreground">
          {existingProcesses.length}/10 proses ditambahkan
        </p>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-4 py-2 rounded-lg font-medium shadow-sm text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Tambah Proses
        </motion.button>
      </div>
    </motion.form>
  );
};