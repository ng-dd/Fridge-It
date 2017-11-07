const Fridge = require('../../db/index.js').fridge

module.exports = {
 getUsers: (req, res) => {
   Fridge.findAll()
   .then((data) => {
    res.send(data)
   })
   .catch((err)=>{
     res.status(500).send(err);
   })
 },
 
 addVidCode: (req, res) => {


   console.log(req.body)
  Fridge.update({
    vidCode: req.body.vidCode
  },
  {
    where: {name: req.body.name}
  })
  .then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    res.status(500).send(data);
  })
 },

}