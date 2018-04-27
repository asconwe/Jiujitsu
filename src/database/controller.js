import db from './database';

export const readAllEvents = () => db.transaction('rw', 'events', async () => db.events.toArray());

export const updatedAt = () => window.localStorage.getItem('events_updated_at');

export const saveUpdateTime = () => {
  window.localStorage.setItem('events_updated_at', Date.now());
};

export const writeEventsFromChanges = changes => db.transaction('rw', 'events', async () => changes.forEach(change => db.events.add(change.eventId)));
