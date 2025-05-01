import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SimulatorPage } from './pages/SimulatorPage';
import { AlgorithmsPage } from './pages/AlgorithmsPage';
import { TeamPage } from './pages/TeamPage';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SimulatorPage />} />
          <Route path="algorithms" element={<AlgorithmsPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;