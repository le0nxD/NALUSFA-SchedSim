import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const team = [
    {
      name: 'Muhammad Naufal Darlian',
      role: '237006152',
      image: 'https://i.pinimg.com/736x/44/22/84/442284f2f68a587b407fd3c7e3e8a0e2.jpg',
      bio: 'Pengembang software dengan spesialisasi di web development dan sistem operasi.',
        github: 'https://github.com/le0nxD',
        email: '237006152@student.unsil.ac.id',
    },
    {
      name: 'Muhammad Syamsul Maarif',
      role: '237006160',
      image: 'https://i.pinimg.com/736x/a9/fe/d2/a9fed29aafbd211d6d1df41d7d5b1a39.jpg',
      bio: 'Quality Assurance Engineer dengan fokus pada testing dan automation.',
      github: 'https://github.com/Maxiyzz',
      email: '237006160@student.unsil.ac.id'
    },
    {
      name: 'Fadil Darmawan',
      role: '237006164',
      image: 'https://i.pinimg.com/736x/c9/2b/27/c92b27d5dd338fa996df6d0ecce1f84e.jpg',
      bio: 'Penulis teknis yang fokus pada dokumentasi dan materi pembelajaran.',
      github: 'https://github.com/x',
      email: '237006164@student.unsil.ac.id'
    },
    {
      name: 'Ardhi Fardan Kamil',
      role: '237006176',
      image: 'https://i.pinimg.com/736x/dc/72/7b/dc727bec0d5b0c30a4068c02736e0a7a.jpg',
      bio: 'Arsitek sistem dengan pengalaman dalam perancangan sistem operasi.',
        github: 'https://github.com/Kai2446-cmyk',
        email: '237006176@student.unsil.ac.id',
    },
    {
      name: 'Muhammad Lutfi Nurhakim',
      role: '237006179',
      image: 'https://i.pinimg.com/736x/74/86/4a/74864a16c2bae0d89bedfa630ed48e4f.jpg',
      bio: 'Designer dengan fokus pada pengalaman pengguna dan interface yang intuitif.',
        github: 'https://github.com/Oxiliya',
        email: '237006179@student.unsil.ac.id',
    }
  ];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          TIM
        </h1>
        <p className="text-xl text-muted-foreground">
          Kenali tim di balik pengembangan NALUSFA SchedSim
        </p>
      </motion.div>

      {/* Daftar Tim */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-card rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6 relative">
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h2>
              <p className="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-medium mt-1">
                {member.role}
              </p>
              <p className="text-muted-foreground mt-4">{member.bio}</p>

              <div className="mt-6 flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={`mailto:${member.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Arti Nama */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 shadow-lg border border-border/50 backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          NALUSFA SchedSim
        </h2>
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
          Nama NALUSFA SchedSim merupakan gabungan dari inisial nama anggota tim dan fungsi aplikasi:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { initial: 'NA', name: 'Naufal' },
            { initial: 'LU', name: 'Lutfi' },
            { initial: 'S', name: 'Samsul' },
            { initial: 'F', name: 'Fadil' },
            { initial: 'A', name: 'Ardhi' },
            { initial: 'SchedSim', name: 'Scheduling Simulation' }
          ].map((item, index) => (
            <motion.div
              key={item.initial}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-background via-background to-background/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {item.initial}
              </span>
              <span className="text-muted-foreground mx-3 text-xl">=</span>
              <span className="text-foreground text-lg font-medium">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
