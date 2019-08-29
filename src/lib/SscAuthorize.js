class SscAuthorizer {
  _authorizationCache = [];

  _sessionStorageKey = 'sscAuthorizationCache';

  clearAuthorizations() {
    window.sessionStorage.removeItem(this._sessionStorageKey);
    this._authorizationCache.length = 0;
  }

  tryRefreshFromSessionStorage() {
    const permissions = JSON.parse(
      window.sessionStorage.getItem(this._sessionStorageKey)
    );

    if (permissions && permissions.length) {
      this.refreshAuthorizations(permissions);
    }
  }

  isLoggedIn() {
    return !!window.sessionStorage.getItem(this._sessionStorageKey);
  }

  // Call this from security views where security actions occur
  // to refresh the current permissions cache you have
  refreshAuthorizations(authorizations) {
    this.clearAuthorizations();

    authorizations.forEach(
      item => (this._authorizationCache[item.Code] = item.Granted)
    );

    const jsonAuthorization = JSON.stringify(authorizations);
    window.sessionStorage.setItem(this._sessionStorageKey, jsonAuthorization);
  }

  // Send your permissions as a list of string arguments.
  // Usually you will only need one permission by each functionality.
  has(permissionCode) {
    return !!this._authorizationCache[permissionCode];
  }

  hasAll(...permissions) {
    let hasAllPermissions = true;

    for (let i = 0; i < permissions.length; i++) {
      const code = permissions[i];

      hasAllPermissions = hasAllPermissions && !!this._authorizationCache[code];

      if (!hasAllPermissions) break;
    }

    return hasAllPermissions;
  }

  hasOne(...permissions) {
    let hasOne = false;

    for (let i = 0; i < permissions.length; i++) {
      const code = permissions[i];

      hasOne = hasOne || !!this._authorizationCache[code];
      if (hasOne) break;
    }

    return hasOne;
  }
}

export const Authorizer = new SscAuthorizer();
