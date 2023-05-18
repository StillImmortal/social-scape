import { useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  border: '1px solid #72c0fc',
  transition: theme.transitions.create('border'),
  '&:hover': {
    border: '1px solid #55b2fa'
  },
  marginLeft: 0,
  width: '100%',
  height: '40px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

const SearchInput = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  return (
    <Search
      sx={{
        display: 'flex',
        alignItems: 'center',
        outline: isInputFocused ? '2px solid #55b2fa' : 'none',
      }}
    >
      <IconButton sx={{  
        color: 'rgba(0,0,0,.6)', 
        height: '38px', 
        borderRadius: '12px',
        '&:hover': {
          backgroundColor: '#cae5fa',
        },
        '&:active': {
          backgroundColor: '#55b2fa',
        },
        "& .MuiTouchRipple-root .MuiTouchRipple-child": {
          borderRadius: "12px"
        }
      }}>
          <SearchIcon />
      </IconButton>
      <StyledInputBase
        sx={{
          marginLeft: '4px',
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}

export default SearchInput