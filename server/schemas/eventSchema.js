const { Schema } = require('dynamoose');

const eventSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  tournamentname: {
    type: String,
  },
  date: {
    type: Date,
  },
  price: {
    type: String,
  },
  location: {
    type: String,
  },
  state: {
    type: String,
  },
  link: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

/* -------------
  if you want to use Event.getAll() ... then uncomment the below
---------------*/
// const getAll = require('../controllers/getAll');
// const getAllWhere = require('../controllers/getAllWhere');

// function assignedGetAll() {
//   return getAll(this);
// }

// function assignedGetAllWhere(condition) {
//   return getAllWhere(this, condition);
// }

// eventSchema.statics.getAll = assignedGetAll;
// eventSchema.statics.getAllWhere = assignedGetAllWhere;

module.exports = eventSchema;
