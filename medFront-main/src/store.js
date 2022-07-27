import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';

const presistConfig = {
  key: 'presist-key',
  storage
}
const initialState = {
  sidebarShow: true,
  user : [],
  doctor :[],
  isLogIn: null
}
  
const changeState = (state = initialState, { action,type, ...rest }) => {
  switch (type) {
   
    case 'set':
      return { ...state, ...rest };
    case 'onLogin':
      return {...state,  ...rest};
    case 'setUser':
      return {...state,  ...rest};
    case 'setDoctor':
      return {...state,  ...rest};
    default:
      return state
  }
}
const presistReducer = persistReducer(presistConfig,changeState)
const store = createStore(presistReducer)
const persistore = persistStore(store)
export default store
export {persistore}
