import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export async function uploadToCloudinary(file: string | Buffer, folder = 'himalya-sparsh') {
  if (typeof file === 'string') {
    const result = await cloudinary.v2.uploader.upload(file, { folder });
    return result;
  }

  // Buffer upload - return a promise-based approach
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder },
      (error: Error | undefined, result: any) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    if (Buffer.isBuffer(file)) {
      const { Readable } = require('stream');
      const readable = new Readable({ read() {} });
      readable.push(file);
      readable.push(null);
      readable.pipe(stream);
    }
  });
}

export async function deleteFromCloudinary(publicId: string) {
  return cloudinary.v2.uploader.destroy(publicId);
}

export default cloudinary;
