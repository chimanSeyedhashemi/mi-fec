import { Container, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ProcessedVideo } from '../../common/model/video.model';
import { translation } from '../../common/translation';
import { IReduxState } from '../../redux/app-store';
import { VideoForm } from './video-form';

export const EditVideo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('id');
  const [video, setVideo] = useState<ProcessedVideo>();
  const { videos } = useSelector((store: IReduxState) => {
    return store;
  });
  useEffect(() => {
    videoId && setVideo(videos?.find((video) => video.id.toString() === videoId));
  }, [videoId]);

  return (
    <>
      <Container>
        <Typography variant="h4">
          {translation.editVideo}: {video?.name}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <VideoForm video={video} />
      </Container>
    </>
  );
};
