import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { persistStore } from 'redux-persist'

import middlewares from '../middlewares/index.js'
import persistReducer from './reducers'

export const history = createBrowserHistory()

function initStore() {
   const store = createStore(
      persistReducer(history), 
      applyMiddleware(routerMiddleware(history), ...middlewares),
   )

   const persistor = persistStore(store)

   return { store, persistor }
}

export default initStore