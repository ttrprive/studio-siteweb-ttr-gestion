
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadMedia(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('media') as File;
  if (!file) {
    return { success: false, error: 'Aucun fichier média fourni.' };
  }

  // Vérification que les clés API sont bien chargées
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    const errorMessage = "Les variables d'environnement Cloudinary ne sont pas configurées.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
  
  const fileType = file.type.split('/')[0]; // 'image' or 'video'

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    const results: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: fileType === 'image' ? 'image' : 'video',
          tags: ['ttr-gestion-promotion'],
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    revalidatePath('/news');
    return { success: true, url: results.secure_url };
  } catch (error) {
    console.error('Erreur lors du téléversement sur Cloudinary:', error);
    return { success: false, error: `Échec du téléversement du média.` };
  }
}
