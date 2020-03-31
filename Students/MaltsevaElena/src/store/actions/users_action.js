import { RSAA, getJSON } from 'redux-api-middleware'

export let START_USERS_LOADING = '@@user/START_USERS_LOADING'
export let SUCCESS_USERS_LOADING = '@@user/SUCCESS_USERS_LOADING'
export let ERROR_USERS_LOADING = '@@user/ERROR_USERS_LOADING'

export let loadUsers = () => ({
   [RSAA]: {
      endpoint: '/api/users',
      method: 'GET',
      types: [
         START_USERS_LOADING,
         {
            type: SUCCESS_USERS_LOADING,
            payload: (action, state, res) => getJSON(res).then(json => json)
         },
         ERROR_USERS_LOADING
      ]
   }
})

export let START_REGISTER = '@@user/START_REGISTER'
export let SUCCESS_REGISTER = '@@user/SUCCESS_REGISTER'
export let ERROR_REGISTER = '@@user/ERROR_REGISTER'

export let registerNewUser = (userName, email, password) => ({
   [RSAA]: {
      endpoint: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, email, password }),
      types: [
         START_REGISTER,
         {
            type: SUCCESS_REGISTER,
            payload: (action, state, res) => getJSON(res).then(json => json)
         },
         {
            type: ERROR_REGISTER,
            payload: (action, state, res) => getJSON(res).then(json => json)
         }
      ]
   }
})

export let START_LOGIN = '@@user/START_LOGIN'
export let SUCCESS_LOGIN = '@@user/SUCCESS_LOGIN'
export let ERROR_LOGIN = '@@user/ERROR_LOGIN'

export let loginUser = (userName, password) => ({
   [RSAA]: {
      endpoint: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password }),
      types: [
         START_LOGIN,
         {
            type: SUCCESS_LOGIN,
            payload: (action, state, res) => getJSON(res).then(json => json)
         },
         {
            type: ERROR_LOGIN,
            payload: (action, state, res) => getJSON(res).then(json => json)
         }
      ]
   }
})

export let LOGOUT = '@@user/LOGOUT'

export let logoutUser = () => ({
   type: LOGOUT,
})