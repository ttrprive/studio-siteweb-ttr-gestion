
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

// Configuration Cloudinary avec les clés publiques.
cloudinary.config({
  cloud_name: 'dnnufnxb7',
  api_key: '132848636118531',
  api_secret: 'aaBshOdr38vIa39Yl8eHf7XnJcU',
});

const UPLOAD_PRESET = 'ttr_gestion_preset';

export async function uploadMedia(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('media') as File;
  const folder = formData.get('folder') as string || 'general'; // Dossier par défaut si non spécifié

  if (!file) {
    return { success: false, error: 'Aucun fichier média fourni.' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Utilisation de l'upload avec le preset non signé et un dossier spécifié
    const result = await cloudinary.uploader.upload(dataUri, {
      upload_preset: UPLOAD_PRESET,
      resource_type: 'auto',
      folder: `ttr_gestion/${folder}`, // Organise les fichiers dans un dossier principal et un sous-dossier
    });

    revalidatePath('/admin');
    revalidatePath('/news');

    return { success: true, url: result.secure_url };

  } catch (error) {
    console.error("Erreur lors de l'upload sur Cloudinary via le preset:", error);
    const errorMessage = error instanceof Error ? error.message : "Échec du téléversement du média.";
    return { success: false, error: errorMessage };
  }
}
