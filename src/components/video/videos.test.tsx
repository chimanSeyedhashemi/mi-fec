import { renderWithRedux } from '../../common/utils/test.utils';

import { screen } from '@testing-library/react';
import { Videos } from './videos';
import config from '../../common/config';

describe('Videos page tests', () => {
  test('renders Videos component', () => {
    renderWithRedux(<Videos />);
  });

  test('expect document title be in the videos component', () => {
    renderWithRedux(<Videos />);
    const text = screen.getByText(config.documentTitle);
    expect(text).toBeInTheDocument();
  });
});
