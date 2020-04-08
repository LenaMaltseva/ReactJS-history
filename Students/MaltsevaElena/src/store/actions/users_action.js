import { RSAA, getJSON } from 'redux-api-middleware'

export let START_USERS_LOADING = '@@user/START_USERS_LOADING'
export let SUCCESS_USERS_LOADING = '@@user/SUCCESS_USERS_LOADING'
export let ERROR_USERS_LOADING = '@@user/ERROR_USERS_LOADING'

export let loadUsers = () => ({
   [RSAA]: {
      endpoint: '/api/user',
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
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