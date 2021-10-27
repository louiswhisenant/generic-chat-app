import Dexie from 'dexie';

const db = new Dexie('genericChatAppDB');
db.version(1).stores({ messages: '++id,status,chat,author,text,deliverAt' });

export default db;
