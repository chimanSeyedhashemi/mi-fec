import { renderWithRouterAndRedux } from '../../common/utils/test.utils';
import { screen } from '@testing-library/react';
import { VideosTable } from './videos-table';
import { translation } from '../../common/translation';
import { highestQualityFormat } from './highest-quality-format';

describe('Videos table tests', () => {
  test('renders Video table component', () => {
    renderWithRouterAndRedux(<VideosTable videos={[]} />);
  });

  test('expect (video name) be in the document', () => {
    renderWithRouterAndRedux(<VideosTable videos={[]} />);
    const text = screen.getByText(translation.videoName);
    expect(text).toBeInTheDocument();
  });

  test('expect (David Munch) be in the document', () => {
    const videos = [
      {
        author: 'David Munch',
        categories: ['Thriller', 'Crime'],
        formats: {
          one: { res: '1000p', size: 1000 },
          two: { res: '720p', size: 720 },
          three: { res: '720p', size: 1000 },
        },
        id: 1,
        name: 'Set the Moon',
        releaseDate: '2018-08-09',
      },
    ];

    renderWithRouterAndRedux(<VideosTable videos={videos} />);
    const text = screen.getByText('David Munch');
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
