import { createStore } from 'redux';

import state from './state';
import reducer from './reducer';
import middleware from './middleware';
import { useStore, useActions } from './hook';

const store = createStore(reducer, state, middleware);

export { store as default, useStore, useActions };