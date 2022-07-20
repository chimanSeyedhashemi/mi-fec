import { renderWithRouterAndRedux } from '../../common/utils/test.utils';
import { screen } from '@testing-library/react';
import { translation } from '../../common/translation';
import { CreateVideo } from './create-video';

describe('Create video tests', () => {
  test('renders Create Video component', () => {
    renderWithRouterAndRedux(<CreateVideo />);
  });

  test('expect (add video) be in the document', () => {
    renderWithRouterAndRedux(<CreateVideo />);
    const text = screen.getByText(translation.addVideo);
    expect(text).toBeInTheDocument();
  });
});
