import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import auth from './auth'
import layout from './layout'
import snackbar from './snackbar'
import directory from './directory'

import rootSaga from './root.sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        auth,
        layout,
        snackbar,
        directory
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export default store
