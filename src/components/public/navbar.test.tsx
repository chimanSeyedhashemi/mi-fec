import { renderWithRouter } from '../../common/utils/test.utils';
import { Navbar } from './navbar';
import { screen } from '@testing-library/react';

describe('Navbar tests', () => {
  test('renders Navbar component', () => {
    renderWithRouter(<Navbar />);
  });

  test('expect Videos be in the navbar', () => {
    renderWithRouter(<Navbar activePageLabel="Videos" />);
    const text = screen.getByText('Videos');
    expect(text).toBeInTheDocument();
  });

  test('expect button element be in the navbar', () => {
    const { queryByTestId } = renderWithRouter(<Navbar rightComponent={<button data-testid="rightComponent">Click</button>} />);
    const text = screen.getByText('Click');
    expect(text).toBeInTheDocument();
    expect(queryByTestId(/rightComponent/i)).toBeTruthy();
  });
});
