import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
const config = {
  key: 'root',
  storage,
}
const reducer = persistCombineReducers(config, reducers)
const store = createStore(reducer, applyMiddleware(thunk))

export default store