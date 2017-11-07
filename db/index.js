const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('postgres://nlnscmak:EBCvGRBezMg_5Kp-JJoVGg-4NCLM3ftR@pellefant.db.elephantsql.com:5432/nlnscmak', {dialect: 'postgres'});

const Fridge = sequelize.define('fridge', {
  users: {
    type: Sequelize.ARRAY({type: Sequelize.STRING})
  },
  name: {
    type: Sequelize.STRING
  },
  vidCode: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const FridgeItems = sequelize.define('fridgeItem', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  protein: {
    type: Sequelize.INTEGER
  },
  fat: {
    type: Sequelize.INTEGER
  },
  carbs: {
    type: Sequelize.INTEGER
  },
  calories: {
    type: Sequelize.INTEGER
  },
  totalWeight: {
    type: Sequelize.INTEGER
  }
});

const MessageInfo = sequelize.define('messageInfo', {
  messageText: {
    type: Sequelize.STRING
  },
  like: {
    type: Sequelize.ARRAY({type: Sequelize.STRING})
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

// Foreign Keys
FridgeItems.belongsTo(Fridge, {foreignKey: 'fridgeId', allowNull: true, onDelete: 'CASCADE'});
Fridge.hasMany(FridgeItems, {foreignKey: 'fridgeId', allowNull: true, onDelete: 'CASCADE'});

MessageInfo.belongsTo(Fridge, {foreignKey: 'fridgeId', allowNull: true, onDelete: 'CASCADE'});
Fridge.hasMany(MessageInfo, {foreignKey: 'fridgeId', allowNull: true, onDelete: 'CASCADE'});

module.exports.fridge = Fridge;
module.exports.fridgeItems = FridgeItems;
module.exports.messageInfo = MessageInfo;