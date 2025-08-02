
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  const file = formData.get('image') as File;
  if (!file) {
    throw new Error('No image file provided');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    const results = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            tags: ['ttr-gestion-news'],
            upload_preset: null,
        }, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }).end(buffer);
    });

    revalidatePath('/');
    return { success: true, url: (results as any).secure_url };
  } catch (error) {
    console.error('Erreur lors du téléversement sur Cloudinary:', error);
    return { success: false, error: 'Échec du téléversement de l\'image.' };
  }
}
