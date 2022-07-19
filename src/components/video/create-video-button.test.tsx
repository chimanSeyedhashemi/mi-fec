import { renderWithRouter } from '../../common/utils/test.utils';
import { screen } from '@testing-library/react';
import { CreateVideoButton } from './create-video-button';
import { translation } from '../../common/translation';

describe('Create video button tests', () => {
  test('renders Create video button component', () => {
    renderWithRouter(<CreateVideoButton />);
  });

  test('expect (add video) be in the document', () => {
    renderWithRouter(<CreateVideoButton />);
    const text = screen.getByText(translation.addVideo);
    expect(text).toBeInTheDocument();
  });
});
