import * as React from 'react'
import * as ReactDom from 'react-dom'
import Layout from './components/Layout'
import { Provider } from 'react-redux'
import reducer from './redux'
import { persistStore } from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import { HashRouter } from 'react-router-dom'
const persistor = persistStore(reducer)
ReactDom.render(
    <Provider store={reducer}>
        <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
                <Layout compiler="Typescript" framework="React" />
            </HashRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("react")
)