import React from 'react';
import CreateRecipe from './CreateRecipe';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <CreateRecipe />
      </div>
    )
  }
}

export default App;
