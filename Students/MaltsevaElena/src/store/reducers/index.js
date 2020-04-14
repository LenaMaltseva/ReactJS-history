import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import chatReducer from './chats.reducer.js'
import authReducer from './auth.reducer.js'
import userReducer from './users.reducer.js'
import responseReducer from './response.reducer.js'

import { connectRouter } from 'connected-react-router'

const rootPersistConfig = {
   key: 'reactgramApp',
   storage,
   stateReconciler: autoMergeLevel2,
   whitelist: ['chatReducer', 'userReducer'],
}

const authPersistConfig = {
   key: 'reactgramAccount',
   storage,
   blacklist: ['hasRegistered', 'registerErrors', 'authMessage']
}

const rootReducer = history => combineReducers({
   router: connectRouter(history),
   authReducer: persistReducer(authPersistConfig, authReducer),
   chatReducer,
   userReducer,
   responseReducer, 
})

export default history => persistReducer(rootPersistConfig, rootReducer(history))