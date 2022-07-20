import React from 'react';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { MapObject, VideoFormat } from '../../common/interfaces';
import { translation } from '../../common/translation';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../redux/app-store';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../common/enums/path.enum';
import { setVideosAction } from '../../redux/action';

const tableHeader: Array<string> = ['videoName', 'author', 'categories', 'highestQualityFormat', 'releaseDate', 'options'];

/**
 * @params Video formats
 * @return string
 */

export const highestQualityFormat = (formats: MapObject<VideoFormat>): string => {
  let result = '';

  const formatsEntries = Object.entries(formats);
  formatsEntries.sort((a, b) => a[1].size - b[1].size);
  formatsEntries.reverse();

  const highestQuality = formatsEntries.filter((format) => format[1].size === formatsEntries[0][1].size);

  if (highestQuality.length > 1) {
    highestQuality.sort((a, b) => Number(a[1].res.split('p')[0]) - Number(b[1].res.split('p')[0]));
    highestQuality.reverse();
    result = `${highestQuality[0][0]} ${highestQuality[0][1].res}`;
  } else {
    result = `${formatsEntries[0][0]} ${formatsEntries[0][1].res}`;
  }

  return result;
};

export const VideosTable: React.FC<{}> = () => {
  const { videos } = useSelector((store: IReduxState) => store);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleEdit = (videoId: number) => {
    navigate(PATH.EDIT_VIDEO + `?id=${videoId}`);
  };

  const handleDelete = (videoId: number) => {
    videos && dispatch(setVideosAction(videos?.filter((video) => video.id !== videoId)));
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
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
