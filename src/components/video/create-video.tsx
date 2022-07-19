import React, { ReactNode, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Chip, Container, Divider, TextField, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { translation } from '../../common/translation';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../common/enums/path.enum';
import { Author, Category, FormField, MapObject, VideoFormat } from '../../common/interfaces';
import { getCategories } from '../../services/categories';
import { ProcessedVideo } from '../../common/model/video.model';
import { setVideosAction } from '../../redux/action';
import { IReduxState } from '../../redux/app-store';
import { getAuthors } from '../../services/authors';
import { currentDate } from '../../common/utils/current-date';
import { generateNewId } from '../../common/utils/generate-new-Id';

interface IForm {
  name: FormField<string>;
  author: FormField<Author | undefined>;
  categories: FormField<Array<Category>>;
}

const initialFormValue: IForm = {
  name: { value: '', isValid: false },
  author: { value: undefined, isValid: false },
  categories: { value: [], isValid: false },
};

const initialVideoFormats: MapObject<VideoFormat> = { one: { res: '1080p', size: 1000 } };

export const CreateVideo: React.FC = () => {
  const { videos } = useSelector((store: IReduxState) => store);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [formValue, setFormValue] = useState<IForm>(initialFormValue);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [authors, setAuthors] = useState<Array<Author>>([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });

    getAuthors().then((_authors) => {
      setAuthors(_authors);
    });
  }, []);

  const handleCancel = () => {
    navigate(PATH.VIDEOS);
  };

  const handleSubmit = () => {
    const videoList = videos ? [...videos] : [];

    const newVideo: ProcessedVideo = {
      name: formValue.name.value,
      author: formValue.author.value?.name || '',
      categories: formValue.categories.value.map((category) => category.name),
      formats: initialVideoFormats,
      id: generateNewId(videoList.map((video) => video.id)),
      releaseDate: currentDate(),
    };

    dispatch(setVideosAction(videos ? [...videos, { ...newVideo }] : [newVideo]));
    navigate(PATH.VIDEOS);
  };

  const handleChangeInput = (value: string, inputName: string) => {
    setFormValue((pre) => ({ ...pre, [inputName]: { value, isValid: value ? true : false } }));
  };

  const isFormValid = () => {
    const fieldsValidation = Object.values(formValue).map((value) => value.isValid);
    return fieldsValidation.filter((isValid) => isValid === false).length > 0 ? false : true;
  };

  return (
    <>
      <Container>
        <Typography variant="h4">{translation.addVideo}</Typography>
        <Divider sx={{ my: 3 }} />
        <Box>
          <FormFieldComponent
            label={translation.videoName}
            component={
              <TextField
                variant="outlined"
                InputProps={{
                  inputProps: {
                    'data-testid': `video_name`,
                  },
                }}
                fullWidth
                value={formValue?.name.value}
                onChange={(e) => {
                  handleChangeInput(e.target.value, 'name');
                }}
              />
            }
          />
          <FormFieldComponent
            label={translation.videoAuthor}
            component={
              <Autocomplete
                fullWidth
                onChange={(event, newValue) => {
                  setFormValue((pre) => ({
                    ...pre,
                    author: { value: newValue || undefined, isValid: newValue ? true : false },
                  }));
                }}
                options={authors}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      inputProps: {
                        'data-testid': `video_author`,
                      },
                    }}
                  />
                )}
              />
            }
          />

          <FormFieldComponent
            label={translation.videoCategory}
            component={
              <Autocomplete
                multiple
                fullWidth
                onChange={(event, newValue) => {
                  setFormValue((pre) => ({
                    ...pre,
                    categories: { value: newValue, isValid: newValue.length > 0 ? true : false },
                  }));
                }}
                options={categories}
                getOptionLabel={(option) => option.name}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      inputProps: {
                        'data-testid': `video_categories`,
                      },
                    }}
                  />
                )}
              />
            }
          />
          <FormFieldComponent
            label={''}
            component={
              <Stack direction="row" spacing={3} alignItems={'center'}>
                <Button variant="contained" disabled={!isFormValid()} onClick={handleSubmit}>
                  {translation.submit}
                </Button>
                <Button onClick={handleCancel} variant="contained">
                  {translation.cancel}
                </Button>
              </Stack>
            }
          />
        </Box>
      </Container>
    </>
  );
};

const FormFieldComponent = (props: { label: string; component: ReactNode }) => (
  <Box sx={{ display: 'flex', my: 1 }}>
    <Box sx={{ width: '200px' }}>
      <Typography>{props.label}</Typography>
    </Box>
    {props.component}
  </Box>
);
