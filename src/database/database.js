import Dexie from 'dexie';

const db = new Dexie('events_db');

db.version(1).stores({ events: '_id++' });

export default db;
