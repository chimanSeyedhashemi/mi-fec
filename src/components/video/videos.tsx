import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { VideosTable } from './videos-table';
import { getVideos } from '../../services/videos';
import config from '../../common/config';
import { useDispatch, useSelector } from 'react-redux';
import { setVideosAction } from '../../redux/action';
import { IReduxState } from '../../redux/app-store';
import { SearchVideo } from './search-video';
import { ProcessedVideo } from '../../common/model/video.model';

export const Videos: React.FC = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((store: IReduxState) => store);
  const [searchKey, setSearchKey] = useState<string>('');
  const [filteredVideos, setFilteredVideos] = useState<Array<ProcessedVideo>>([]);

  useEffect(() => {
    if (!videos) {
      getVideos().then((videos) => {
        dispatch(setVideosAction(videos));
      });
    }
  }, []);

  useEffect(() => {
    if (videos) {
      const newVideos = [...videos].filter((video) => video.name.toLowerCase().includes(searchKey.toLowerCase())) || [];
      setFilteredVideos(newVideos);
    }
  }, [videos, searchKey]);

  return (
    <>
      <Container>
        <Typography variant="h4">
          <span>{config.documentTitle}</span>
          <span>{config.DocumentVersion}</span>
        </Typography>
        <Box sx={{ mt: 3, mb: 2 }}>
          <SearchVideo setSearchKey={setSearchKey} />
        </Box>
        <VideosTable videos={filteredVideos} />
      </Container>
    </>
  );
};
