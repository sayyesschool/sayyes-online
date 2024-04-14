import { createStore } from 'redux';

import middleware from './middleware';
import reducer from './reducer';
import state from './state';

export * from './hooks';

export default createStore(reducer, state, middleware);