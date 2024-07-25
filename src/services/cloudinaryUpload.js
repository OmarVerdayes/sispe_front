const cloudinaryConfig = {
    cloud_name: 'dqx5sexwp',
    upload_preset: 'yrggbrjm' 
  };
  
  export async function uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.upload_preset);
  
      const uploadUrl = file.type.startsWith('image/') 
        ? `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload` 
        : `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/video/upload`;
  
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta de Cloudinary:', errorData);
        throw new Error(`Cloudinary error: ${errorData.error.message}`);
      }
  
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }
  