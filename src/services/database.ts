if (!window.indexedDB) {
  console.warn("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

// Promise-based wrapper for IndexedDB
export class AppIndexedDb {
  public db: any;
  public request: any;

  constructor(dbName: string, version = 1) {
    this.request = indexedDB.open(dbName, version);
    this.request.onerror = (event: Event) => { console.log('Error opening connection!') };
    this.request.onsuccess = (event: Event) => { this.db = (event?.target as any)?.result };
  }

  init(event: Event) {
    this.db = (event?.target as any)?.result
  }

  createCollection(name: string, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.onupgradeneeded = (event: Event) => {
        const collection = this.db.createObjectStore(name, { keyPath: key });
      }
    })
  }

  updateCollection(collectionName: string, data: any) {
    const transaction = this.db.transaction([collectionName], 'readwrite');
  }
}
