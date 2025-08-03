
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

// Configuration Cloudinary avec les clés publiques. 
// La clé secrète n'est plus nécessaire pour l'upload non signé.
cloudinary.config({
  cloud_name: 'dnnufnxb7',
  api_key: '132848636118531',
  api_secret: 'aaBshOdr38vIa39Yl8eHf7XnJcU', // La clé secrète est conservée ici pour la configuration, mais non utilisée pour l'upload.
});

const UPLOAD_PRESET = 'ttr_gestion_preset';

export async function uploadMedia(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('media') as File;
  if (!file) {
    return { success: false, error: 'Aucun fichier média fourni.' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64String}`;

    // Utilisation de l'upload avec le preset non signé
    const result = await cloudinary.uploader.upload(dataUri, {
      upload_preset: UPLOAD_PRESET,
      resource_type: 'auto', // Laisse Cloudinary détecter si c'est une image ou une vidéo
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
