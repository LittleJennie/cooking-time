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
  }

  updateForm (e) {
    e.preventDefault();
    const newState = this.state;

    newState[e.target.name] = e.target.value;

    this.setState(newState);
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
                <input 
                  value={this.state[keys[i]]}
                  name={keys[i]}
                  onChange={this.updateForm}
                />
              </div>
            ))
          }
        </form>
        <button onClick={this.submitForm}>Create Recipe</button>
      </div>
    )
  }
}

export default CreateRecipe;
