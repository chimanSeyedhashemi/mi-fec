import React, { ReactNode, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Chip, TextField, Typography, Stack, MenuItem } from '@mui/material';
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
  author: FormField<string>;
  categories: FormField<Array<Category>>;
}

interface IProps {
  video?: ProcessedVideo;
}

const initialFormValues: IForm = {
  name: { value: '', isValid: false },
  author: { value: '', isValid: false },
  categories: { value: [], isValid: false },
};

const initialVideoFormats: MapObject<VideoFormat> = { one: { res: '1080p', size: 1000 } };

export const VideoForm: React.FC<IProps> = ({ video }: IProps) => {
  const { videos } = useSelector((store: IReduxState) => store);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState<IForm>(initialFormValues);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [authors, setAuthors] = useState<Array<Author>>([]);

  //get authors & categories list
  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      throw error;
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      setAuthors(response);
    } catch (error) {
      throw error;
    }
  };

  // Add video data to form fields
  useEffect(() => {
    if (video) {
      const initialFormData: IForm = {
        name: { value: video.name, isValid: true },
        author: { value: video.author, isValid: true },
        categories: { value: categories.filter((category) => video.categories.find((VCat) => VCat === category.name)), isValid: true },
      };

      setFormValues(initialFormData);
    }
  }, [video, authors, categories]);

  const handleCancel = () => {
    navigate(PATH.VIDEOS);
  };

  const handleSubmit = () => {
    video ? editVideo() : addVideo();
    navigate(PATH.VIDEOS);
  };

  const addVideo = () => {
    const videoList = videos ? [...videos] : [];

    const newVideo: ProcessedVideo = {
      name: formValues.name.value,
      author: formValues.author.value || '',
      categories: formValues.categories.value.map((category) => category.name),
      formats: initialVideoFormats,
      id: generateNewId(videoList.map((video) => video.id)),
      releaseDate: currentDate(),
    };
    dispatch(setVideosAction(videos ? [...videos, { ...newVideo }] : [newVideo]));
  };

  const editVideo = () => {
    if (videos && video) {
      const updatedVideo: ProcessedVideo = {
        name: formValues.name.value,
        author: formValues.author.value || '',
        categories: formValues.categories.value.map((category) => category.name),
        formats: video.formats,
        id: video.id,
        releaseDate: video.releaseDate,
      };
      const videoIndex = videos?.findIndex((_video) => _video.id === video?.id);
      videos[videoIndex] = updatedVideo;
      dispatch(setVideosAction([...videos]));
    }
  };

  const isFormValid = () => {
    const fieldsValidation = Object.values(formValues).map((value) => value.isValid);
    return fieldsValidation.filter((isValid) => isValid === false).length > 0 ? false : true;
  };

  return (
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
            value={formValues?.name.value}
            onChange={(e) => {
              setFormValues((pre) => ({ ...pre, name: { value: e.target.value, isValid: e.target.value ? true : false } }));
            }}
          />
        }
      />
      <FormFieldComponent
        label={translation.videoAuthor}
        component={
          <TextField
            variant="outlined"
            select
            fullWidth
            value={formValues.author.value}
            InputProps={{
              inputProps: {
                'data-testid': `video_author`,
              },
            }}>
            {authors?.map((author) => (
              <MenuItem
                key={author.id}
                onClick={() => {
                  setFormValues((pre) => ({
                    ...pre,
                    author: { value: author.name, isValid: author ? true : false },
                  }));
                }}
                value={author.name}>
                {author.name}
              </MenuItem>
            ))}
          </TextField>
        }
      />

      <FormFieldComponent
        label={translation.videoCategory}
        component={
          <Autocomplete
            value={formValues.categories.value}
            multiple
            fullWidth
            onChange={(event, newValue) => {
              setFormValues((pre) => ({
                ...pre,
                categories: { value: newValue, isValid: newValue.length > 0 ? true : false },
              }));
            }}
            options={categories}
            getOptionLabel={(option) => option.name}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} />)
            }
            renderInput={(params) => <TextField {...params} />}
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
            <Button onClick={handleCancel}>{translation.cancel}</Button>
          </Stack>
        }
      />
    </Box>
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
