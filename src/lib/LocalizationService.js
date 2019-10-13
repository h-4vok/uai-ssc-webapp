import { SessionStorage } from './SessionStorage';
import { GlobalState } from './GlobalState';

class LocalizationServiceComponent {
  storage = new SessionStorage();

  _sessionStorageKey = 'sscLanguageDictionaryCache';

  constructor() {
    this.tryRefreshFromStorage();
  }

  tryRefreshFromStorage() {
    const data = this.storage.get(this._sessionStorageKey);
    if (!data) {
      this.loadDefault();
      return;
    }

    const dictionary = JSON.parse(data);

    GlobalState.Dictionary = dictionary;
  }

  switchDictionary(dictionary) {
    this.storage.set(this._sessionStorageKey, dictionary);
    console.log({ dictionary });
    window.location.reload();
  }
}

export const LocalizationService = new LocalizationServiceComponent();
