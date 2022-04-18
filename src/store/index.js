import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {dataReducer} from './reducers/dataReducer';

export const store = createStore(dataReducer, applyMiddleware(thunk));
