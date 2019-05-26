import {createStore, applyMiddleware, combineReducers} from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunk from "redux-thunk";
import * as reducers from "./index";

const persistConfig = {
    key: 'root',
    storage,
}
export default function configureStore() {
    var reducer = combineReducers(reducers);
    var persistedReducer = persistReducer(persistConfig, reducer)
    var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    var store = createStoreWithMiddleware(persistedReducer);
    var persistor = persistStore(store);
    return store;
}