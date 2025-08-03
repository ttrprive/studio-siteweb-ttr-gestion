
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
  cloud_name: 'dnnufnxb7',
  api_key: '132848636118531',
  api_secret: 'aaBshOdr38vIa39Yl8eHf7XnJcU',
});

export async function uploadMedia(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('media') as File;
  if (!file) {
    return { success: false, error: 'Aucun fichier média fourni.' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileType = file.type.split('/')[0] || 'auto';

    // Utilisation de `upload` avec un buffer, ce qui est plus direct
    const results = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer.toString('base64')}`, {
      resource_type: fileType as 'image' | 'video' | 'auto',
      tags: ['ttr-gestion-promotion'],
    });

    revalidatePath('/admin');
    revalidatePath('/news');
    return { success: true, url: results.secure_url };
  } catch (error) {
    console.error('Erreur lors du téléversement sur Cloudinary:', error);
    // Extraire un message d'erreur plus clair si possible
    const errorMessage = error instanceof Error ? error.message : "Échec du téléversement du média.";
    return { success: false, error: errorMessage };
  }
}
