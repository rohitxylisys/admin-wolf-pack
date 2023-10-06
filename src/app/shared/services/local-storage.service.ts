/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
@Injectable({
  providedIn: 'root',
})
// eslint-disable-next-line import/prefer-default-export
export class LocalStorageService {
  constructor() {
    localforage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ],
      storeName: 'wolfpack-admin',
      name: 'wolfpack-admin',
    });
  }
  storeItem(key: any, value: any) {
    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  readStorage(key: string) {
    return localStorage.getItem(key);
  }

  removeStorage(key: string) {
    localStorage.removeItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }

  // store particular key details
  setDataInIndexedDB(key: string, value: any) {
    return localforage
      .setItem(key, JSON.stringify(value))
      .then(() => {})
      .catch(() => {});
  }

  // fetch particular key details
  async getDataFromIndexedDB(key: string) {
    return new Promise((resolve, reject) => {
      localforage
        .getItem(key)
        .then((result: any) => {
          resolve(JSON.parse(result));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // For Remove Particular Field/Key
  removeDataFromIndexedDB(key: string) {
    return new Promise((resolve, reject) => {
      localforage
        .removeItem(key)
        .then((result: any) => {
          const remove = 'Key Removed';
          return resolve(remove);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  // Database has been entirely deleted.
  clearDataFromIndexedDB() {
    return localforage.clear();
  }
}
