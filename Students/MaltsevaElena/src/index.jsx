import React from 'react'
import ReactDom from 'react-dom'

// Routing
import Router from './router/router.jsx'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './store/store.js'

// Store
import { Provider } from 'react-redux'
import initStore from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = initStore()

// Styles
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import './index.css'

const darkTheme = createMuiTheme({
   palette: {
      type: 'dark',
      primary: {
         light: '#2C2C6A',
         main: '#1F1F4B',
         dark: '#141433',
         contrastText: '#fff',
      },
      secondary: {
         light: '#D05CAF',
         main: '#4C92E3',
         dark: '#3B3B86',
         contrastText: '#fff',
      }, 
      background: {
         paper: '#141433',
         default: "#fff"
      },
      error: {
         main: '#D05CAF',
      }
   },
})

ReactDom.render (
   <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
         <ConnectedRouter history={ history }>
            <ThemeProvider theme={ darkTheme }>
               <Router/>
            </ThemeProvider>
         </ConnectedRouter>
      </PersistGate>
   </Provider>,
   document.getElementById('app')
)