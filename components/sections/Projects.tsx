"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";

interface Project {
  id: number;
  title: string;
  description: string;
  live: string;
  tags: string[];
  featured: boolean;
  image: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Mes Projets
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Travaux{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Réalisés
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Découvrez une sélection de mes projets les plus récents et innovants,
              chacun représentant un défi technique unique.
            </p>
          </div>
        </FadeIn>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-slate-700" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-slate-700 rounded w-3/4" />
                  <div className="h-4 bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-700 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">Aucun projet à afficher pour le moment.</p>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-slate-800/50 border border-slate-700 hover:border-violet-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Image */}
                  <div className="relative aspect-video bg-slate-700 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 flex items-center justify-center">
                        <span className="text-5xl opacity-40">🚀</span>
                      </div>
                    )}

                    {/* Featured badge */}
                    {project.featured && (
                      <span className="absolute top-3 left-3 flex items-center gap-1 bg-violet-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
                        <ExternalLink className="w-4 h-4" />
                        Visiter le site
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, ti) => (
                        <Badge
                          key={ti}
                          variant="outline"
                          className="text-xs border-slate-600 text-slate-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="flex items-center gap-1.5 text-violet-400 group-hover:text-violet-300 text-sm font-medium transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Voir le projet
                    </div>
                  </div>
                </motion.a>
              </FadeIn>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
