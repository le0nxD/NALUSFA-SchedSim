import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
src="https://lh3.googleusercontent.com/pw/AP1GczPAbIQqP3cUZh6vGoGBy3nlSkyJeqfXB9VLKvjDuiuvn13vVavjWzLvEVwCODCAwiTCAi-e4q-l2Az4SpllcMBpFlW7V4R7JNlCAhhNg64OhwQJZyTCEGjKchlrdEgeqGoZCzt9fO_dJgYlidDhwiRN=w1051-h1039-s-no-gm"
  alt="Logo"
  className="w-6 h-6"
/>
              <span className="font-bold text-lg text-foreground">NALUSFA SchedSim</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simulasi dan analisis algoritma penjadwalan CPU dengan visualisasi interaktif.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Menu</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Simulation
                </Link>
              </li>
              <li>
                <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Algoritma
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Sosial Media</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="/team"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} NALUSFA SchedSim.
          </p>
        </div>
      </div>
    </footer>
  );
};
