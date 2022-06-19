import axios from 'axios';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
  onUploadProgress: (event) => {
    console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
  },
};

export const otherService = {

  uploadFile: async (file) => {
    try {
      const res = await axios.post('/api/upload', file, config);
      const pathLink = `/uploads/${res.data.files.file.originalFilename}`
      return {data: pathLink, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
}
