import { DEXIE_DB_NAME } from '@config';
import Dexie from 'dexie';

export const db = new Dexie(DEXIE_DB_NAME);

db.version(1).stores({
  users: '++id, name, email, password, role, token, createdAt, updatedAt',
});
