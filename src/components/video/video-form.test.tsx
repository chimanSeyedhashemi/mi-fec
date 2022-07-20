import { renderWithRouterAndRedux } from '../../common/utils/test.utils';
import { fireEvent, screen } from '@testing-library/react';
import { translation } from '../../common/translation';
import { CreateVideo } from './create-video';
import { VideoForm } from './video-form';

describe('Create video tests', () => {
  test('renders Create Video component', () => {
    renderWithRouterAndRedux(<VideoForm />);
  });

  test('expect (Video Name) be in the document', () => {
    renderWithRouterAndRedux(<VideoForm />);
    const text = screen.getByText(translation.videoName);
    expect(text).toBeInTheDocument();
  });

  test('expect input value be Matrix', () => {
    const { debug, getByTestId } = renderWithRouterAndRedux(<VideoForm />);
    const input = getByTestId('video_name');
    expect(input).toHaveValue('');
    fireEvent.change(input, {
      target: { value: 'Matrix' },
    });
    expect(input).toHaveValue('Matrix');
    debug();
  });

  test('expect (Video Author) be in the document', () => {
    renderWithRouterAndRedux(<VideoForm />);
    const text = screen.getByText(translation.videoAuthor);
    expect(text).toBeInTheDocument();
  });

  test('expect (Video Category) be in the document', () => {
    renderWithRouterAndRedux(<CreateVideo />);
    const text = screen.getByText(translation.videoCategory);
    expect(text).toBeInTheDocument();
  });

  test('expect (Submit) be in the document', () => {
    const { debug, getByText } = renderWithRouterAndRedux(<VideoForm />);
    const text = getByText(translation.submit);
    expect(text).toBeInTheDocument();
    fireEvent.click(text);
    debug();
  });

  test('expect (Cancel) be in the document', () => {
    const { debug, getByText } = renderWithRouterAndRedux(<VideoForm />);
    const text = getByText(translation.videoCategory);
    expect(text).toBeInTheDocument();
    fireEvent.click(text);
    debug();
  });
});
