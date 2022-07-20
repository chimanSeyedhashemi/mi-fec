import { Container, Divider, Typography } from '@mui/material';
import { translation } from '../../common/translation';
import { VideoForm } from './video-form';

export const CreateVideo: React.FC = () => {
  return (
    <>
      <Container>
        <Typography variant="h4">{translation.addVideo}</Typography>
        <Divider sx={{ my: 3 }} />
        <VideoForm />
      </Container>
    </>
  );
};
