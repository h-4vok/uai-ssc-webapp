import { SessionStorage } from './SessionStorage';

export class SingleItemSessionStorage {
  constructor(key) {
    this.key = key;
  }

  storage = new SessionStorage();

  get = () => this.storage.get(this.key);

  remove = () => this.storage.remove(this.key);

  set = value => this.storage.set(this.key, value);
}
