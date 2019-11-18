import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

let store = null;

export const configureStore = () => {
  const enhancers = compose(
    applyMiddleware(
      ReduxThunk
    )
  );

  store = createStore(reducers, enhancers);

  return store;
};

export const getStore = () => (store);
