import { renderWithRouter } from '../../common/utils/test.utils';
import { Layout } from './layout';

test('renders Layout component', () => {
  renderWithRouter(<Layout />);
});
