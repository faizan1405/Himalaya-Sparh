declare module 'cloudinary' {
  const cloudinary: {
    v2: {
      config: (options: Record<string, string>) => void;
      uploader: {
        upload: (file: string, options?: Record<string, any>) => Promise<any>;
        upload_stream: (options: Record<string, any>, callback: (error: Error | undefined, result: any) => void) => any;
        destroy: (publicId: string) => Promise<any>;
      };
    };
  };
  export default cloudinary;
}
