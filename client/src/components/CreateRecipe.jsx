import React from 'react';
import axios from 'axios';

class CreateRecipe extends React.Component {
  constructor () {
    super();
    this.state = {
      // need to grab user id!!!
      recipeName: '',
      servingSize: 2,
      cookingTime: 30,
      ingredients: '',
      direction: '',
      images: [],
      userId: 1,
    };

    this.updateForm = this.updateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  updateForm (e) {
    e.preventDefault();
    const newState = this.state;

    newState[e.target.name] = e.target.value;

    this.setState(newState);
  }

  uploadFile (e) {
    const files = Array.from(e.target.files);
    const fileData = new FormData();

    files.forEach((file, i) => {
      // fileData[i] = file;
      fileData.append('recipePic', file, file.name);
    });

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }

    // let data = new FormData();

    // for (var i = 0; i < files.length; i++) {
    //     let file = files.item(i);
    //     data.append('images[' + i + ']', file, file.name);
    // }

    // const config = {
    //     headers: { 'content-type': 'multipart/form-data' }
    // }

    // return axios.post('/api/images', data, config)
    axios.post('/uploadImage', fileData, config)
      .then(({ data }) => {
        const { images } = this.state;
        images.push(data.imageUrl);
        this.setState({ images });
      })
      .catch(err => console.log(err));
  }

  submitForm () {
    const form = this.state;

    const resetForm = {
      recipeName: '',
      servingSize: 2,
      cookingTime: 30,
      ingredients: '',
      direction: '',
      images: [],
      userId: 1,
    };

    axios.post('/createRecipe', {
      data: form,
    })
      .then(() => this.setState(resetForm))
      .catch(err => console.log(err));
  }

  render() {
    const inputFields = [
      'Recipe Name',
      'Serving Size',
      'Cooking Time',
      'Ingredients',
      'Direction',
    ];

    const keys = Object.keys(this.state);

    return(
      <div>
        <form>
          {
            inputFields.map((ele, i) => (
              <div key={`input${ele}`}>
                <label>
                  {ele}
                  {': '}
                </label>
                { ele === 'Ingredients' || ele === 'Direction' ?
                  <textarea
                    type="text"
                    value={this.state[keys[i]]}
                    name={keys[i]}
                    onChange={this.updateForm}
                  />
                  :
                  <input
                    type="text"
                    value={this.state[keys[i]]}
                    name={keys[i]}
                    onChange={this.updateForm}
                  />
                }
              </div>
            ))
          }
        <input type="file" onChange={this.uploadFile} multiple/>
        </form>
        <button onClick={this.submitForm}>Create Recipe</button>
      </div>
    );
  }
}

export default CreateRecipe;
