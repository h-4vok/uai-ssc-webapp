import { LocalStorage } from './LocalStorage';

export class SingleItemSessionStorage {
  constructor(key) {
    this.key = key;
  }

  storage = new LocalStorage();

  get = () => this.storage.get(this.key);

  remove = () => this.storage.remove(this.key);

  set = value => this.storage.set(this.key, value);
}
