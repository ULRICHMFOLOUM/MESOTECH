"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SKILLS } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";

const skillLevels: Record<string, number> = {
  "React": 95,
  "Next.js": 90,
  "TypeScript": 85,
  "Node.js": 80,
  "PostgreSQL": 75,
  "Tailwind CSS": 90,
  "Framer Motion": 85,
  "Git": 90,
  "Docker": 70,
  "AWS": 65,
  "React Native": 80,
  "Flutter": 60,
};

// Barre de progression animée qui se déclenche quand elle entre dans le viewport
function AnimatedSkillBar({
  skill,
  value,
  color = "from-violet-500 to-indigo-500",
  delay = 0,
}: {
  skill: string;
  value: number;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-gray-300 font-medium text-sm">{skill}</span>
        <motion.span
          className="text-violet-400 text-sm font-semibold tabular-nums"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 0.3 }}
        >
          {value}%
        </motion.span>
      </div>

      {/* Track */}
      <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 1,
            delay: delay + 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Compétences
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technologies &{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Outils
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Un ensemble de technologies modernes et d'outils que j'utilise pour créer
              des expériences web exceptionnelles.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Frontend */}
          <FadeIn direction="left">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-400" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SKILLS.frontend.map((skill, i) => (
                  <AnimatedSkillBar
                    key={skill}
                    skill={skill}
                    value={skillLevels[skill] ?? 80}
                    color="from-violet-500 to-indigo-500"
                    delay={i * 0.08}
                  />
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          {/* Backend */}
          <FadeIn direction="right">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-400" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SKILLS.backend.map((skill, i) => (
                  <AnimatedSkillBar
                    key={skill}
                    skill={skill}
                    value={skillLevels[skill] ?? 75}
                    color="from-indigo-500 to-blue-500"
                    delay={i * 0.08}
                  />
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          {/* Tools & DevOps */}
          <FadeIn direction="left">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400" />
                  Outils &amp; DevOps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {SKILLS.tools.map((tool, index) => (
                    <motion.div
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.3 }}
                    >
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:border-violet-500/50 hover:text-violet-400 transition-colors"
                      >
                        {tool}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Mobile */}
          <FadeIn direction="right">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400" />
                  Mobile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SKILLS.mobile.map((skill, i) => (
                  <AnimatedSkillBar
                    key={skill}
                    skill={skill}
                    value={skillLevels[skill] ?? 70}
                    color="from-pink-500 to-purple-500"
                    delay={i * 0.08}
                  />
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Autres compétences */}
        <FadeIn className="mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
              Autres Compétences
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "UI/UX Design",
                "Responsive Design",
                "SEO",
                "Performance Optimization",
                "Testing (Jest, Cypress)",
                "CI/CD",
                "Agile/Scrum",
                "API Design",
                "Database Design",
                "Security Best Practices",
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
