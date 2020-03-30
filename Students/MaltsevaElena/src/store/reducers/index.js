import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import chatReducer from './chats_reducer.js'
import userReducer from './users_reducer.js'

import { connectRouter } from 'connected-react-router'

const rootPersistConfig = {
   key: 'reactgramApp',
   storage,
   stateReconciler: autoMergeLevel2,
   whitelist: ['chatReducer'],
}

const userPersistConfig = {
   key: 'reactgramAccount',
   storage,
   blacklist: ['hasRegistered', 'registerErrors', 'authMessage']
 }

const rootReducer = history => combineReducers({
   router: connectRouter(history),
   userReducer: persistReducer(userPersistConfig, userReducer),
   chatReducer 
})

export default history => persistReducer(rootPersistConfig, rootReducer(history))