import { apiMiddleware } from 'redux-api-middleware'
import botMiddleware from './bot.middleware.js'

export default [
   apiMiddleware,
   botMiddleware,
]