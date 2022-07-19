import { renderWithRouterAndRedux } from '../../common/utils/test.utils';
import { fireEvent, screen } from '@testing-library/react';
import { highestQualityFormat, VideosTable } from './videos-table';
import { translation } from '../../common/translation';
import { CreateVideo } from './create-video';
import { render as rtlRender } from '@testing-library/react';

describe('Create video tests', () => {
  test('renders Create Video component', () => {
    renderWithRouterAndRedux(<CreateVideo />);
  });

  test('expect (add video) be in the document', () => {
    renderWithRouterAndRedux(<CreateVideo />);
    const text = screen.getByText(translation.addVideo);
    expect(text).toBeInTheDocument();
  });

  test('expect (Video Name) be in the document', () => {
    const { debug, getByTestId } = renderWithRouterAndRedux(<CreateVideo />);
    const text = screen.getByText(translation.videoName);
    expect(text).toBeInTheDocument();
  });

  test('expect input value be Matrix', () => {
    const { debug, getByTestId } = renderWithRouterAndRedux(<CreateVideo />);
    const input = getByTestId('video_name');
    expect(input).toHaveValue('');
    fireEvent.change(input, {
      target: { value: 'Matrix' },
    });
    expect(input).toHaveValue('Matrix');
    debug();
  });

  test('expect (Video Author) be in the document', () => {
    renderWithRouterAndRedux(<CreateVideo />);
    const text = screen.getByText(translation.videoAuthor);
    expect(text).toBeInTheDocument();
  });

  test('expect input value be Asghar Farhadi', () => {
    const { debug, getByTestId } = renderWithRouterAndRedux(<CreateVideo />);
    const input = getByTestId('video_author');
    expect(input).toHaveValue('');
    fireEvent.change(input, {
      target: { value: 'Asghar Farhadi' },
    });
    expect(input).toHaveValue('Asghar Farhadi');
    debug();
  });

  test('expect (Video Category) be in the document', () => {
    renderWithRouterAndRedux(<CreateVideo />);
    const text = screen.getByText(translation.videoCategory);
    expect(text).toBeInTheDocument();
  });

  test('expect input value be Drama', () => {
    const { debug, getByTestId } = renderWithRouterAndRedux(<CreateVideo />);
    const input = getByTestId('video_categories');
    expect(input).toHaveValue('');
    fireEvent.change(input, {
      target: { value: 'Drama' },
    });
    expect(input).toHaveValue('Drama');
    debug();
  });

  test('expect (Submit) be in the document', () => {
    const { debug, getByText } = renderWithRouterAndRedux(<CreateVideo />);
    const text = getByText(translation.submit);
    expect(text).toBeInTheDocument();
    fireEvent.click(text);
    debug();
  });

  test('expect (Cancel) be in the document', () => {
    const { debug, getByText } = renderWithRouterAndRedux(<CreateVideo />);
    const text = getByText(translation.videoCategory);
    expect(text).toBeInTheDocument();
    fireEvent.click(text);
    debug();
  });
});
