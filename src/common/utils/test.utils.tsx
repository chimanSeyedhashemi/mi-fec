import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mainReducer } from '../../redux/store';

function renderWithRouter(ui: React.ReactElement, { route = '/', history = createMemoryHistory({ initialEntries: ['/'] }) } = {}) {
  return {
    ...rtlRender(
      <Router location={route} navigator={history}>
        {ui}
      </Router>
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

function renderWithRedux(ui: React.ReactElement, { initialState = {}, store = createStore(mainReducer), ...renderOptions } = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...renderOptions,
  });
}

function renderWithRouterAndRedux(ui: React.ReactElement, { route = '/', history = createMemoryHistory({ initialEntries: ['/'] }) } = {}) {
  return {
    ...renderWithRedux(
      <Router location={route} navigator={history}>
        {ui}
      </Router>
    ),
    history,
  };
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithRouter, renderWithRedux, renderWithRouterAndRedux };
