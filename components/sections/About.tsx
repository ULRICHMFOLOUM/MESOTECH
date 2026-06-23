"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Award, Users, Code, Heart, Lightbulb, Target, Zap } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";

const stats = [
  { icon: Code, label: "Projets Réalisés", value: "50+" },
  { icon: Users, label: "Clients Satisfaits", value: "25+" },
  { icon: Award, label: "Années d'Expérience", value: "5+" },
  { icon: Zap, label: "Technologies Maîtrisées", value: "15+" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Toujours à la recherche des dernières technologies pour créer des solutions modernes."
  },
  {
    icon: Target,
    title: "Précision",
    description: "Attention aux détails et code de qualité pour des résultats exceptionnels."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Développer avec passion pour créer des expériences utilisateur mémorables."
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <FadeIn direction="left">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">
                  À propos de moi
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Développeur{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    Full Stack
                  </span>{" "}
                  Passionné
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Bonjour ! Je suis un développeur full stack passionné par la création
                    d'expériences web modernes et performantes. Avec plus de 5 ans d'expérience,
                    je transforme des idées complexes en applications web élégantes et fonctionnelles.
                  </p>
                  <p>
                    Spécialisé en React, Next.js et TypeScript, je maîtrise l'écosystème JavaScript
                    moderne. J'aime relever des défis techniques et créer des solutions qui font
                    la différence pour les utilisateurs.
                  </p>
                  <p>
                    Quand je ne code pas, vous me trouverez en train d'explorer de nouvelles
                    technologies, de contribuer à des projets open source, ou de partager mes
                    connaissances avec la communauté développeur.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  <a href="/CV_MFOLOUM_ULRICH_2026.pdf" download="CV_MFOLOUM_ULRICH_2026.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger CV
                  </a>
                </Button>
                <Button variant="outline" className="border-violet-500/50 hover:bg-violet-500/10">
                  Voir mes projets
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - Stats and Values */}
          <FadeIn direction="right">
            <div className="space-y-8">
              {/* Stats Grid */}
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-violet-500/50 transition-colors">
                      <CardContent className="p-6 text-center">
                        <stat.icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </StaggerContainer>

              {/* Values */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Mes Valeurs
                </h3>
                <StaggerContainer className="space-y-4">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-700 hover:border-violet-500/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                              <value.icon className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">
                                {value.title}
                              </h4>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                {value.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
