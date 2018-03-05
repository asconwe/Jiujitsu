const { connect, connection } = require('./connect')
const readEvents = require('./readEvents')
const updateEvent = require('./updateEvent')
const createEvent = require('./createEvent')
const deleteEvent = require('./deleteEvent')

module.exports = {
  connect,
  connection,
  readEvents,
  createEvent,
  deleteEvent,
  updateEvent
}