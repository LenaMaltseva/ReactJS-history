import { createStore, compose, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { persistStore } from 'redux-persist'

import middlewares from '../middlewares/index.js'
import persistReducer from './reducers'

export const history = createBrowserHistory()

function initStore() {
   let initialStore = {}

   const store = createStore(
      persistReducer(history), 
      initialStore,
      compose(
         applyMiddleware(routerMiddleware(history), ...middlewares),
         window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
      )
   )

   const persistor = persistStore(store)

   return { store, persistor }
}

export default initStore