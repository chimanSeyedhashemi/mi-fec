import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { VideosTable } from './videos-table';
import { getVideos } from '../../services/videos';
import config from '../../common/config';
import { useDispatch, useSelector } from 'react-redux';
import { setVideosAction } from '../../redux/action';
import { IReduxState } from '../../redux/app-store';

export const Videos: React.FC = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((store: IReduxState) => store);

  useEffect(() => {
    if (!videos) {
      getVideos().then((videos) => {
        dispatch(setVideosAction(videos));
      });
    }
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
