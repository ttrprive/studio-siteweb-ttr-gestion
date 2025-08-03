
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

// Configuration Cloudinary avec les clés d'API.
// C'est la méthode la plus sécurisée et la plus fiable.
cloudinary.config({
  cloud_name: 'dnnufnxb7',
  api_key: '132848636118531',
  api_secret: 'aaBshOdr38vIa39Yl8eHf7XnJcU',
});

export async function uploadMedia(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('media') as File;
  const folder = formData.get('folder') as string || 'general';

  if (!file || file.size === 0) {
    return { success: false, error: 'Aucun fichier média fourni.' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Utilisation de l'upload "signé" directement avec les clés API.
    // Cette méthode est plus robuste que les presets non signés.
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: 'auto',
      folder: `ttr_gestion/${folder}`,
    });

    // Revalidation des chemins pour que les nouvelles images apparaissent immédiatement.
    revalidatePath('/admin');
    revalidatePath('/news');

    return { success: true, url: result.secure_url };

  } catch (error) {
    console.error("Erreur lors de l'upload signé sur Cloudinary:", error);
    const errorMessage = error instanceof Error ? error.message : "Échec du téléversement du média.";
    return { success: false, error: errorMessage };
  }
}
