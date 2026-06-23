"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Mail, Heart, ArrowUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <FadeIn>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Portfolio
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Développeur Full Stack passionné par la création d'expériences web exceptionnelles.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
                  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
                  { icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
                  { icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: "Email" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-800 hover:bg-violet-500/20 hover:border-violet-500/50 border border-slate-700 transition-all group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-violet-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Navigation</h4>
              <ul className="space-y-2">
                {[
                  { name: "Accueil", href: "#home" },
                  { name: "À propos", href: "#about" },
                  { name: "Projets", href: "#projects" },
                  { name: "Compétences", href: "#skills" },
                  { name: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-violet-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Services */}
          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Services</h4>
              <ul className="space-y-2">
                {[
                  "Développement Web",
                  "Applications React/Next.js",
                  "API REST & GraphQL",
                  "Optimisation Performance",
                  "Consulting Technique",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={0.3}>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Paris, France</p>
                <p>{SOCIAL_LINKS.email}</p>
                <p>Disponible pour projets</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-violet-500/50 hover:bg-violet-500/10 text-violet-400 hover:text-violet-300"
                onClick={scrollToTop}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Retour en haut
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Portfolio. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-red-500 fill-current" /> par MFOLOUM ULRICH
            </p>
            <a
              href="/admin/login"
              className="flex items-center gap-1.5 text-slate-700 hover:text-slate-500 transition-colors text-xs"
              title="Espace administration"
            >
              <Lock className="w-3 h-3" />
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
