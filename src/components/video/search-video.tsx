import { Box, Button, TextField } from '@mui/material';
import { useRef } from 'react';
import { translation } from '../../common/translation';

interface IProps {
  setSearchKey(searchKey: string): void;
}

export const SearchVideo = ({ setSearchKey }: IProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    setSearchKey(inputRef.current?.value || '');
  };

  return (
    <Box>
      <TextField size="small" inputProps={{ ref: inputRef }} />
      <Button variant="contained" sx={{ ml: 1 }} onClick={handleSearch}>
        {translation.search}
      </Button>
    </Box>
  );
};
