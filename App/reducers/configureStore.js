import {createStore, applyMiddleware, combineReducers} from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunk from "redux-thunk";
import * as reducers from "./index";

const persistConfig = {
    key: 'root',
    storage,
};
//create store
export default function configureStore() {
    // set reducer
    var reducer = combineReducers(reducers);
    // set persist config and data
    var persistedReducer = persistReducer(persistConfig, reducer)
    var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    //create redux store
    var store = createStoreWithMiddleware(persistedReducer);
    var persistor = persistStore(store);
    return store;
}