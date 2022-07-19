import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { VideosTable } from './videos-table';
import { getVideos } from '../../services/videos';
import config from '../../common/config';
import { useDispatch } from 'react-redux';
import { setVideosAction } from '../../redux/action';

export const Videos: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getVideos().then((videos) => {
      dispatch(setVideosAction(videos));
    });
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h4">
          <span>{config.documentTitle}</span>
          <span>{config.DocumentVersion}</span>
        </Typography>
        {/* //TODO: Implement search video */}
        <VideosTable />
      </Container>
    </>
  );
};
