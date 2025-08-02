
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

// Configuration directe pour garantir que les clés sont disponibles
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
