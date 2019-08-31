export class SessionStorage {
  get = key => JSON.parse(window.sessionStorage.getItem(key));

  set = (key, value) =>
    window.sessionStorage.setItem(key, JSON.stringify(value));

  remove = key => window.sessionStorage.removeItem(key);
}
