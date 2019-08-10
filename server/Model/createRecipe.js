const pg = require('../db');

module.exports = (req, res) => {
  const { recipeName, userId, ingredients, direction, servingSize, cookingTime, images } = req.body.data;

  console.log(recipeName, userId, ingredients, direction, servingSize, cookingTime, images)

  const recipeQuery = {
    name: 'create-recipe',
    text: `
      INSERT INTO recipes
        (recipe_name, user_id, ingredients, directions, serving_size, cooking_time, images)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    values: [ recipeName, userId, ingredients, direction, servingSize, cookingTime, images ],
  };

  pg.query(recipeQuery)
    .then(data => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
