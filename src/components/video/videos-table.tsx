import React from 'react';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { translation } from '../../common/translation';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../common/enums/path.enum';
import { setVideosAction } from '../../redux/action';
import { highestQualityFormat } from './highest-quality-format';
import { ProcessedVideo } from '../../common/model/video.model';

const tableHeader: Array<string> = ['videoName', 'author', 'categories', 'highestQualityFormat', 'releaseDate', 'options'];

/**
 * @params Video formats
 * @return string
 */

interface IProps {
  videos: Array<ProcessedVideo>;
}

export const VideosTable: React.FC<IProps> = ({ videos }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleEdit = (videoId: number) => {
    navigate(PATH.EDIT_VIDEO + `?id=${videoId}`);
  };

  const handleDelete = (videoId: number) => {
    videos && dispatch(setVideosAction(videos?.filter((video) => video.id !== videoId)));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader.map((item) => (
              <TableCell key={item}>
                <Typography sx={{ fontWeight: 'bold' }}>{translation[item]}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {videos?.map((video) => (
            <StyledTableRow key={video.id}>
              <TableCell component="th" scope="row">
                {video.name}
              </TableCell>
              <TableCell>{video.author}</TableCell>
              <TableCell>{video.categories.join(', ')}</TableCell>
              <TableCell>{highestQualityFormat(video.formats)}</TableCell>
              <TableCell>{video.releaseDate}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} alignItems={'center'}>
                  <Button variant="contained" onClick={() => handleEdit(video.id)}>
                    {translation.edit}
                  </Button>

                  <Button variant="contained" color="error" onClick={() => handleDelete(video.id)}>
                    {translation.delete}
                  </Button>
                </Stack>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
