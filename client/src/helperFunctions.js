import axios from 'axios';

const helperFunctions = {
  uploadImage: (files) => {
    const fileData = new FormData();

    files.forEach((file, i) => {
      fileData.append('recipePic', file, file.name);
    });

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    return axios.post('/uploadImage', fileData, config)
  },

  submitRecipe: (formData) => {
    return axios.post('/createRecipe', {
      data: formData,
    });
  },
};

export default helperFunctions;