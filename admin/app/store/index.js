import { createStore } from 'redux';

import state from './state';
import reducer from './reducer';
import middleware from './middleware';
import useStore from './hook';

const store = createStore(reducer, state, middleware);

export { store as default, useStore };