import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../common/enums/path.enum';
import { translation } from '../../common/translation';

export const CreateVideoButton = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.CREATE_VIDEO);
  };
  return (
    <Button variant="contained" color="success" onClick={handleClick}>
      {translation.addVideo}
    </Button>
  );
};
