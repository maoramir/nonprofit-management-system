import { storageKey } from "@/lib/constants";
import { RegistrationFormData } from "@/lib/types";
import { mergeWithDefaults } from "@/lib/utils";

const DB_NAME = "amuta-registration-db";
const STORE_NAME = "drafts";

function openDatabase(): Promise<IDBDatabase | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!("indexedDB" in window)) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadRegistrationData(): Promise<RegistrationFormData | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const database = await openDatabase();

    if (!database) {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? mergeWithDefaults(JSON.parse(raw)) : null;
    }

    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(storageKey);

      request.onsuccess = () => {
        const value = request.result;
        resolve(value ? mergeWithDefaults(value as RegistrationFormData) : null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? mergeWithDefaults(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }
}

export async function saveRegistrationData(data: RegistrationFormData) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const database = await openDatabase();

    if (!database) {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, storageKey);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      // Ignore browser storage failures and keep working in-memory.
    }
  }
}

export async function clearRegistrationData() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const database = await openDatabase();
    if (database) {
      await new Promise<void>((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(storageKey);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  } catch {
    // Ignore and continue clearing fallback storage.
  }

  window.localStorage.removeItem(storageKey);
}
