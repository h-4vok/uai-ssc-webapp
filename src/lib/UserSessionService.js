import { SessionStorage } from './SessionStorage';

class UserSessionServiceComponent {
  storage = new SessionStorage();

  _cache = { MyUserId: null };

  _sessionStorageKey = 'sscUserSession';

  constructor() {
    this.tryRefreshFromSessionStorage();
  }

  clear() {
    this.storage.remove(this._sessionStorageKey);
    this._cache = { MyUserId: null };
  }

  tryRefreshFromSessionStorage() {
    const data = JSON.parse(this.storage.get(this._sessionStorageKey));

    this.refresh(data);
  }

  refresh(data) {
    this.clear();

    this._cache = data;

    const json = JSON.stringify(data);
    this.storage.set(this._sessionStorageKey, json);
  }

  setUserId = id => {
    const newData = {
      ...this._cache,
      MyUserId: id
    };

    this.refresh(newData);
  };

  getUserId = () => {
    if (!this._cache || !this._cache.MyUserId) return null;

    return this._cache.MyUserId;
  };
}

export const UserSessionService = new UserSessionServiceComponent();
