export class SessionStorage {
  get = key => window.sessionStorage.getItem(key);

  set = (key, value) => window.sessionStorage.setItem(key, value);

  remove = key => window.sessionStorage.removeItem(key);
}
