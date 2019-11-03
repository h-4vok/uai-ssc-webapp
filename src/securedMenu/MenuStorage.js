import { GlobalState } from '../lib/GlobalState';
import { SessionStorage } from '../lib/SessionStorage';

class SscMenuStorage {
  storage = new SessionStorage();

  _menuCache = [];

  _sessionStorageKey = 'sscMenuCache';

  clear() {
    this.storage.remove(this._sessionStorageKey);
    this._menuCache = [];
  }

  tryRefresh() {
    const menu = JSON.parse(this.storage.get(this._sessionStorageKey));

    if (menu && menu.length) {
      this.refresh(menu);
    }
  }

  refresh(menu) {
    this.clear();
    this._menuCache = menu;

    const jsonItem = JSON.stringify(menu);
    this.storage.set(this._sessionStorageKey, jsonItem);

    GlobalState.AppComponent.refreshSecuredMenu(menu);
  }

  save(menu) {
    const jsonItem = JSON.stringify(menu);
    this.storage.set(this._sessionStorageKey, jsonItem);
  }
}

export const MenuStorage = new SscMenuStorage();
