import React from 'react';
import helperFunctions from '../helperFunctions';

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
      previewImgs: [],
      files: [],
    };

    this.updateForm = this.updateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.previewImg = this.previewImg.bind(this);
  }

  updateForm (e) {
    e.preventDefault();
    const newState = this.state;

    newState[e.target.name] = e.target.value;

    this.setState(newState);
  }

  previewImg (e) {
    let { previewImgs, files } = this.state;
    previewImgs.push(URL.createObjectURL(event.target.files[0]));
    files.push(event.target.files[0]);

    this.setState({ previewImgs, files });
  }

  submitForm () {
    let { images, files } = this.state;

    const resetForm = {
      recipeName: '',
      servingSize: 2,
      cookingTime: 30,
      ingredients: '',
      direction: '',
      images: [],
      userId: 1,
      previewImgs: [],
    };

    helperFunctions.uploadImage(files)
      .then(({ data }) => {
        for (let i = 0; i < data.imageUrl.length; i ++) {
          images.push(data.imageUrl[i]);
        }

        files = [];
        this.setState({ images, files });
      })
      .catch(err => console.log(err))
      .then(() => {
        const {
          recipeName,
          servingSize,
          cookingTime,
          ingredients,
          direction,
          images,
          userId,
        } = this.state;

        const formData = {
          recipeName,
          servingSize,
          cookingTime,
          ingredients,
          direction,
          images,
          userId,
        };

        return helperFunctions.submitRecipe(formData)
      })
      .then(() => this.imgInput.value = null)
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
    const { previewImgs, recipeName } = this.state;

    const imgStyle = {
      width: '100px',
      height: '100px',
    };

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
          <input 
            type="file" 
            onChange={this.previewImg} 
            ref={ ref => this.imgInput = ref }
            multiple
          />
        </form>
        <div>
          {
            previewImgs.map((img, i) => (
              <img
                style={imgStyle}
                src={img}
                alt={`${recipeName}-img-${i}`}
                key={`${recipeName}-${img}`}
              />
            ))
          }
        </div>
        <button onClick={this.submitForm}>Create Recipe</button>
      </div>
    );
  }
}

export default CreateRecipe;
