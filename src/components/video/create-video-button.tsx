import { Button } from '@mui/material';
import { translation } from '../../common/translation';

//TODO: implement Add video

export const CreateVideoButton = () => {
  return (
    <Button variant="contained" color="success">
      {translation.addVideo}
    </Button>
  );
};
