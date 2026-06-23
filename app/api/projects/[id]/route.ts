import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await isAuthenticated(request);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const live = formData.get("live") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const featured = formData.get("featured") === "true";
    const imageFile = formData.get("image") as File | null;

    const dataToUpdate: any = {
      title,
      description,
      live,
      tags,
      featured,
    };

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
      
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "portfolio-projects",
      });
      dataToUpdate.image = uploadResponse.secure_url;
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("PUT project error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await isAuthenticated(request);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { id } = await params;
    
    // Optionnel : Récupérer le projet pour supprimer l'image sur Cloudinary si elle existe
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (project && project.image && project.image.includes("cloudinary.com")) {
      try {
        // Extraire le public_id de l'URL Cloudinary
        // Exemple d'url: https://res.cloudinary.com/dzdjvzztk/image/upload/v12345678/portfolio-projects/xyz.jpg
        const parts = project.image.split("/");
        const filename = parts[parts.length - 1];
        const publicId = `portfolio-projects/${filename.split(".")[0]}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary:", err);
      }
    }

    await prisma.project.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
