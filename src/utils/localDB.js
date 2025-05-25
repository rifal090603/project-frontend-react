import { openDB } from 'idb';

const DB_NAME = 'coffee_shop';
const DB_VERSION = 1;
const STORE_NAME = 'menus';

export async function getLocalMenus() {
  const db = await openDB(DB_NAME, DB_VERSION);
  return await db.getAll(STORE_NAME);
}

export async function saveMenusLocally(menus) {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
  const tx = db.transaction(STORE_NAME, 'readwrite');
  for (const menu of menus) {
    tx.store.put(menu);
  }
  await tx.done;
}
