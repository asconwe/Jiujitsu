export default {
  title: 'event schema',
  version: 0,
  description: 'describes an event',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    tournamentname: {
      type: 'string',
    },
    date: {
      type: 'date',
    },
    city: {
      type: 'string',
    },
    price: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
};
