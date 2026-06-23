"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code,
  Zap,
  Rocket,
  Star,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([]);
  const [backgroundParticles, setBackgroundParticles] = useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    setIsClient(true);
    setFloatingParticles(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    );
    setBackgroundParticles(
      Array.from({ length: 50 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 8 + Math.random() * 4,
        delay: Math.random() * 8,
      })),
    );
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { icon: Code, value: "50+", label: "Projets" },
    { icon: Star, value: "25+", label: "Clients" },
    { icon: Zap, value: "5+", label: "Années d'exp." },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
        style={{ y, opacity }}
      >
        {/* Dynamic gradient orbs */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[160px]"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[160px]"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-500 rounded-full filter blur-[160px]"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -60, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full filter blur-[100px] pointer-events-none"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />

        {/* Enhanced grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.3) 1px, transparent 0),
              linear-gradient(45deg, transparent 49%, rgb(139 92 246 / 0.1) 50%, transparent 51%),
              linear-gradient(-45deg, transparent 49%, rgb(139 92 246 / 0.1) 50%, transparent 51%)
            `,
            backgroundSize: "50px 50px, 100px 100px, 100px 100px",
          }}
        />

        {/* Floating particles */}
        <div suppressHydrationWarning>
          {floatingParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-6xl mx-auto">
          {/* Top Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-6 bg-slate-800/50 backdrop-blur-lg rounded-full px-6 py-3 border border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">
                  Disponible
                </span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-violet-300">
                  Nouveaux projets
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Enhanced Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-violet-400" />
                </motion.div>
                <span className="text-violet-300 font-medium">
                  ✨ Développeur Full Stack
                </span>
                <ChevronRight className="w-4 h-4 text-violet-400" />
              </motion.div>

              {/* Profile Image */}
              <div className="space-y-4">
                <Image
                  src="/images/profile.jpeg"
                  alt="Mfoloum Ulrich"
                  width={320}
                  height={320}
                  className="rounded-full w-80 h-80 object-cover border-4 border-purple-500/30 backdrop-blur-lg"
                />
              </div>

              {/* Enhanced Animated Subtitle */}
              <motion.div
                className="text-xl md:text-2xl lg:text-3xl text-violet-300/90 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <TypeAnimation
                  sequence={[
                    "Créateur d'expériences digitales 🚀",
                    3000,
                    "Architecte de solutions web ⚡",
                    3000,
                    "Passionné par l'innovation 💡",
                    3000,
                    "Expert React & Next.js 🔥",
                    3000,
                  ]}
                  wrapper="span"
                  speed={60}
                  repeat={Infinity}
                  cursor={true}
                  className="font-mono"
                />
              </motion.div>

              {/* Enhanced Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="space-y-4"
              >
                <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                  Je transforme vos{" "}
                  <span className="text-violet-400 font-semibold">idées</span>{" "}
                  en
                  <span className="text-purple-400 font-semibold">
                    {" "}
                    réalités digitales
                  </span>{" "}
                  exceptionnelles. Spécialisé dans les technologies modernes
                  pour créer des expériences utilisateur mémorables.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "Tailwind",
                  ].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-violet-500/10 text-violet-300 border-violet-500/20"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all duration-300 hover:scale-105 group"
                >
                  <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Démarrer un projet
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-violet-500/50 hover:bg-violet-500/10 hover:border-violet-500 text-violet-300 hover:text-violet-200 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Voir mes projets
                </Button>
              </motion.div>

              {/* Social Links with enhanced animations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex gap-4"
              >
                {[
                  {
                    icon: Github,
                    href: "#",
                    label: "GitHub",
                    color: "hover:text-gray-300",
                  },
                  {
                    icon: Linkedin,
                    href: "#",
                    label: "LinkedIn",
                    color: "hover:text-blue-400",
                  },
                  {
                    icon: Mail,
                    href: "#",
                    label: "Email",
                    color: "hover:text-violet-400",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-violet-500/50 transition-all duration-300 group backdrop-blur-sm ${social.color}`}
                    whileHover={{
                      scale: 1.1,
                      y: -8,
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <social.icon className="w-6 h-6 text-gray-400 group-hover:text-current transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Stats & Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Floating Stats Cards */}
              <div className="relative">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={`absolute bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-2xl ${
                      index === 0
                        ? "top-0 left-0"
                        : index === 1
                          ? "top-20 right-0"
                          : "bottom-0 left-10"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      rotate: index === 0 ? -2 : index === 1 ? 2 : -1,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-violet-500/20 border border-violet-500/30">
                        <stat.icon className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Central Visual Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="relative mt-32 ml-20"
              >
                <div className="w-80 h-80 relative">
                  {/* Animated rings */}
                  <motion.div
                    className="absolute inset-0 border-2 border-violet-500/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute inset-4 border border-purple-500/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute inset-8 border border-indigo-500/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Central content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-center space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                    >
                      <motion.div
                        className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Code className="w-10 h-10 text-white" />
                      </motion.div>
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-white">
                          Full Stack
                        </div>
                        <div className="text-sm text-violet-300">Developer</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <div className="text-sm text-gray-400 group-hover:text-violet-400 transition-colors">
            Découvrir plus
          </div>
          <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-violet-400 rounded-full flex justify-center transition-colors">
            <motion.div
              className="w-1 h-3 bg-gray-400 group-hover:bg-violet-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Background particles effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        suppressHydrationWarning
      >
        {backgroundParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </section>
  );
}
