import React from "react";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

export const TeamPage: React.FC = () => {
  const team = [
    {
      name: "Muhammad Naufal Darlian",
      role: "237006152",
      image:
        "https://i.pinimg.com/736x/44/22/84/442284f2f68a587b407fd3c7e3e8a0e2.jpg",
      bio: "Fokus pada pengembangan antarmuka pengguna, perancangan tampilan yang responsif, serta implementasi halaman dan navigasi.",
      github: "https://github.com/le0nxD",
      email: "237006152@student.unsil.ac.id",
    },
    {
      name: "Muhammad Syamsul Maarif",
      role: "237006160",
      image:
        "https://i.pinimg.com/736x/a9/fe/d2/a9fed29aafbd211d6d1df41d7d5b1a39.jpg",
      bio: "Quality Assurance Engineer dengan fokus pada testing dan automation.",
      github: "https://github.com/Maxiyzz",
      email: "237006160@student.unsil.ac.id",
    },
    {
      name: "Fadil Darmawan",
      role: "237006164",
      image:
        "https://i.pinimg.com/736x/c9/2b/27/c92b27d5dd338fa996df6d0ecce1f84e.jpg",
      bio: "Mengimplementasikan algoritma Round Robin dengan time quantum, serta mengoptimalkan logika preemptive untuk simulasi interaktif.",
      github: "https://github.com/x", // Pastikan ini URL GitHub yang valid jika ada
      email: "237006164@student.unsil.ac.id",
    },
    {
      name: "Ardhi Fardan Kamil",
      role: "237006176",
      image:
        "https://i.pinimg.com/736x/dc/72/7b/dc727bec0d5b0c30a4068c02736e0a7a.jpg",
      bio: "Menangani logika algoritma FCFS, validasi input pengguna, serta integrasi backend dengan visualisasi hasil simulasi",
      github: "https://github.com/Kai2446-cmyk",
      email: "237006176@student.unsil.ac.id",
    },
    {
      name: "Muhammad Lutfi Nurhakim",
      role: "237006179",
      image:
        "https://i.pinimg.com/736x/74/86/4a/74864a16c2bae0d89bedfa630ed48e4f.jpg",
      bio: "Bertanggung jawab atas pengembangan algoritma Shortest Job First (Non-preemptive) serta perhitungan otomatis waktu eksekusi.",
      github: "https://github.com/Oxiliya",
      email: "237006179@student.unsil.ac.id",
    },
  ];

  const groupPhotoUrl =
    "https://i.pinimg.com/736x/13/45/da/1345da2fe2cf4f979266ce2bd21dcb67.jpg";

  return (
    <div className="space-y-16 p-4 md:p-8 min-h-screen bg-background text-foreground">
      {/* Judul Halaman */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
          TIM KAMI
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Kenali individu-individu berbakat dan berdedikasi di balik
          pengembangan NALUSFA SchedSim.
        </p>
      </motion.div>

      {/* Foto Kelompok */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="relative group overflow-hidden rounded-xl shadow-2xl border border-border/20 hover:shadow-purple-500/30 transition-all duration-300 w-full max-w-3xl aspect-[16/9]">
          <img
            src={groupPhotoUrl}
            alt="Foto Bersama Tim NALUSFA SchedSim"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 p-4 md:p-6">
            <h2 className="text-white text-xl md:text-2xl font-semibold tracking-tight opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              NALUSFA SchedSim Team
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Daftar Tim */}
      <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <motion.div
            key={member.role} // Menggunakan role (NPM) sebagai key yang unik
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }} // Tambahkan delay awal + 0.4 agar muncul setelah foto grup
            className="group bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden hover:shadow-primary/20 transition-all duration-300 flex flex-col"
          >
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-5 sm:p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-sm bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-medium mt-1">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm mt-3 mb-4 leading-relaxed flex-grow">
                {member.bio}
              </p>
              <div className="mt-auto flex space-x-3 pt-3 border-t border-border/50">
                <motion.a
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label={`Profil Github ${member.name}`}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${member.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label={`Email ${member.name}`}
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
        transition={{ delay: 0.6, duration: 0.5 }} // Sesuaikan delay
        className="bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl p-6 sm:p-8 shadow-lg border border-border/30 backdrop-blur-sm"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          NALUSFA SchedSim
        </h2>
        <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
          Nama NALUSFA SchedSim merupakan gabungan dari inisial nama anggota tim
          dan fungsi aplikasi:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { initial: "NA", name: "Naufal" },
            { initial: "LU", name: "Lutfi" },
            { initial: "S", name: "Samsul" },
            { initial: "F", name: "Fadil" },
            { initial: "A", name: "Ardhi" },
            { initial: "SchedSim", name: "Scheduling Simulation" },
          ].map((item, index) => (
            <motion.div
              key={item.initial}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }} // Sesuaikan delay
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 16px rgba(96, 62, 200, 0.15)", // Shadow lebih lembut dengan hint ungu
                transition: { duration: 0.2 },
              }}
              className="bg-card/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 sm:space-x-4"
            >
              <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {item.initial}
              </span>
              <span className="text-muted-foreground text-lg sm:text-xl">
                =
              </span>
              <span className="text-foreground text-base sm:text-lg font-medium">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
