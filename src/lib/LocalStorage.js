export class LocalStorage {
  get = key => JSON.parse(window.localStorage.getItem(key));

  set = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

  remove = key => window.localStorage.removeItem(key);
}
