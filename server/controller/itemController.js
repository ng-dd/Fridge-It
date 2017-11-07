const Item = require('../../db/index').fridgeItems;
const axios = require('axios');
const unirest = require('unirest');
//functions to add items, get items, and delete items from the database using promises

module.exports = {
  getAllItems: (req, res) => {
    Item.findAll({
      where: {fridgeId: req.params.fridgeId}
    })
    .then((data) => {
      res.send(data); 
    })
    .catch(err => {
      res.status(500).send(err); 
    });
  },

  addItem: (req, res) => {
    Item.create({
      name: req.body.name,
      quantity: req.body.quantity,
      type: req.body.type,
      fridgeId: req.body.fridgeId,
      user: req.body.user,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fat: req.body.fat,
      calories: req.body.calories,
      totalWeight: req.body.totalWeight
    })
    .then((data) => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send(err)
    }); 
  },

  updateItem: (req, res) => {
    Item.update({
      name: req.body.name,
      quantity: req.body.quantity,
      type: req.body.type
    },
    { where: {id: req.params.id},
      returning: true,
    })
    .then((data) => {
      res.status(202).send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },
  
  deleteItem: (req, res) => {
    Item.destroy({
      where: {id: req.params.id}
    })
    .then((data) => {
      res.send({id: req.params.id});
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },

  getMacros: (req, res) => {
    console.log(req.body)
    axios.get(`https://api.edamam.com/api/food-database/parser?ingr=${req.body.item}&app_id=1fd96143&app_key=278fd5e87671519afa3b8cacb5a05268`)
    .then((data) => {
      console.log(req.body, 'fuuuuuuuuuuuck')
      res.send(data.data).status(200)
    })
    .catch((err) => {
      console.log(err)
    })
  },

  getRealMacros: (req, res) => {
    axios.post('https://api.edamam.com/api/food-database/nutrients?app_id=1fd96143&app_key=278fd5e87671519afa3b8cacb5a05268', {
      "yield": 1,
      "ingredients": [
        {
          "quantity": 1,
          "measureURI": req.body.measureURI,
          "foodURI": req.body.foodURI
        }
      ]
    })
    .then((data) => {
      res.send(data.data).send(200)
    })
    .catch((err) => {
      console.log(err)
    })
  }
};

    // unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients"
    //               + "?ingredients=" + ingredients.join(',') + '&fillIngredients=false'
    //               + "&limitLicense=false" + "&number=9" + "&ranking=1")
    //         .header("X-Mashape-Key", process.env.API_FOOD_KEY)
    //         .header("Accept", "application/json")
    //         .end((result) => {
    //           console.log('Headers: ', result.headers);
    //           res.send(result.body);
    //         });