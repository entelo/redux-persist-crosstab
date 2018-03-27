'use strict';

var _constants = require('redux-persist/lib/constants');

module.exports = function (store, persistConfig) {
  var crosstabConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var blacklist = crosstabConfig.blacklist || null;
  var whitelist = crosstabConfig.whitelist || null;
  var keyPrefix = crosstabConfig.keyPrefix || _constants.KEY_PREFIX;

  var key = persistConfig.key;


  window.addEventListener('storage', handleStorageEvent, false);

  function handleStorageEvent(e) {
    if (e.key && e.key.indexOf(keyPrefix) === 0) {
      if (e.oldValue === e.newValue) {
        return;
      }

      var statePartial = JSON.parse(e.newValue);

      /* eslint-disable flowtype/no-weak-types */
      var state = Object.keys(statePartial).reduce(function (state, reducerKey) {
        /* eslint-enable flowtype/no-weak-types */
        if (whitelist && whitelist.indexOf(reducerKey) === -1) {
          return state;
        }
        if (blacklist && blacklist.indexOf(reducerKey) !== -1) {
          return state;
        }

        state[reducerKey] = JSON.parse(statePartial[reducerKey]);

        return state;
      }, {});

      store.dispatch({
        key: key,
        payload: state,
        type: _constants.REHYDRATE
      });
    }
  }
};