"use client";

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Plus, Edit2, Trash2, LogOut, X, Upload,
  ExternalLink, Loader2, CheckCircle, AlertCircle,
  Star, FolderOpen, Home,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  live: string;
  tags: string[];
  featured: boolean;
  image: string;
  createdAt: string;
}

interface FormState {
  title: string;
  description: string;
  live: string;
  tags: string;
  featured: boolean;
  image: File | null;
  imagePreview: string;
}

const defaultForm: FormState = {
  title: "",
  description: "",
  live: "",
  tags: "",
  featured: false,
  image: null,
  imagePreview: "",
};

export default function AdminDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formState, setFormState] = useState<FormState>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const notify = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      setProjects(await res.json());
    } catch {
      notify("error", "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const openAdd = () => {
    setEditingProject(null);
    setFormState(defaultForm);
    setShowModal(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setFormState({
      title: p.title,
      description: p.description,
      live: p.live,
      tags: p.tags.join(", "),
      featured: p.featured,
      image: null,
      imagePreview: p.image,
    });
    setShowModal(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", formState.title);
      fd.append("description", formState.description);
      fd.append("live", formState.live);
      fd.append(
        "tags",
        JSON.stringify(
          formState.tags.split(",").map((t) => t.trim()).filter(Boolean)
        )
      );
      fd.append("featured", String(formState.featured));
      if (formState.image) fd.append("image", formState.image);

      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";
      const res = await fetch(url, { method, body: fd });

      if (res.ok) {
        notify("success", editingProject ? "Projet modifié !" : "Projet ajouté !");
        setShowModal(false);
        fetchProjects();
      } else {
        notify("error", "Erreur lors de la sauvegarde");
      }
    } catch {
      notify("error", "Erreur réseau");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        notify("success", "Projet supprimé !");
        setDeleteId(null);
        fetchProjects();
      } else {
        notify("error", "Erreur lors de la suppression");
      }
    } catch {
      notify("error", "Erreur réseau");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border"
            style={{
              background: toast.type === "success" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
              borderColor: toast.type === "success" ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)",
            }}
          >
            {toast.type === "success"
              ? <CheckCircle className="w-4 h-4 text-emerald-400" />
              : <AlertCircle className="w-4 h-4 text-red-400" />
            }
            <span className={`text-sm font-medium ${toast.type === "success" ? "text-emerald-300" : "text-red-300"}`}>
              {toast.msg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Admin Dashboard</span>
              <span className="hidden sm:inline text-gray-500 text-sm">— Gestion des projets</span>
            </div>
            <a
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-violet-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-violet-500/10 border border-transparent hover:border-violet-500/20 ml-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </a>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Mes Projets</h1>
            <p className="text-gray-400 mt-1 text-sm">
              {projects.length} projet{projects.length !== 1 ? "s" : ""} au total
            </p>
          </div>
          <button
            id="add-project-btn"
            onClick={openAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:scale-[1.03]"
          >
            <Plus className="w-4 h-4" />
            Ajouter un projet
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 border-2 border-dashed border-slate-700 rounded-2xl"
          >
            <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-medium">Aucun projet pour l&apos;instant</p>
            <p className="text-gray-600 text-sm mt-1">Clique sur &quot;Ajouter un projet&quot; pour commencer</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden group hover:border-violet-500/40 transition-all hover:shadow-lg hover:shadow-violet-500/10"
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
                      <FolderOpen className="w-10 h-10 text-slate-500" />
                    </div>
                  )}
                  {project.featured && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 bg-violet-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      <Star className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-white text-lg mb-1 truncate">{project.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-violet-500/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Voir le site
                    </a>
                    <div className="ml-auto flex gap-2">
                      <button
                        onClick={() => openEdit(project)}
                        className="p-2 text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(project.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">
                  {editingProject ? "Modifier le projet" : "Ajouter un projet"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Image du projet</label>
                  <div
                    className="relative border-2 border-dashed border-slate-600 hover:border-violet-500/60 rounded-xl overflow-hidden cursor-pointer transition-all group"
                    style={{ minHeight: "160px" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formState.imagePreview ? (
                      <div className="relative w-full h-48">
                        <Image
                          src={formState.imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload className="w-8 h-8 text-white" />
                          <span className="text-white text-sm ml-2">Changer l&apos;image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-gray-500 group-hover:text-violet-400 transition-colors">
                        <Upload className="w-8 h-8 mb-2" />
                        <p className="text-sm font-medium">Cliquer pour sélectionner une image</p>
                        <p className="text-xs mt-1">PNG, JPG, WebP — recommandé 1280×720</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300" htmlFor="proj-title">
                    Titre du projet <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="proj-title"
                    type="text"
                    value={formState.title}
                    onChange={(e) => setFormState((p) => ({ ...p, title: e.target.value }))}
                    required
                    placeholder="Ex: Plateforme E-commerce"
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300" htmlFor="proj-desc">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="proj-desc"
                    value={formState.description}
                    onChange={(e) => setFormState((p) => ({ ...p, description: e.target.value }))}
                    required
                    rows={3}
                    placeholder="Décris ton projet en quelques phrases..."
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                  />
                </div>

                {/* Live URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300" htmlFor="proj-live">
                    Lien du site en production <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="proj-live"
                    type="url"
                    value={formState.live}
                    onChange={(e) => setFormState((p) => ({ ...p, live: e.target.value }))}
                    required
                    placeholder="https://mon-site.com"
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300" htmlFor="proj-tags">
                    Technologies (séparées par des virgules)
                  </label>
                  <input
                    id="proj-tags"
                    type="text"
                    value={formState.tags}
                    onChange={(e) => setFormState((p) => ({ ...p, tags: e.target.value }))}
                    placeholder="Ex: Next.js, TypeScript, Tailwind"
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Featured toggle */}
                <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3">
                  <button
                    type="button"
                    id="featured-toggle"
                    onClick={() => setFormState((p) => ({ ...p, featured: !p.featured }))}
                    className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                      formState.featured ? "bg-violet-600" : "bg-slate-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                        formState.featured ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div>
                    <p className="text-sm font-medium text-white">Projet mis en avant</p>
                    <p className="text-xs text-gray-500">Affiche le badge &quot;Featured&quot; sur la carte</p>
                  </div>
                  <Star className={`ml-auto w-4 h-4 ${formState.featured ? "text-violet-400" : "text-gray-600"}`} />
                </div>

                {/* Footer buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-600 text-gray-300 hover:bg-slate-700 transition-all font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sauvegarde...
                      </>
                    ) : editingProject ? (
                      "Enregistrer les modifications"
                    ) : (
                      "Ajouter le projet"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Supprimer ce projet ?</h3>
              <p className="text-gray-400 text-sm text-center mb-6">
                Cette action est irréversible. L&apos;image associée sera également supprimée.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-600 text-gray-300 hover:bg-slate-700 transition-all font-medium text-sm"
                >
                  Annuler
                </button>
                <button
                  id="confirm-delete-btn"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
