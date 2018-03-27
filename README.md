# Redux Persist Crosstab
Add cross tab syncing to your [redux](https://github.com/gaearon/redux) app with 1 line. This tiny module listens to the window for [redux-persist](https://github.com/rt2zz/redux-persist) storage events. When an event occurs it will dispatch a rehydrate action.

### Usage
```js
import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import crosstabSync from 'redux-persist-crosstab'

const store = createStore(reducer)
const persistor = persistStore(store, {})
const persistorConfig = {}
const crosstabConfig = {}

crosstabSync(store, persistorConfig, crosstabConfig);
```

To blacklist some portion of state, for example if you want to avoid syncing route state:
```js
const persistorConfig = {}
const crosstabConfig = { blacklist: ['routeReducerKey'] }
crosstabSync(store, persistorConfig, crosstabConfig)
```

### Rehydration Merge
Redux Persist does a shallow merge of state during rehydration. This means that if state changes on two tabs simultaneously, it is possible that legitimate state will be lost in the merge. In most cases this will not be an issue. One scenario where this could happen is if both tabs are listening on a socket and they both receive a message at the same time. If you have this type of set up you will either need to blacklist the relevant reducers or implement a custom rehydration handler that takes into account the nuances of this situation.
