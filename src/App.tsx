import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { PATH } from './common/enums/path.enum';
import { Videos } from './components/video/videos';
import { Layout } from './components/public/layout';
import { translation } from './common/translation';
import { CreateVideoButton } from './components/video/create-video-button';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

const App: React.FC = () => {
  return (
    <>
      <Provider store={Store}>
        <Router>
          <Routes>
            <Route path={PATH.MAIN} element={<Navigate to={PATH.VIDEOS} replace />} />
            <Route
              path={PATH.VIDEOS}
              element={
                <Layout NavbarProps={{ activePageLabel: translation.videos, rightComponent: <CreateVideoButton /> }}>
                  <Videos />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to={PATH.MAIN} replace />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
