import { createStore } from 'redux';

import state from './state';
import reducer from './reducer';
import middleware from './middleware';

export * from './hooks';

export default createStore(reducer, state, middleware);