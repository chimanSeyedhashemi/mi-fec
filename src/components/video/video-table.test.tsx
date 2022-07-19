import { renderWithRouterAndRedux } from '../../common/utils/test.utils';
import { screen } from '@testing-library/react';
import { highestQualityFormat, VideosTable } from './videos-table';
import { translation } from '../../common/translation';

describe('Videos table tests', () => {
  test('renders Video table component', () => {
    renderWithRouterAndRedux(<VideosTable />);
  });

  test('expect (video name) be in the document', () => {
    renderWithRouterAndRedux(<VideosTable />);
    const text = screen.getByText(translation.videoName);
    expect(text).toBeInTheDocument();
  });

  test('High quality format would be higher size', () => {
    const formats = {
      one: { res: '1000p', size: 1000 },
      two: { res: '720p', size: 720 },
    };
    expect(highestQualityFormat(formats)).toEqual(`one 1000p`);
  });

  test('High quality format would be higher size and then higher res', () => {
    const formats = {
      one: { res: '1000p', size: 1000 },
      two: { res: '720p', size: 720 },
      three: { res: '720p', size: 1000 },
    };
    expect(highestQualityFormat(formats)).toEqual(`one 1000p`);
  });
});
