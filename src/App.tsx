import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { PATH } from './common/enums/path.enum';
import { Videos } from './components/video/videos';
import { Layout } from './components/public/layout';
import { translation } from './common/translation';
import { CreateVideoButton } from './components/video/create-video-button';
import { Provider } from 'react-redux';
import { persistor, Store } from './redux/store';
import { CreateVideo } from './components/video/create-video';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
  return (
    <>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
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
              <Route
                path={PATH.CREATE_VIDEO}
                element={
                  <Layout NavbarProps={{ activePageLabel: translation.videos }}>
                    <CreateVideo />
                  </Layout>
                }
              />
              <Route path="*" element={<Navigate to={PATH.MAIN} replace />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
